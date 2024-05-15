import { matches_api, users_api } from "..";
import { CreateMatch, MatchSchema } from "./matches.model";

export const createMatch = async (match: CreateMatch) => {
  const res1 = await matches_api.post("/matches", {...match});
  const matchData = MatchSchema.parse(res1.data);

  if (res1.status === 201) {
    const { home, away, ...rest } = match;
    await users_api.put("/users/me/matches", { 
      "_id": matchData._id,
      "createdAt": matchData.createdAt,
      ...rest,
    });
  }

  return matchData;
}
