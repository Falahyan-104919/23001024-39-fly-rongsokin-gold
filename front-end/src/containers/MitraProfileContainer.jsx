import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axiosInstance from '../utils/axios';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Tab,
  TabList,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../store/AuthProvider';
import TabPanelProductMitra from '../components/tabs/tab-panel/TabPanelProductMitra';
import TabPanelForumCustomerActivityMitra from '../components/tabs/tab-panel/TabPanelForumCustomerActivityMitra';
import TabPanelForumMitraActivityMitra from '../components/tabs/tab-panel/TabPanelForumMitraActivityMitra';

export default function MitraProfileContainer() {
  const { user, isLoggedIn } = useContext(AuthContext);
  const { mitraId } = useParams();
  const fetchMitraData = async (id) => {
    const response = await axiosInstance.get(`mitra/${id}`).then((res) => {
      return {
        mitraProfile: res.data.data,
      };
    });
    return response;
  };
  const { data, isLoading, isError, isFetched } = useQuery({
    queryKey: ['mitra_profile'],
    queryFn: () => fetchMitraData(mitraId),
  });

  if (isError) {
    return (
      <Flex
        bgColor="whiteAlpha.500"
        h="100vh"
        borderRadius="15px"
        alignItems="center"
        justifyContent="center"
      >
        <Text>No Mitra Found</Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (isFetched) {
    return (
      <Grid
        templateColumns="repeat(6, 1fr)"
        bgColor="whiteAlpha.500"
        borderRadius="15px"
        p="25px"
        gap={3}
      >
        <GridItem colSpan={4} rowSpan={1}>
          <Heading mb="25px">Mitra Profile</Heading>
          <Box>
            <Text>Mitra Name : {data.mitraProfile.mitra_name}</Text>
            <Text>Address : {data.mitraProfile.address}</Text>
            <Text>Email : {data.mitraProfile.email}</Text>
            <Text>Phone : {data.mitraProfile.phone_number}</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Avatar
              objectFit="cover"
              size="2xl"
              name={data.mitraProfile.fullname}
              src="/user-placeholder.png"
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={6} mt="25px">
          <Tabs borderRadius="10px" variant="enclosed" bgColor="white">
            <TabList>
              <Tab>Mitra Products</Tab>
              {isLoggedIn ? <Tab>Forum Customer Activity</Tab> : null}
              {user.role == 'mitra' ? <Tab>Forum Mitra Activity</Tab> : null}
            </TabList>
            <TabPanels>
              <TabPanelProductMitra />
              <TabPanelForumCustomerActivityMitra
                userId={data.mitraProfile.user_id}
              />
              <TabPanelForumMitraActivityMitra />
            </TabPanels>
          </Tabs>
        </GridItem>
      </Grid>
    );
  }
}

/*
address: "Jl. Sengon Blok D2-01, Kota Sepang Jaya, Bandar Lampung"
email: "falahyaniyan@gmail.com"
fullname: "Falahyan"
images: Array [ {…} ]
mitra_id: "3bf5c023-29b6-4f15-8a00-451fb863a161"
mitra_name: "CEO Rongsokin"
phone_number: "6285173482407"
type: "Pengelola"
*/
