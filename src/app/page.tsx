'use client'

import { ThemedInputWithIcon } from '@/components/InputWithIcon/ThemedInputWithIcon';
import { AuthContext } from '@/contexts/AuthContext';
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
  useToast,
  VStack
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { FaLock } from 'react-icons/fa';
import { MdMail } from 'react-icons/md';
import { FRONTEND_ROUTES } from '../../config';
import { validateEmailAndPassword } from '@/utils/validate';


export default function Home() {
  const toast = useToast();

  const { login, userData, loading } = useContext(AuthContext);

  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if(userData && !loading) {
      router.push(FRONTEND_ROUTES.PROFILE);
    }
  }, [userData, loading]);

  const handleCreateMatch = async () => {
    await handleLogin(FRONTEND_ROUTES.MATCHES);
  };

  const handleViewMatches = async () => {
    await handleLogin(FRONTEND_ROUTES.PROFILE);
  };

  const handleLogin = async (to: FRONTEND_ROUTES) => {
    await login(email, password, () => {
      router.push(to);
    });
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
          <FormControl>
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
              <Button w='full' colorScheme="green" onClick={handleCreateMatch}>
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
