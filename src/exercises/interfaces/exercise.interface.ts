import type { ExerciseCategory } from '../dto/create-exercise.dto';
export type { ExerciseCategory };

export interface Exercise {
  id: number;
  name: string;
  category: ExerciseCategory;
  muscleGroups: string[];
  description?: string;
}
