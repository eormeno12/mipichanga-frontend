"use client"

import { UserMatch } from "@/api/users/users.model";
import { TextWithIcon } from "@/components/TextWithIcon";
import { AuthContext } from "@/contexts/AuthContext";
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Flex, Heading, Icon, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import 'moment/locale/es';
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { BiPlusCircle } from "react-icons/bi";
import { MdLocationOn } from "react-icons/md";
import { FRONTEND_ROUTES } from "../../../config";
import { ProtectedPage } from "@/components/ProtectedPage";

function CardsContainer({ children }: { children: React.ReactNode }) {
  return (
    <SimpleGrid columns={[1, 1, 2, 2, 3, 4]} 
      spacing={['20px', '30px', '40px']} 
      mt={8}
      px={[4, 8, 12]}
      alignContent="center"
      justifyItems="center"
    >
      {children}
    </SimpleGrid>
  );
}

function UserMatchCard({ match, onClick }: {match: UserMatch, onClick: () => void}) {
  return (
    <Card 
    w={'100%'}
    maxW='400px'
    h='460px'
    borderRadius='xl'
    position="relative"
    color='white'
    boxShadow="lg"
    py={2}
  >
    <Image
      src={match.field.imageUrl || ''}
      alt={`Imagen de la cancha ${match.field.name}`}
      objectFit="cover"
      w="100%"
      h="100%"
      position="absolute"
      top="0"
      left="0"
      zIndex='0'
      borderRadius='xl'
    />

    <Box
      position="absolute"
      top="0"
      left="0"
      w="100%"
      h="100%"
      bgColor='blackAlpha.700'
      zIndex='1'
      borderRadius='xl'
    ></Box>

    <CardHeader  zIndex={2}>
      <Text fontSize="md">Creado {moment(match.createdAt).fromNow()}</Text>
      <Text fontSize="md">Fecha del partido: {moment(match.date).format('DD/MM/YYYY HH:mm')}</Text>
      <Text fontSize="md" fontWeight="bold">Juegas {moment(match.date).fromNow()}</Text>
    </CardHeader>

    <CardBody  zIndex={2}>
      <VStack height='100%' align='flex-start' justify='flex-end'>
        <Heading mt={2} fontSize="xl" fontWeight="bold" mb="2"  textTransform='capitalize'>
          {match.name}
        </Heading>

        <Heading mt={4} fontSize="lg" fontWeight="bold" mb="2" textTransform='capitalize'>
          {match.field.name}
        </Heading>
        <TextWithIcon icon={MdLocationOn} fontSize="lg">
          {match.field.location.prefix}, {match.field.location.city}, {match.field.location.country}
        </TextWithIcon>
      </VStack>
    </CardBody>

    <CardFooter  zIndex={2}>
      <Button width='full' variant='solid' colorScheme='green' onClick={onClick}>
        Pichanguear
      </Button>
    </CardFooter>
  </Card>
  );
}

function CreateMatchButton({onClick}: {onClick?: () => void}) {
  return (
    <Button 
      w={'100%'}
      maxW='400px'
      h='460px'
      borderRadius='xl'
      position="relative"
      colorScheme="green"
      boxShadow="lg"
      py={2}
      onClick={onClick}
    >
      <Center height='100%' w='100%'>
          <VStack align='center'>
            <Icon as={BiPlusCircle} w={12} h={12} color='white' />
            <Text fontSize='lg' color='white' fontWeight='bold'>Crear Partido</Text>
          </VStack>
        </Center>
    </Button>
  )
}

function ProfileUI() {
  const router = useRouter();
  const { userData, userLogout} = useContext(AuthContext);
  moment.locale('es');

  const renderMatches = () => {
    const handleMatchClick = (matchId: string) => {
      router.push(FRONTEND_ROUTES.MATCHES + '/' + matchId);
    }

    const handleCreateMatch = () => {
      router.push(FRONTEND_ROUTES.MATCHES);
    }

    return (
      <CardsContainer>
        {userData?.matches.map((match) => (
          <UserMatchCard 
            key={match._id} 
            match={match} 
            onClick={() => handleMatchClick(match._id)} />
        ))}
        <CreateMatchButton onClick={handleCreateMatch} />
      </CardsContainer>
    )
  }

  return (
    <main>
      <Flex direction="row" justify="space-between" align="center" p={4} bgColor='green.500' color='white'>
        <VStack align="flex-start">
          <Heading size="lg">Mi Perfil</Heading>
          <Text fontSize="md">{userData?.email}</Text>
        </VStack>

        <Box>
          <Button onClick={userLogout} colorScheme="whiteAlpha">
            Cerrar Sesión
          </Button>
        </Box>
      </Flex>


      <Box p={4}>
        <Heading size="md">Mis Partidos</Heading>
        {renderMatches()}
      </Box>
    </main>
  );
}


export default function Profile(): JSX.Element {
  return (
    <ProtectedPage> 
      <ProfileUI />
    </ProtectedPage>
  )
}