import { HStack, Icon, StackProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';

interface TextWithIconProps extends StackProps {
  icon: IconType;
  children: ReactNode;
}

function TextWithIcon({ icon, children, ...rest }: TextWithIconProps): JSX.Element {
  return (
    <HStack align="center" {...rest}>
      <Icon as={icon} color='brand.900'/>
      <Text>{children}</Text>
    </HStack>
  );
};

export { TextWithIcon };
