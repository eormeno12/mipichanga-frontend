"use client";

import NextLink from 'next/link'
import { getFields } from "@/api/fields";
import { Field } from "@/api/fields/fields.model";
import { createMatch } from "@/api/matches";
import { CreateMatch, Team } from "@/api/matches/matches.model";
import Dropdown from "@/components/Dropdown";
import { ThemedInputWithIcon } from "@/components/InputWithIcon/ThemedInputWithIcon";
import { ProtectedPage } from "@/components/ProtectedPage";
import { validateMatchIsNotEmpty } from "@/utils/validate";
import { Button, Card, CardBody, CardHeader, Center, FormControl, FormLabel, Heading, HStack, Link, Text, useToast, VStack } from "@chakra-ui/react";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BiCalendar } from "react-icons/bi";
import { GoSortAsc } from "react-icons/go";
import { PiSoccerBall } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { FRONTEND_ROUTES } from "../../../config";

function TeamForm({ team, onChange }: { team: Team, onChange: (team: Team) => void }) {
  const handleOnChange = (key: keyof Team, value: string) => {
    onChange({
      ...team,
      [key]: value,
    });
  }

  return (
    <FormControl>
      <FormLabel>Nombre del equipo</FormLabel>
      <ThemedInputWithIcon
        icon={RiTeamFill}
        type="text"
        placeholder="Nombre del equipo"
        value={team.name}
        variant="solid"
        onChange={(e) => handleOnChange('name', e.target.value)}
      />
      <FormLabel mt={4}>Alineación del equipo (Ej. 1-4-2)</FormLabel>
      <ThemedInputWithIcon
        icon={GoSortAsc}
        type="text"
        placeholder={`Alineación del equipo`}
        value={team.lineup}
        variant="solid"
        onChange={(e) => handleOnChange('lineup', e.target.value)}
      />
    </FormControl>
  );

}


function SelectField({  fieldsData, onSelect }: { fieldsData: Field[], onSelect: (id: string) => void }) {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const data = fieldsData.map((field) => ({
    id: field._id,
    name: `${field.name} - ${field.location.prefix}, ${field.location.city}, ${field.location.country}`,
    imageUrl: field.imageUrl,
  }));

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
  }

  return (
    <Dropdown
      id='field'
      title='Selecciona una cancha'
      data={data}
      hasImage
      selectedId={selectedId}
      onSelect={handleSelect}
    />
  );
}

function CreatePichangaUI() {
  const router = useRouter();
  const toast = useToast();
  const errorToast = (title: string, description: string) => {
    toast({
      title,
      description,
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
  }

  const [fields, setFields] = useState<Field[]>([]);

  useEffect(() => {
    const fetchFields = async () => {
      const fields = await getFields();
      setFields(fields);
    }

    fetchFields();
  }, []);

  const [match, setMatch] = useState<CreateMatch>({
    name: '',
    date: new Date(),
    field: {
      _id: '',
      name: '',
      imageUrl: '',
      location: {
        prefix: '',
        city: '',
        country: '',
      }
    },
    home: {
      name: '',
      lineup: '',
    },
    away: {
      name: '',
      lineup: '',
    },
  });


  const updateMatch = (key: keyof CreateMatch, value: CreateMatch[keyof CreateMatch]) => {
    setMatch({
      ...match,
      [key]: value,
    });
  }

  const onSelectField = (id: string) => {
    const field = fields.find((field) => field._id === id);
    if (field) {
      updateMatch('field', field);
    }
  }

  const handleCreateMatch = async () => {
    const errors = validateMatchIsNotEmpty(match);

    if(errors.length > 0) {
      errorToast('Error', errors.join('. '));
    } else {
      try {
        const newMatch = await createMatch(match);
        router.push(FRONTEND_ROUTES.MATCHES + `/${newMatch._id}`);
      } catch (error) {
        errorToast('Error', "No se pudo crear la pichanga. Inténtalo de nuevo.");
      }
    }
  }

  return (
    <main>
      <Center p={4} w="100%" h="100%" backgroundColor='green.500'>
        <Card w={["full", "full", "40vw"]} p={8} bgColor="gray.100" borderRadius='xl' boxShadow='lg'>
          <CardHeader>
            <HStack justify="flex-end" align="center">
              <Link as={NextLink} href={FRONTEND_ROUTES.PROFILE} color='green.500'>
                Ir a mi perfil
              </Link>
            </HStack>
            <VStack spacing={4} align="center" mt={8}>
              <Heading as="h1" size="2xl" fontWeight="bold" textAlign="center">
                Crear Pichanga ⚽️
              </Heading>
              <Text fontSize="md" textAlign="center">
                Completa los siguientes campos para crear tu pichanga.
              </Text>
            </VStack>
          </CardHeader>

          <CardBody p={2}>
            <FormControl>
              <FormLabel>Nombre de la Pichanga</FormLabel>
              <ThemedInputWithIcon
                icon={PiSoccerBall}
                type="text"
                placeholder='Nombre'
                value={match.name}
                variant="solid"
                onChange={(e) => updateMatch('name', e.target.value)}
              />
              <FormLabel mt={4}>Fecha de la Pichanga</FormLabel>
              <ThemedInputWithIcon
                icon={BiCalendar}
                type="datetime-local"
                placeholder="Fecha"
                value={moment(match.date).format('YYYY-MM-DDTHH:mm')}
                variant="solid"
                onChange={(e) => updateMatch('date', new Date(e.target.value))}
              />

              <FormLabel mt={4}>Cancha para jugar</FormLabel>
              <SelectField 
                fieldsData={fields} 
                onSelect={onSelectField}
              />

              <VStack mt={4} spacing={4} bgColor='gray.200' p={4} borderRadius='xl'>
                <Text w='full' fontSize="md" fontWeight="bold">Equipo Local</Text>
                <TeamForm 
                  team={match.home} 
                  onChange={(team) => updateMatch('home', team)}
                />
              </VStack>

              <VStack mt={4} spacing={4} bgColor='gray.200' p={4} borderRadius='xl'>
                <Text w='full' fontSize="md" fontWeight="bold">Equipo Visitante</Text>
                <TeamForm 
                  team={match.away} 
                  onChange={(team) => updateMatch('away', team)}
                />
              </VStack>
              
              <Button mt={4} w='full' colorScheme="green" onClick={handleCreateMatch}>
                Crear Pichanga
              </Button>
            </FormControl>
          </CardBody>
      </Card>
      </Center>
    </main>
  );
}

export default function CreatePichanga() {
  return (
    <ProtectedPage>
      <CreatePichangaUI />
    </ProtectedPage>
  );
}