import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutEntry } from './workout-entry.entity';

@Entity('workouts')
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: number;

  @Column()
  date: string;

  @Column({ nullable: true })
  notes?: string;

  @OneToMany(() => WorkoutEntry, (entry) => entry.workout, { cascade: true, eager: true })
  entries: WorkoutEntry[];
}
