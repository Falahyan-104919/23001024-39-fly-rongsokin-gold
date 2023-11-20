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
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyOrder from './accordion-panel-item/MyOrder';
import MyTransaction from './accordion-panel-item/MyTransaction';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export function AccordionTransaction({ role }) {
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
          <FontAwesomeIcon icon={faCartShopping} color="white" />
          <Text ml="20px" fontWeight="bold" color="white">
            Transaction
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <MyOrder />
        {role != 'user' ? <MyTransaction /> : null}
      </AccordionPanel>
    </AccordionItem>
  );
}
