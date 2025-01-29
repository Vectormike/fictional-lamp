import { IsString, IsNumber, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  superpower: string;

  @IsNumber()
  @Min(1)
  @Max(10)
  humilityScore: number;
}
