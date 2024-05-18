import { Flex, Input, Text, VStack } from '@chakra-ui/react';
import { PitchPosition } from './PitchPosition';
import { useContext, useEffect, useState } from 'react';
import { MatchContext } from '@/contexts/MatchContext';

type PitchProps = {
  reverse: boolean;
  color: string;
  teamSide: 'home' | 'away'
}


function Pitch({ reverse, color, teamSide }: PitchProps): JSX.Element {
  const { matchData, homePlayers, awayPlayers } = useContext(MatchContext);

  const teamName = teamSide === 'home' ? matchData?.home.name : matchData?.away.name;
  const playersName = teamSide === 'home' ? homePlayers : awayPlayers;
  const lineup = teamSide === 'home' ? matchData?.home.lineup : matchData?.away.lineup;

  const renderPitchPositions = (color: string) => {
    if(!lineup) return [];
  
    const lineupArray = lineup.split('-').filter((item) =>
      !isNaN(parseInt(item))
    ).map((item) => parseInt(item));

    const levels = lineup.length;
    const pitchPositions = [];

    for (let i = 0; i < levels; i++) {
      const level = [];
      
      for (let j = 0; j < lineupArray[i]; j++) {
        const idx = lineupArray.slice(0, i).reduce((acc, cur) => acc + cur, 0) + j;

        level.push(
          <PitchPosition
            key={`pitch-position-${idx}`}
            player={playersName[idx]}
            pos={idx}
            color={color}
            teamSide={teamSide}
          />
        )
      }

      pitchPositions.push(
        <Flex direction='row' justify='space-around' maxW='100%' width='100%' key={`level-${i}`}>
          {level.map((item) => item)}
        </Flex>
      )
    }

    return reverse ? [...pitchPositions].reverse() : pitchPositions;
  }

  return (
    <Flex direction='column' bgColor='green.500' boxShadow='lg' w='full'>
      <Text textAlign='center' my={2} order={reverse ? "2" : "1"} fontWeight='bold' color='white'>
        {teamName} ({lineup})
      </Text>

      <VStack order={reverse ? "1" : "2"} w='100%' h='100%' justify='space-between' p={6}>
        {
          renderPitchPositions(color)
        }
      </VStack>
    </Flex>
  )
}
export { Pitch };
