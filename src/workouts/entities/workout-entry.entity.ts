import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Exercise } from '../../exercises/entities/exercise.entity';
import { Workout } from './workout.entity';

@Entity('workout_entries')
export class WorkoutEntry {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Workout, (workout) => workout.entries, { onDelete: 'CASCADE' })
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
