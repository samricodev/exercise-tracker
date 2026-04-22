import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateWorkoutEntryDto {
  constructor(
    exerciseId: number,
    sets?: number,
    reps?: number,
    durationSeconds?: number,
    weightKg?: number,
  ) {
    this.exerciseId = exerciseId;
    this.sets = sets;
    this.reps = reps;
    this.durationSeconds = durationSeconds;
    this.weightKg = weightKg;
  }

  @IsInt()
  @Min(1)
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
