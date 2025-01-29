import { Injectable } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import Redis from 'ioredis';
import { Superhero } from '../superhero.entity';

@Injectable()
export class SuperheroRedisRepository {
  private readonly HASH_KEY = 'superheroes';

  constructor(@InjectRedis() private readonly redis: Redis) {}

  async save(superhero: Superhero): Promise<void> {
    await this.redis.hset(
      this.HASH_KEY,
      superhero.id.toString(),
      JSON.stringify(superhero),
    );
  }

  async findAll(skip: number = 0, limit: number = 10): Promise<Superhero[]> {
    const heroes = await this.redis.hgetall(this.HASH_KEY);
    return Object.values(heroes)
      .map((hero) => JSON.parse(hero as string))
      .slice(skip, skip + limit);
  }

  async count(): Promise<number> {
    const heroes = await this.redis.hgetall(this.HASH_KEY);
    return Object.keys(heroes).length;
  }

  async deleteFromCache(id: number): Promise<void> {
    await this.redis.hdel(this.HASH_KEY, id.toString());
  }
}
