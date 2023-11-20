import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  TabIndicator,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import FormLogin from '../form/FormLogin';
import FormRegister from '../form/FormRegister';

export default function AuthModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={() => {
          onOpen();
        }}
        leftIcon={<FontAwesomeIcon icon={faRightToBracket} color="white" />}
        size="sm"
        bgColor="teal.300"
      >
        <Text color="white">Login</Text>
      </Button>
      <Modal
        size="xl"
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
      >
        <ModalOverlay bg="none" backdropFilter="blur(2px) hue-rotate(10deg)" />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Tabs isFitted variant="enclosed">
              <TabList>
                <Tab>Login</Tab>
                <Tab>Register</Tab>
              </TabList>
              <TabIndicator
                mt="-1.5px"
                height="2px"
                bg="teal.500"
                borderRadius="1px"
              />
              <TabPanels>
                <TabPanel>
                  <FormLogin close={onClose} />
                </TabPanel>
                <TabPanel>
                  <FormRegister close={onClose} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
