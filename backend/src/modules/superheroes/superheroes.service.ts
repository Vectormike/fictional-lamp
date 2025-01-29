import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { paginationResponseMapper } from '../../utils/mappers/pagination-mapper';
import { Superhero } from './superhero.entity';
import { SuperheroRedisRepository } from './repositories/superhero.redis.repository';

@Injectable()
export class SuperheroesService {
  /*
   * Implementation Notes:
   * I chose Map (HashMap) over Array for the local cache for several reasons:
   * 1. O(1) lookup time when fetching by ID vs O(n) with array
   * 2. Easier key-based updates and deletions without array traversal
   * 3. No duplicate entries possible due to unique key constraints
   * 4. Memory efficiency as we don't need to maintain index-based ordering
   * 5. Better performance for frequent updates and lookups
   */
  private readonly logger = new Logger(SuperheroesService.name);
  private readonly localCache: Map<string, Superhero> = new Map();
  private readonly CACHE_TTL = 3600000; // 1 hour in milliseconds
  private lastCacheUpdate: number = Date.now();

  constructor(private readonly redisRepository: SuperheroRedisRepository) {}

  private isCacheStale(): boolean {
    return Date.now() - this.lastCacheUpdate > this.CACHE_TTL;
  }

  async clearCache(): Promise<void> {
    this.logger.log('Clearing local cache');
    this.localCache.clear();
    this.lastCacheUpdate = Date.now();
  }

  async create(superhero: Partial<Superhero>): Promise<Superhero> {
    this.logger.log(`Creating new superhero`);
    try {
      // Validate required fields
      if (!superhero.name || !superhero.humilityScore) {
        throw new BadRequestException('Name and humility score are required');
      }

      // Validate humility score range
      const humilityScore = Number(superhero.humilityScore);
      if (isNaN(humilityScore) || humilityScore < 1 || humilityScore > 10) {
        throw new BadRequestException(
          'Humility score must be a number between 1 and 10',
        );
      }

      const newSuperhero = {
        id: Date.now().toString(),
        createdAt: new Date(),
        ...superhero,
        humilityScore, // Use the converted number
      } as Superhero;

      await this.redisRepository.save(newSuperhero).catch((error) => {
        this.logger.error(`Redis save failed: ${error.message}`);
        throw error;
      });

      this.localCache.set(String(newSuperhero.id), newSuperhero);
      this.lastCacheUpdate = Date.now();

      this.logger.log(
        `Successfully created superhero with ID: ${newSuperhero.id}`,
      );
      return newSuperhero;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      this.logger.error(
        `Failed to create superhero: ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        `Failed to create superhero: ${error.message}`,
      );
    }
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    this.logger.log(
      `Fetching superheroes with pagination: ${JSON.stringify(paginationQuery)}`,
    );

    try {
      const { page = 1, limit = 10 } = paginationQuery;
      const skip = (page - 1) * limit;

      // Check cache first
      if (!this.isCacheStale() && this.localCache.size > 0) {
        const cachedHeroes = Array.from(this.localCache.values());
        const paginatedHeroes = cachedHeroes.slice(skip, skip + limit);
        return paginationResponseMapper(
          paginatedHeroes,
          cachedHeroes.length,
          page,
          limit,
        );
      }

      // Fetch from Redis if cache is stale
      const [heroes, total] = await Promise.all([
        this.redisRepository.findAll(skip, limit),
        this.redisRepository.count(),
      ]);

      // Update local cache
      heroes.forEach((hero) => this.localCache.set(String(hero.id), hero));
      this.lastCacheUpdate = Date.now();

      return paginationResponseMapper(heroes, total, page, limit);
    } catch (error) {
      this.logger.error(`Error fetching superheroes: ${error.message}`);
      throw error;
    }
  }
}
