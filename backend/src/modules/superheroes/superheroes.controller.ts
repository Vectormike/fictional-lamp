import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { SuperheroResponseDto } from './dto/superhero-response.dto';

@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
  create(
    @Body() createSuperheroDto: CreateSuperheroDto,
  ): Promise<SuperheroResponseDto> {
    return this.superheroesService.create(createSuperheroDto);
  }

  @Get()
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<SuperheroResponseDto[]> {
    return this.superheroesService.findAll(paginationQuery);
  }
}
