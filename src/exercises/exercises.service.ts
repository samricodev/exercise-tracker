import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from './entities/exercise.entity';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseRepo: Repository<Exercise>,
  ) {}

  findAll(): Promise<Exercise[]> {
    return this.exerciseRepo.find();
  }

  async findOne(id: number): Promise<Exercise> {
    const exercise = await this.exerciseRepo.findOneBy({ id });
    if (!exercise) throw new NotFoundException(`Exercise #${id} not found`);
    return exercise;
  }

  create(dto: CreateExerciseDto): Promise<Exercise> {
    return this.exerciseRepo.save(this.exerciseRepo.create(dto));
  }

  async update(id: number, dto: UpdateExerciseDto): Promise<Exercise> {
    await this.findOne(id);
    await this.exerciseRepo.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.exerciseRepo.delete(id);
  }
}
