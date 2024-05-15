import { useEffect, useRef, useState } from 'react';
import { Box, Button, Flex, Icon, Image, List, ListItem, useOutsideClick } from '@chakra-ui/react';
import { GoChevronDown } from 'react-icons/go';

interface DropdownItem {
  id: string;
  name: string;
  imageUrl?: string;
}

interface DropdownProps {
  id: string;
  title?: string;
  data: DropdownItem[];
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  hasImage?: boolean;
  style?: string;
  selectedId?: string;
  onSelect?: (id: string) => void;
}

const Dropdown = ({
  id,
  title = 'Select',
  data,
  position = 'bottom-left',
  hasImage,
  style,
  selectedId,
  onSelect,
}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<DropdownItem | undefined>(
    selectedId ? data?.find((item) => item.id === selectedId) : undefined
  );

  const handleChange = (item: DropdownItem) => {
    setSelectedItem(item);
    onSelect && onSelect(item.id);
    setIsOpen(false);
  };

  useEffect(() => {
    if (selectedId && data) {
      const newSelectedItem = data.find((item) => item.id === selectedId);
      newSelectedItem && setSelectedItem(newSelectedItem);
    } else {
      setSelectedItem(undefined);
    }
  }, [selectedId, data]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick({
    ref: dropdownRef,
    handler: () => setIsOpen(false),
  });

  const dropdownPosition = {
    'bottom-right': { top: 'full', right: 0, mt: 2 },
    'bottom-left': { top: 'full', left: 0, mt: 2 },
    'top-right': { bottom: 'full', right: 0, mb: 2 },
    'top-left': { bottom: 'full', left: 0, mb: 2 },
  };

  return (
    <Box ref={dropdownRef} position="relative">
      <Button
        id={id}
        aria-label='Toggle dropdown'
        aria-haspopup='true'
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        w="full"
        py={2}
        px={4}
        bg="white"
        color="green.500"
        _hover={{ bg: 'gray.200' }}
        className={style}
      >
        <Flex justify="space-between" align="center" w="full">
          <Box as="span">{selectedItem?.name || title}</Box>
          <Icon
            as={GoChevronDown}
            boxSize={5}
            transform={isOpen ? 'rotate(180deg)' : 'rotate(0)'}
            transition="transform 0.5s ease-in-out"
          />
        </Flex>
      </Button>
      {isOpen && (
        <Box
          position="absolute"
          bg="gray.100"
          w="100%"
          maxH="52"
          overflowY="auto"
          py={3}
          rounded="md"
          shadow="md"
          zIndex="10"
          {...dropdownPosition[position]}
        >
          <List role="menu" aria-labelledby={id} aria-orientation="vertical" spacing={2}>
            {data?.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => handleChange(item)}
                cursor="pointer"
                _hover={{ bg: 'gray.200' }}
                bg={selectedItem?.id === item.id ? 'gray.300' : 'transparent'}
                px={3}
                py={2}
                display="flex"
                alignItems="center"
              >
                {hasImage && item.imageUrl && (
                  <Image src={item.imageUrl} alt={item.name} loading="lazy" boxSize="32px" objectFit="cover" mr={2} />
                )}
                <Box as="span">{item.name}</Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
};

export default Dropdown;
