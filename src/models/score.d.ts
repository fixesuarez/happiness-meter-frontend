export interface UserScore {
  _id?: string;
  date: string;
  score: number | null;
  comment?: string;
}

export type UserScorePayload = Omit<UserScore, "date"> & {
  date: Date;
  user_id?: string;
};
