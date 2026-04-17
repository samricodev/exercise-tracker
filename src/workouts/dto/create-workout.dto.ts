import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsInt,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateWorkoutEntryDto } from './create-workout-entry.dto';

export class CreateWorkoutDto {
  @IsInt()
  @Min(1)
  userId: number;

  @IsDateString()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateWorkoutEntryDto)
  entries: CreateWorkoutEntryDto[];

  @IsOptional()
  @IsString()
  notes?: string;
}
