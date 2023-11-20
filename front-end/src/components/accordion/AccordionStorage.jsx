import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Flex,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyProducts from './accordion-panel-item/MyProducts';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export function AccordionStorage() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <AccordionItem
      mt="10px"
      mb="10px"
      border={'unset'}
      boxShadow="base"
      borderRadius="15px"
      isDisabled={!isLoggedIn}
    >
      <AccordionButton>
        <Flex as="span" alignItems="center" textAlign="left" border="teal">
          <FontAwesomeIcon icon={faBoxOpen} color="white" />
          <Text ml="20px" fontWeight="bold" color="white">
            Storage
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <MyProducts />
      </AccordionPanel>
    </AccordionItem>
  );
}
