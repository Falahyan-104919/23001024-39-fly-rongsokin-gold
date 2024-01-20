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
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ForumCustomer from './accordion-panel-item/ForumCustomer';
import ForumMitra from './accordion-panel-item/ForumMitra';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
export function AccordionForum({ role }) {
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
          <FontAwesomeIcon icon={faComments} color="white" />
          <Text ml="20px" fontWeight="bold" color="white">
            Forum
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <ForumCustomer />
        {role == 'mitra' ? <ForumMitra /> : null}
      </AccordionPanel>
    </AccordionItem>
  );
}
