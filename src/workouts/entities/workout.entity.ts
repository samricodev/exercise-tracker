import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { WorkoutEntry } from './workout-entry.entity';

@Entity('workouts')
export class Workout {
  constructor(
    id: number,
    user: User,
    userId: number,
    date: string,
    notes: string | undefined,
    entries: WorkoutEntry[],
  ) {
    this.id = id;
    this.user = user;
    this.userId = userId;
    this.date = date;
    this.notes = notes;
    this.entries = entries;
  }

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

  @OneToMany(() => WorkoutEntry, (entry) => entry.workout, {
    cascade: true,
    eager: true,
  })
  entries: WorkoutEntry[];
}
