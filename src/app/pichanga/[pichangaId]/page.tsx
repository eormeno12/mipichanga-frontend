"use client";

import { getMatch } from "@/api/matches";
import { Match } from "@/api/matches/matches.model";
import { MatchUI } from "@/components/MatchUI";
import { MatchProvider } from "@/contexts/MatchContext";
import { useEffect, useState } from "react";

export default function Pichanga({ params }: { params: { pichangaId: string } }) {
  const { pichangaId } = params;
  return (
    <main>
      <MatchProvider matchId={pichangaId}>
        <MatchUI />
      </MatchProvider>
    </main>
  );
}
