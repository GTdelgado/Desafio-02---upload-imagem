import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="4xl">
      <ModalOverlay />

      <ModalContent
        bgColor="pGray.600"
        mx="auto"
        h="auto"
        w="auto"
        maxH={600}
        maxW={900}
      >
        <ModalBody p="0.5">
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter
          bg="pGray.800"
          h="2rem"
          py="20px"
          justifyContent="flex-start"
        >
          <Link href={imgUrl} isExternal fontSize="1rem">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
