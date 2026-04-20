import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsController } from './workouts.controller';
import { WorkoutsService } from './workouts.service';
import { ExercisesModule } from '../exercises/exercises.module';
import { Workout } from './entities/workout.entity';
import { WorkoutEntry } from './entities/workout-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Workout, WorkoutEntry]), ExercisesModule],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
