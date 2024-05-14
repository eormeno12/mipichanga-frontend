import { Flex, Input, VStack } from '@chakra-ui/react';
import { PitchPosition } from './PitchPosition';
import { useEffect, useState } from 'react';

type PitchProps = {
  reverse: boolean;
  color: string;
  onChange: (players: string[]) => void;
}


function Pitch({ reverse, color, onChange}: PitchProps): JSX.Element {
  const [order, setOrder] = useState<string>('');
  const orderArray = order.split('-').filter((item) =>
    !isNaN(parseInt(item))
  ).map((item) => parseInt(item));

  const [players, setPlayers] = useState<string[]>([]);

  useEffect(() => {
    onChange(players);
  }, [players]);

  const handlePlayerNameChange = (index: number, newName: string) => {
    setPlayers(prevPlayers => {
      const updatedPlayers = [...prevPlayers];
      updatedPlayers[index] = newName;
      return updatedPlayers;
    });
  };

  useEffect(() => {
    const total = orderArray.reduce((a, b) => a + b, 0);

    if (total < players.length) {
      setPlayers(players.slice(0, total));
    } else if (total > players.length) {
      setPlayers(prevPlayers => [...prevPlayers, ...Array(total - prevPlayers.length).fill('')]);
    }
  }, [order]);

  const renderPitchPositions = (color: string) => {
    const levels = orderArray.length;
    const pitchPositions = [];

    for (let i = 0; i < levels; i++) {
      const level = [];
      
      for (let j = 0; j < orderArray[i]; j++) {
        const idx = orderArray.slice(0, i).reduce((acc, cur) => acc + cur, 0) + j;

        level.push(
          <PitchPosition
            key={`pitch-position-${idx}`}
            player={players[idx]}
            onChange={(event) => handlePlayerNameChange(idx, event.target.value)}
            placeholder={`Jugador ${idx + 1}`}
            color={color}
          />
        )
      }

      pitchPositions.push(
        <Flex direction='row' justify='space-around' width='100%' key={`level-${i}`}>
          {level.map((item) => item)}
        </Flex>
      )
    }

    return reverse ? [...pitchPositions].reverse() : pitchPositions;
  }

  return (
    <Flex direction='column'>
      <Input textAlign='center' mt={reverse ? "2" : "0"} mb={reverse ? "0" : "2"} placeholder='Alineación (ejemplo: 1-3-4-3)' order={reverse ? "2" : "1"} value={order} 
      onChange={(event) => {
        const value = event.target.value;
        
        // const regex = new RegExp('^\d+\-\d+\-\d+$');

        if (true) {
          const valueArray = value.split('-').filter((item) =>
            !isNaN(parseInt(item))
          ).map((item) => parseInt(item));

          const total = valueArray.reduce((a, b) => a + b, 0);
          if(total <= 11) setOrder(value);
        }
      }} />
      <VStack order={reverse ? "1" : "2"} width='33.75vw' minH='40vh' height='fit-content' justify='space-between' backgroundColor='brand.900' p={6}>
        {
          renderPitchPositions(color)
        }
      </VStack>
    </Flex>
  )
}
export { Pitch };
