import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateWorkoutEntryDto {
  @IsInt()
  @Min(1)
  exerciseId: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  sets?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  reps?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  durationSeconds?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  weightKg?: number;
}
