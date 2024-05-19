import { ThemedInputWithIcon } from "@/components/InputWithIcon/ThemedInputWithIcon";
import { AuthContext } from "@/contexts/AuthContext";
import { MatchContext } from "@/contexts/MatchContext";
import { Box, Button, Flex, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Text, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { FaLock, FaUser } from "react-icons/fa";
import { MdMail } from "react-icons/md";

type PitchPositionProps = {
  player: string;
  pos: number;
  color: string;
  teamSide: 'home' | 'away';
}

function PitchPosition({ player, pos, color, teamSide }: PitchPositionProps): JSX.Element {
  const toast = useToast();
  const { addPlayer, matchData } = useContext(MatchContext);
  const { login, userData } = useContext(AuthContext); 
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputName, setInputName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ isPlayerInMatch, setIsPlayerInMatch ] = useState<boolean>(false);

  const toastFactory = (title: string, description: string, status: 'success' | 'error' | 'warning') => {
    toast({
      title,
      description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  };

  useEffect(() => {
    if(!matchData) return;
    if(!userData) return;

    const isInMatch = matchData.home.players!.some((player) => player._id === userData._id) ||
    matchData.away.players!.some((player) => player._id === userData._id);

    setIsPlayerInMatch(!!isInMatch);
  }, [matchData, userData]);

  const handleOnOpen = () => {
    if(isPlayerInMatch) {
      toastFactory('Aviso', 'Ya estás en el partido', 'warning');
      return false;
    }

    if(isPlayerInMatch) {
      toastFactory('Aviso', 'Ya estás en el partido', 'warning');
      return false;
    }


    return onOpen();
  }

  const handleAddPlayer = async () => {
    const player = {
      _id: "",
      name: inputName,
      pos: pos,
    };
    console.log(player);
    await addPlayer(teamSide, player);
  }

  const handleJoin = async () => {
    if (!userData) {
      await login(email, password, () => {
        handleAddPlayer();
      });

      return;
    } 

    handleAddPlayer();
  }

  const playerColor = player ? 'green.700' : color;
  return (
    <Flex direction='column' align='center' justify='center' gap={2}>
      <Popover isOpen={isOpen} onClose={onClose}>
        <PopoverTrigger>
          <Box
            as="button"
            onClick={handleOnOpen}
            width={['1.5rem', '2rem', '2rem', '2rem']}
            aspectRatio={1}
            backgroundColor={playerColor}
            borderRadius='full'
            border='3px solid white'
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader> ¡Únete a la pichanga! 🥳 </PopoverHeader>
          <PopoverBody>
            <VStack spacing={1}>
              { !userData ? <>
                <Text align='center' maxW='100%' fontSize='sm'>
                  Ups... parece que no has iniciado sesión.
                </Text>

                <ThemedInputWithIcon
                  w='100%'
                  icon={MdMail}
                  type="email"
                  placeholder='Email'
                  value={email}
                  variant="outline"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <ThemedInputWithIcon
                  w='100%'
                  icon={FaLock}
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  variant="outline"
                  showButton
                  onChange={(e) => setPassword(e.target.value)}
                />
              </> : <></>}
              <ThemedInputWithIcon 
                w='100%'
                icon={FaUser}
                type="text"
                placeholder="Nombre"
                value={inputName}
                variant="outline"
                onChange={(e) => setInputName(e.target.value)}
              />
            </VStack>
          </PopoverBody>
          <PopoverFooter>
            <Button w='full' colorScheme="green" onClick={handleJoin}>
              Unirse
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover> 
      <Text fontSize={['xs', 'sm', 'sm', 'sm']} variant='unstyled' textAlign='center' color='white' maxW='100%' fontWeight='bold'>
        {player || `Jugador ${pos + 1}`}
      </Text>
    </Flex>
  );
}

export { PitchPosition };
