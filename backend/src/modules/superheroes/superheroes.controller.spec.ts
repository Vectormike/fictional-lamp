import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';
import { Superhero } from './superhero.entity';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  const mockSuperheroesService = {
    create: jest.fn(),
    findAll: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: mockSuperheroesService,
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new superhero', async () => {
      const superheroData: Partial<Superhero> = {
        name: 'Batman',
        superpower: 'Intelligence',
        humilityScore: 75,
      };

      mockSuperheroesService.create.mockResolvedValue({
        id: '1',
        ...superheroData,
      });

      const result = await controller.create(superheroData);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe(superheroData.name);
      expect(service.create).toHaveBeenCalledWith(superheroData);
    });
  });

  describe('findAll', () => {
    it('should return an array of superheroes', async () => {
      const mockSuperheroes = [
        { id: '1', name: 'Superman', humilityScore: 70 },
        { id: '2', name: 'Wonder Woman', humilityScore: 85 },
      ];

      mockSuperheroesService.findAll.mockResolvedValue(mockSuperheroes);

      const result = await controller.findAll();

      expect(Array.isArray(result)).toBe(true);
      expect(result).toHaveLength(2);
      expect(service.findAll).toHaveBeenCalled();
    });
  });
});
