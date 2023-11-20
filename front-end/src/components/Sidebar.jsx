import { Accordion, VStack } from '@chakra-ui/react';
import { AccordionProfile } from './accordion/AccordionProfile';
import { AccordionForum } from './accordion/AccordionForum';
import { AccordionTransaction } from './accordion/AccordionTransaction';
import { AccordionStorage } from './accordion/AccordionStorage';
import ProfileContainers from '../containers/ProfileContainers';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  return (
    <VStack mt="10px">
      <ProfileContainers />
      <Accordion w="100%" pl="7px" pr="7px" mt="20px" allowToggle>
        <AccordionProfile userId={user.userId} />
        <AccordionForum role={user.role} />
        <AccordionTransaction role={user.role} />
        {user.role != 'user' ? <AccordionStorage /> : null}
      </Accordion>
    </VStack>
  );
}
