import { UserScore } from "@/models/score";
import { User } from "@/models/user";
import { postToExternalService } from "@/utils/httpWrapper";

export const sendScoreOnDiscord = (user: User, userScore: UserScore) => {
  if (!import.meta.env.PROD) return;

  void postToExternalService(import.meta.env.VITE_DISCORD_URL, {
    content: `**${user.name}**: ${userScore.score}/10\n${userScore.comment ? `**Commentaire**: ${userScore.comment}` : ""}`,
  });
};
