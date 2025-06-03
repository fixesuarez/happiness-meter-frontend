import { UserScore } from "@/models/score";
import { getScores } from "@/services/scores";
import { create } from "zustand";

interface ScoreState {
  scores: UserScore[];
  getScores: (userId: string) => Promise<UserScore[]>;
  setScores: (scores: UserScore[]) => void;
}

export const useScoreStore = create<ScoreState>()((set) => ({
  scores: [],
  getScores: async (userId: string) => {
    const scores = await getScores(userId);
    set(() => ({ scores: [...scores] }));
    return scores;
  },
  setScores: (scores: UserScore[]) => set(() => ({ scores: scores })),
}));
