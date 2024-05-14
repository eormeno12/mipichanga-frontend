import { TextWithIcon } from "@/components/TextWithIcon";
import { FaUser } from 'react-icons/fa';

interface PlayerProps {
  name: string;
}

const Player: React.FC<PlayerProps> = ({ name }) => {
  return (
    <TextWithIcon width='100%' icon={FaUser} fontSize='lg' mr={4}>
      {name || "-"}
    </TextWithIcon>
  );
};


export { Player };
