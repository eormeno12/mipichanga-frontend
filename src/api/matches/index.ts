import { matches_api, users_api } from "..";
import { CreateMatch, Match, MatchSchema } from "./matches.model";

export const addMatchToUser = async (match: Match) => {
  const { home, away, ...rest } = match;
  await users_api.put("/users/me/matches", { 
    ...rest,
  });
}

export const createMatch = async (match: CreateMatch) => {
  const res1 = await matches_api.post("/matches", {...match});
  const matchData = MatchSchema.parse(res1.data);

  if (res1.status === 201) {
    await addMatchToUser(matchData);
  }

  return matchData;
}

export const getMatch = async (matchId: string) => {
  const res = await matches_api.get(`/matches/${matchId}`);
  return MatchSchema.parse(res.data);
}

export const addPlayerToMatch = async (matchId: string, match: Match, team: 'home' | 'away', name: string, pos: number) => {
  const res = await matches_api.put(`/matches/${matchId}/players`, { 
    team,
    name,
    pos,
  });


  if (res.status === 200) {
    await addMatchToUser(match);
  }

  return MatchSchema.parse(res.data);
}
