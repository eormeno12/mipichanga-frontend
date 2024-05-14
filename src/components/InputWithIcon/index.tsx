import { Icon, IconButton, Input, InputGroup, InputLeftElement, InputProps, InputRightElement, Stack, StackProps } from '@chakra-ui/react';
import { useState } from 'react';
import { IconType } from 'react-icons';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';

interface InputWithIconProps extends StackProps {
  icon: IconType;
  type: string;
  placeholder: string;
  value: string;
  showButton: boolean;
  colorScheme: InputProps['colorScheme'];
  variant: InputProps['variant'];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function InputWithIcon({icon, type, placeholder, value, showButton, onChange, colorScheme, variant, ...rest}: InputWithIconProps): JSX.Element {
  const [show, setShow] = useState(false)
  const handleClick = () => setShow(!show)

  return (
    <Stack spacing={4} {...rest}>
      <InputGroup>
        <InputLeftElement pointerEvents='none'>
          <Icon as={icon} size='16px' color='brand.900'/>
        </InputLeftElement>

        <Input 
          pr={showButton ? "4.5rem" : "2rem"} 
          type={showButton ? (show ? 'text' : 'password') : type} 
          placeholder={placeholder} 
          colorScheme={colorScheme}
          variant={variant}
          value={value} 
          onChange={onChange} />

        {
          showButton && (
            <InputRightElement width="4.5rem">
              <IconButton h='1.75rem' size='md' onClick={handleClick} icon={show ? <IoMdEyeOff /> : <IoMdEye />} color='gray' variant='unstyled' aria-label="Mostrar / ocultar texto"/>
            </InputRightElement>
          )
        }
      </InputGroup>
    </Stack>
  );
}

export { InputWithIcon };
