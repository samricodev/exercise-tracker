export interface WorkoutEntry {
  exerciseId: number;
  sets?: number;
  reps?: number;
  durationSeconds?: number;
  weightKg?: number;
}

export interface Workout {
  id: number;
  userId: number;
  date: string;
  entries: WorkoutEntry[];
  notes?: string;
}
