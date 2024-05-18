'use client'

import { MatchContext } from '@/contexts/MatchContext';
import { Box, Flex, Grid, Heading, Text, VStack } from '@chakra-ui/react';
import moment from 'moment';
import 'moment/locale/es';
import { useContext } from 'react';
import { Team } from './Team';
import { Pitch } from './Team/Pitch';

export function MatchUI() {
  moment.locale('es');
  const { matchData } = useContext(MatchContext);
  return (
    <>
      { matchData ? <VStack w='100vw' h='100%' minH='100vh' bgColor='green.600' px={4} py={8}>
        <Box w='full' color="white" mb={4}>
          <Heading w='full' as='h1' size='xl' textAlign='center'>
            {matchData.name} - {matchData.field.name}
          </Heading>
          <Text w='full' textAlign='center' fontSize='lg' mt={2}>
            {matchData.field.location.prefix}, {matchData.field.location.city}, {matchData.field.location.country}
          </Text>
          <Text w='full' textAlign='center' fontSize='lg'>
            {moment(matchData.date).format('DD/MM/YYYY HH:mm')} - <Text as='b'>{moment(matchData.date).fromNow()}</Text>
          </Text>
        </Box>

        <Grid templateColumns={['1fr', '1fr', '1fr', '1fr 2fr 1fr']} gap={4} w='100%' maxW='1000px'>
          <Team teamSide='home'/>

          <Grid w='100%' templateRows='1fr 1fr' gap={4}>
            <Pitch reverse={false} color='blue.500' teamSide='home' />
            <Pitch reverse={true} color='red.500' teamSide='away' />
          </Grid>

          <Team teamSide='away' />
        </Grid>
      </VStack> : <></>}
    </>
  );
}
