'use client'

import { ThemedInputWithIcon } from '@/components/InputWithIcon/ThemedInputWithIcon';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';


export default function Home() {
  const router = useRouter();
  const [matchId, setMatchId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleCreateMatch = () => {
    // Crear un nuevo partido
    // Luego redirigir a la página de partidos
    const newMatchId = '12345';
    router.push(`/pichanga/${newMatchId}`);
  };

  const handleViewMatches = () => {
    router.push(`/pichanga/me`);
  };

  const handleLogin = () => {
    // Aquí puedes implementar la lógica de autenticación
    console.log('Iniciando sesión...');
  };

  return (
    <Center px={4} w="100%" h="100vh" backgroundColor='green.500'>
      <Image 
        src="/soccer-field.svg" 
        alt="Soccer Field"
        pos='fixed'
        width='100%'
        objectFit="cover"
        opacity={0.3}
      />
      <Card w={["full", "full", "40vw"]} p={8} bgColor="gray.100" borderRadius='xl' boxShadow='lg'>
        <CardHeader>
          <VStack spacing={4} align="center">
            <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center">
              MiPichanga ⚽️
            </Heading>
            <Text fontSize="md" textAlign="center">
              Con MiPichanga podrás organizar partidos de fútbol de manera fácil y divertida. Aquí puedes crear tus propios partidos, unirte a partidos existentes e incluso ver tus próximos encuentros.
            </Text>
          </VStack>
        </CardHeader>

        <CardBody p={2}>
          <FormControl id="login">
            <FormLabel>Email</FormLabel>
            <ThemedInputWithIcon
              icon={MdMail}
              type="email"
              placeholder='Email'
              value={email}
              variant="solid"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormLabel mt={4}>Contraseña</FormLabel>
            <ThemedInputWithIcon
              icon={FaLock}
              type="password"
              placeholder="Contraseña"
              value={password}
              variant="solid"
              showButton
              onChange={(e) => setPassword(e.target.value)}
            />

            <VStack mt={4}>
              <Button w='full' colorScheme="green" onClick={handleLogin}>
                Crear Pichanga
              </Button>

              <Button w='full' colorScheme="green" variant="ghost" onClick={handleViewMatches}>
                Ver mis Pichangas
              </Button>
            </VStack>
          </FormControl>
        </CardBody>
    </Card>
    </Center>
  );
}
