import { TextWithIcon } from "@/components/TextWithIcon";
import { FaUser } from 'react-icons/fa';

interface PlayerProps {
  name: string;
}

export function PlayerUI ({ name }: PlayerProps) {
  return (
    <TextWithIcon width='100%' icon={FaUser} fontSize='lg' textOverflow='ellipsis'>
      {name || "-"}
    </TextWithIcon>
  );
};

