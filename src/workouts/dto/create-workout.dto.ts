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
  constructor(
    userId: number,
    date: string,
    entries: CreateWorkoutEntryDto[],
    notes?: string,
  ) {
    this.userId = userId;
    this.date = date;
    this.entries = entries;
    this.notes = notes;
  }

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
