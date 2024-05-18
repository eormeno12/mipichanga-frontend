import { Flex, Text, VStack } from '@chakra-ui/react';
import { PlayerUI } from './Player';
import { Player } from '@/api/matches/matches.model';
import { MatchContext } from '@/contexts/MatchContext';
import { useContext } from 'react';

type TeamProps = {
  teamSide: 'home' | 'away';
}

function Team({ teamSide } : TeamProps): JSX.Element {
  const { matchData, homePlayers, awayPlayers } = useContext(MatchContext);

  const teamName = teamSide === 'home' ? matchData?.home.name : matchData?.away.name;
  const playersName = teamSide === 'home' ? homePlayers : awayPlayers;

  return (
    <Flex h='100%' p={4} direction="column" width='100%' align='flex-start' justify='flex-start' bgColor='white' borderRadius='xl' boxShadow='lg'>
      <Text w='full' mb={4} variant='unstyled' textAlign='start' fontWeight='bold' textOverflow='ellipsis'>
        {teamName}
      </Text>
      <VStack>
        {playersName.map((player, idx) => (
          <PlayerUI key={`${idx}-${player}`} name={player} />
        ))}
      </VStack>
    </Flex>
  );
};

export { Team };
