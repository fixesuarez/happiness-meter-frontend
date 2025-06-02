import { UserScore } from "@/models/score";
import { create } from "zustand";

interface ScoreState {
  scores: UserScore[];
  setScores: (scores: UserScore[]) => void;
  addScore: (score: UserScore) => void;
}

export const useScoreStore = create<ScoreState>()((set) => ({
  scores: [],
  setScores: (scores: UserScore[]) => set(() => ({ scores: scores })),
  addScore: (score: UserScore) =>
    set((state) => ({ scores: [...state.scores, score] })),
}));
