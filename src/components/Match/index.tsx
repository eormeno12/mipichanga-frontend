'use client'

import { Flex, VStack } from '@chakra-ui/react';
import { Pitch } from './Team/Pitch';
import { Team } from './Team';
import { useState } from 'react';

export function Match() {
  const [players1, setPlayers1] = useState<string[]>([]);
  const [players2, setPlayers2] = useState<string[]>([]);

  return (
    <Flex width='100vw' height='fit-content' minH='100vh' align='flex-start' justify='space-between' px={12}>
      <Team players={players1} />

      <VStack height='fit-content' minH='80vh'>
        <Pitch reverse={false} color='blue' onChange={(players) => setPlayers1(players)}/>
        <Pitch reverse={true} color='red' onChange={(players) => setPlayers2(players)}/>
      </VStack>
      <Team players={players2} />
    </Flex>
  );
}
