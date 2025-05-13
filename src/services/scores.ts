import { UserScore, UserScorePayload } from "@/models/score";
import { post, patch } from "@/utils/httpWrapper";

export const createOrUpdateScore = async (scorePayload: UserScorePayload) => {
  const httpMethod = scorePayload._id ? patch : post;
  const endpoint = scorePayload._id
    ? `/scores/${scorePayload._id}`
    : "/scores/";
  try {
    return (await httpMethod(endpoint, scorePayload)) as UserScore;
  } catch {
    throw new Error("Error while sending score");
  }
};
