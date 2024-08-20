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
      bgColor="#03045e"
      border={'unset'}
      boxShadow="outline"
      borderRadius="15px"
      isDisabled={!isLoggedIn}
    >
      <AccordionButton>
        <Flex as="span" alignItems="center" textAlign="left" border="teal">
          <FontAwesomeIcon icon={faCartShopping} color="#caf0f8" />
          <Text ml="20px" fontWeight="bold" color="#caf0f8">
            Transaction
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <MyOrder />
        {role == 'mitra' ? <MyTransaction /> : null}
      </AccordionPanel>
    </AccordionItem>
  );
}
