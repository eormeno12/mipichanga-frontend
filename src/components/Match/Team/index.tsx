import { Flex, Input, VStack } from '@chakra-ui/react';
import { Player } from './Player';
import { useState } from 'react';

type TeamProps = {
  players: string[];
}

function Team({players } : TeamProps): JSX.Element {
  const [team, setTeam] = useState<string>();

  return (
    <Flex direction="column" width='320px' align='flex-start' justify='flex-start'>
      <Input mb={4} variant='unstyled' textAlign='start' placeholder='Nombre del Equipo' maxW='100%' fontWeight='bold' isTruncated value={team} onChange={(event) =>  setTeam(event.target.value)}/>
      <VStack>
        {players.map((player, idx) => (
          <Player key={`${idx}-${player}`} name={player} />
        ))}
      </VStack>
    </Flex>
  );
};

export { Team };
