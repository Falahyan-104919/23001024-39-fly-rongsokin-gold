import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import FormEditProfile from '../form/FormEditProfile';
import FormChangePassword from '../form/FormChangePassword';
import FormBecomeMitra from '../form/FormBecomeMitra';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import FormEditMitraProfile from '../form/FormEditMitraProfile';

export default function TabsEditProfile() {
  const { user } = useContext(AuthContext);
  return (
    <Tabs
      variant="enclosed"
      bgColor="white"
      m="10px"
      borderRadius="10px"
      boxShadow="base"
    >
      <TabList>
        <Tab>Edit Profile</Tab>
        <Tab>Change Password</Tab>
        <Tab isDisabled={user.role == 'mitra' || 'admin' ? true : false}>
          Become Mitra
        </Tab>
        <Tab isDisabled={user.role == 'user' || 'admin' ? true : false}>
          Edit Profile Mitra
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <FormEditProfile />
        </TabPanel>
        <TabPanel>
          <FormChangePassword />
        </TabPanel>
        <TabPanel>
          <FormBecomeMitra />
        </TabPanel>
        <TabPanel>
          <FormEditMitraProfile />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
