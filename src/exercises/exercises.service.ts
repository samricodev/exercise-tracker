import { Injectable, NotFoundException } from '@nestjs/common';
import { Exercise } from './interfaces/exercise.interface';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Injectable()
export class ExercisesService {
  private exercises: Exercise[] = [
    {
      id: 1,
      name: 'Push-up',
      category: 'strength',
      muscleGroups: ['chest', 'triceps', 'shoulders'],
    },
    {
      id: 2,
      name: 'Running',
      category: 'cardio',
      muscleGroups: ['legs', 'core'],
      description: 'Steady-state aerobic running',
    },
    {
      id: 3,
      name: 'Yoga - Downward Dog',
      category: 'flexibility',
      muscleGroups: ['hamstrings', 'shoulders', 'calves'],
    },
  ];

  findAll(): Exercise[] {
    return this.exercises;
  }

  findOne(id: number): Exercise {
    const exercise = this.exercises.find((e) => e.id === id);
    if (!exercise) throw new NotFoundException(`Exercise #${id} not found`);
    return exercise;
  }

  create(dto: CreateExerciseDto): Exercise {
    const exercise: Exercise = dto as Exercise;
    this.exercises.push(exercise);
    return exercise;
  }

  update(id: number, dto: UpdateExerciseDto): Exercise {
    const index = this.exercises.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException(`Exercise #${id} not found`);
    this.exercises[index] = { ...this.exercises[index], ...dto };
    return this.exercises[index];
  }

  remove(id: number): void {
    const index = this.exercises.findIndex((e) => e.id === id);
    if (index === -1) throw new NotFoundException(`Exercise #${id} not found`);
    this.exercises.splice(index, 1);
  }
}
