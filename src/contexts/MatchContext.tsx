import { addPlayerToMatch, getMatch } from "@/api/matches";
import { Match, Player } from "@/api/matches/matches.model";
import { validatePlayerIsNotEmpty } from "@/utils/validate";
import { useToast } from "@chakra-ui/react";
import { ReactNode, createContext, useEffect, useState } from "react";
import { set } from "zod";

interface MatchContextProps {
  matchData: Match | null;
  homePlayers: string[];
  awayPlayers: string[];
  loading: boolean;
  reloadMatch: () => Promise<void>;
  addPlayer: (team: 'home' | 'away', player: Player) => Promise<void>;
}

const MatchContext = createContext<MatchContextProps>({
  matchData: null,
  loading: true,
  homePlayers: [],
  awayPlayers: [],
  reloadMatch: () => Promise.resolve(),
  addPlayer: (team: 'home' | 'away', player: Player) => Promise.resolve(),
});

function MatchProvider({matchId, children}: {matchId: string, children: ReactNode}): JSX.Element {
    const toast = useToast();
    const [matchData, setMatchData] = useState<Match | null>(null);
    const [homePlayers, setHomePlayers] = useState<string[]>([]);
    const [awayPlayers, setAwayPlayers] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const getNumPlayers = (lineup: string) => lineup.split('-').reduce((acc, curr) => acc + parseInt(curr), 0);
    const getPlayersList = (lineup: string, players: Player[]) => {
      const numPlayers = getNumPlayers(lineup);
      const playersName = Array(numPlayers).fill('');
  
      for(let i = 0; i < players.length; i++) {
        playersName[players[i].pos - 1] += players[i].name;
      }
  
      return playersName;
    }

    const successToast = (title: string, description: string) => {
      toast({
        title,
        description,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }

    const errorToast = (title: string, description: string) => {
      toast({
        title,
        description,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }

    const fetchMatchData = async () => {
      try {
        const match = await getMatch(matchId); 
        setMatchData(match);
        setHomePlayers(getPlayersList(match.home.lineup, match.home.players!));
        setAwayPlayers(getPlayersList(match.away.lineup, match.away.players!));
      } catch (error) {
        errorToast('Error', 'Ocurrió un error al cargar la pichanga.');
      }
    }

    useEffect(() => {
      const fetchMatch = async () => {
        await fetchMatchData();
      }

      setLoading(true);
      fetchMatch();
      setLoading(false);
    }, []);

    const reloadMatch = async () => {
      setLoading(true);
      await fetchMatchData();
      setLoading(false);
    }

    const addPlayer = async (team: 'home' | 'away', player: Player) => {
      if(!matchData) return;
      
      const errors = validatePlayerIsNotEmpty(player);
      console.log(errors);
      if(errors.length > 0) {
        errorToast('Error', 'El nombre del jugador no puede estar vacío.');
        return;
      }

      setLoading(true);
      try {
        await addPlayerToMatch(matchId, matchData, team, player.name, player.pos);
      
        await fetchMatchData();
        successToast('Éxito', 'Jugador agregado correctamente.');
      } catch (error) {
        errorToast('Error', 'Ocurrió un error al agregar el jugador.');
      }

      setLoading(false);
    }
  
    return (
      <MatchContext.Provider value={{ matchData, loading, reloadMatch, addPlayer, homePlayers, awayPlayers }}>
        {children}
      </MatchContext.Provider>
    );
};

export { MatchContext, MatchProvider };
