import { Test, TestingModule } from '@nestjs/testing';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './../src/app.module';
import * as request from 'supertest';

interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  per_page: number;
  total: number;
  last_page: number;
}

describe('Superheroes (e2e)', () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    );
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/superheroes (POST)', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/superheroes',
      payload: {
        name: 'Iron Man',
        superpower: 'Technology',
        humilityScore: 7,
      },
    });
    expect(response.statusCode).toBe(201);
    const body = JSON.parse(response.payload);
    expect(body).toHaveProperty('id');
    expect(body.name).toBe('Iron Man');
  }, 10000);

  it('/superheroes (GET)', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/superheroes',
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.payload) as PaginatedResponse<any>;
    expect(Array.isArray(body.data)).toBe(true);
  });
});
