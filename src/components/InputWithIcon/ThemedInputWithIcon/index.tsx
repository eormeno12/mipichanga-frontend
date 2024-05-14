import { IconType } from "react-icons";
import { InputWithIcon } from "..";
import { InputProps, StackProps } from "@chakra-ui/react";

interface ThemedInputWithIconProps extends StackProps {
  icon: IconType;
  type: string;
  placeholder: string;
  value: string;
  showButton?: boolean;
  variant: InputProps['variant'];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

}
export function ThemedInputWithIcon({showButton=false, ...props}: ThemedInputWithIconProps) {
  return (
    <InputWithIcon {...props} color="green.500" colorScheme="green" showButton={showButton}/>
  );
}