import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Workout } from './workout.entity';

@Entity('workout_entries')
export class WorkoutEntry {
  constructor(
    id: number,
    workout: Workout,
    exercise: Exercise,
    exerciseId: number,
    sets?: number,
    reps?: number,
    durationSeconds?: number,
    weightKg?: number,
  ) {
    this.id = id;
    this.workout = workout;
    this.exercise = exercise;
    this.exerciseId = exerciseId;
    this.sets = sets;
    this.reps = reps;
    this.durationSeconds = durationSeconds;
    this.weightKg = weightKg;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workout, (workout) => workout.entries, {
    onDelete: 'CASCADE',
  })
  workout: Workout;

  @ManyToOne(() => Exercise)
  exercise: Exercise;

  @Column()
  exerciseId: number;

  @Column({ nullable: true })
  sets?: number;

  @Column({ nullable: true })
  reps?: number;

  @Column({ nullable: true })
  durationSeconds?: number;

  @Column({ type: 'real', nullable: true })
  weightKg?: number;
}
