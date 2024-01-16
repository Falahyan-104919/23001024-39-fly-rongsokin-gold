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
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import EditProfile from './accordion-panel-item/EditProfile';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import MitraProfile from './accordion-panel-item/MitraProfile';
import AdminDashboard from './accordion-panel-item/AdminDashboard';

export function AccordionProfile({ userId }) {
  const { user, isLoggedIn } = useContext(AuthContext);
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
          <FontAwesomeIcon icon={faUser} color="white" />
          <Text ml="20px" fontWeight="bold" color="white">
            Profile
          </Text>
        </Flex>
        <Spacer />
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel>
        <EditProfile userId={userId} />
        {user.role == 'mitra' ? <MitraProfile mitraId={user.mitraId} /> : null}
        {user.role == 'admin' ? <AdminDashboard /> : null}
      </AccordionPanel>
    </AccordionItem>
  );
}
