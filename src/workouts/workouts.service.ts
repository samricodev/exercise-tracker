import { Injectable, NotFoundException } from '@nestjs/common';
import { ExercisesService } from '../exercises/exercises.service';
import { Workout } from './interfaces/workout.interface';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  private workouts: Workout[] = [];
  private nextId = 1;

  constructor(private readonly exercisesService: ExercisesService) {}

  findAll(): Workout[] {
    return this.workouts;
  }

  findByUser(userId: number): Workout[] {
    return this.workouts.filter((w) => w.userId === userId);
  }

  findOne(id: number): Workout {
    const workout = this.workouts.find((w) => w.id === id);
    if (!workout) throw new NotFoundException(`Workout #${id} not found`);
    return workout;
  }

  create(dto: CreateWorkoutDto): Workout {
    // Validate all exercise IDs exist — findOne throws 404 if not found
    dto.entries.forEach((entry) => {
      this.exercisesService.findOne(entry.exerciseId);
    });

    const workout: Workout = { id: this.nextId++, ...dto };
    this.workouts.push(workout);
    return workout;
  }

  update(id: number, dto: UpdateWorkoutDto): Workout {
    const index = this.workouts.findIndex((w) => w.id === id);
    if (index === -1) throw new NotFoundException(`Workout #${id} not found`);

    if (dto.entries) {
      dto.entries.forEach((entry) => {
        this.exercisesService.findOne(entry.exerciseId);
      });
    }

    this.workouts[index] = { ...this.workouts[index], ...dto };
    return this.workouts[index];
  }

  remove(id: number): void {
    const index = this.workouts.findIndex((w) => w.id === id);
    if (index === -1) throw new NotFoundException(`Workout #${id} not found`);
    this.workouts.splice(index, 1);
  }
}
