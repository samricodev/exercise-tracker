import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExercisesService } from '../exercises/exercises.service';
import { Workout } from './entities/workout.entity';
import { WorkoutEntry } from './entities/workout-entry.entity';
import { CreateWorkoutDto } from './dto/create-workout.dto';
import { UpdateWorkoutDto } from './dto/update-workout.dto';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout)
    private readonly workoutRepo: Repository<Workout>,
    @InjectRepository(WorkoutEntry)
    private readonly entryRepo: Repository<WorkoutEntry>,
    private readonly exercisesService: ExercisesService,
  ) {}

  findAll(): Promise<Workout[]> {
    return this.workoutRepo.find();
  }

  findByUser(userId: number): Promise<Workout[]> {
    return this.workoutRepo.findBy({ userId });
  }

  async findOne(id: number): Promise<Workout> {
    const workout = await this.workoutRepo.findOneBy({ id });
    if (!workout) throw new NotFoundException(`Workout #${id} not found`);
    return workout;
  }

  async create(dto: CreateWorkoutDto): Promise<Workout> {
    await Promise.all(
      dto.entries.map((e) => this.exercisesService.findOne(e.exerciseId)),
    );

    const workout = this.workoutRepo.create({
      userId: dto.userId,
      date: dto.date,
      notes: dto.notes,
      entries: dto.entries.map((e) => this.entryRepo.create(e)),
    });

    return this.workoutRepo.save(workout);
  }

  async update(id: number, dto: UpdateWorkoutDto): Promise<Workout> {
    const workout = await this.findOne(id);

    if (dto.entries) {
      await Promise.all(
        dto.entries.map((e) => this.exercisesService.findOne(e.exerciseId)),
      );
      await this.entryRepo.delete({ workout: { id } });
      workout.entries = dto.entries.map((e) => this.entryRepo.create(e));
    }

    Object.assign(workout, { ...dto, entries: workout.entries });
    return this.workoutRepo.save(workout);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.workoutRepo.delete(id);
  }
}
