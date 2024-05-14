import { Box, Flex, Input } from "@chakra-ui/react";

type PitchPositionProps = {
  player: string;
  color: string;
  placeholder?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function PitchPosition({ player, color, placeholder, onChange}: PitchPositionProps): JSX.Element {
  return (
    <Flex direction='column' align='center' justify='center' gap={2}>
      <Box  width='3rem' height='3rem' backgroundColor={color} borderRadius='full'></Box>
      <Input variant='unstyled' textAlign='center' color='white' _placeholder={{color: 'whiteAlpha.600'}} placeholder={placeholder} maxW='100%' fontWeight='bold' isTruncated value={player} onChange={onChange}/>
    </Flex>
  );
}

export { PitchPosition };
