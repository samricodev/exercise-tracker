import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export type ExerciseCategory =
  | 'strength'
  | 'cardio'
  | 'flexibility'
  | 'balance';

@Entity('exercises')
export class Exercise {
  constructor(
    id: number,
    name: string,
    category: ExerciseCategory,
    muscleGroups: string[],
    description?: string,
  ) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.muscleGroups = muscleGroups;
    this.description = description;
  }
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: ExerciseCategory;

  @Column('simple-array')
  muscleGroups: string[];

  @Column({ nullable: true })
  description?: string;
}
