import { UserScore } from "@/models/score";

const getFilledScores = (userScores: UserScore[]): number[] => {
  return userScores
    .filter((score) => typeof score.score === "number")
    .map((score) => score.score) as number[];
};
export const getAverageScore = (userScores: UserScore[]) => {
  if (userScores.length === 0) return "- ";

  const filledScores = getFilledScores(userScores);
  const sum = filledScores.reduce((score1, score2) => score1 + score2, 0);
  return (sum / filledScores.length).toFixed(2);
};
export const getCompletionRate = (userScores: UserScore[]): number => {
  if (userScores.length === 0) return 0;

  const filledScores = getFilledScores(userScores);
  const rate = (filledScores.length / userScores.length) * 100;
  return Math.round(rate);
};
export const getMaxScore = (userScores: UserScore[]) => {
  return userScores.length === 0
    ? "- "
    : Math.max(...getFilledScores(userScores));
};
export const getMinScore = (userScores: UserScore[]) => {
  return userScores.length === 0
    ? "- "
    : Math.min(...getFilledScores(userScores));
};
