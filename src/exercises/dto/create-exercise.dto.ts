/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsArray,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

const EXERCISE_CATEGORIES = [
  'strength',
  'cardio',
  'flexibility',
  'balance',
] as const;

export type ExerciseCategory = (typeof EXERCISE_CATEGORIES)[number];

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  name: string | undefined;

  @IsEnum(EXERCISE_CATEGORIES, {
    message: 'category must be one of: strength, cardio, flexibility, balance',
  })
  category: ExerciseCategory | undefined;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  muscleGroups: string[] | undefined;

  @IsOptional()
  @IsString()
  description?: string;
}
