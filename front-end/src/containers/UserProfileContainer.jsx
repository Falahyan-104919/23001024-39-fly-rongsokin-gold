import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from '@chakra-ui/react';
import axiosInstace from '../utils/axios';
import TabsUserForumActivity from '../components/tabs/TabsUserForumActivity';
export default function UserProfileContainer() {
  const { userId } = useParams();
  const fetchUserData = async (id) => {
    const response = await axiosInstace.get(`user/${id}`).then((res) => {
      return {
        user: res.data.data,
      };
    });
    return response;
  };
  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: () => fetchUserData(userId),
  });

  if (isError) {
    return <Text>{error.message}</Text>;
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
    const preppedImage =
      data.user.profile_image[0].image_path !== null
        ? `http://localhost:8080/${data.user.profile_image[0].image_path}`
        : '/user-placeholder.png';
    return (
      <Grid
        templateColumns="repeat(6, 1fr)"
        bgColor="whiteAlpha.500"
        borderRadius="15px"
        p="25px"
        gap={3}
      >
        <GridItem colSpan={4} rowSpan={1}>
          <Heading mb="25px">User Profile</Heading>
          <Box>
            <Text>Name : {data.user.fullname}</Text>
            <Text>Email : {data.user.email}</Text>
            <Text>Phone : {data.user.phone_number}</Text>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Flex justifyContent="center" alignItems="center" h="100%">
            <Avatar
              objectFit="cover"
              size="2xl"
              name={data.user.fullname}
              src={preppedImage}
              showBorder="true"
            />
          </Flex>
        </GridItem>
        <GridItem colSpan={6} mt="25px">
          <TabsUserForumActivity id={userId} />
        </GridItem>
      </Grid>
    );
  }
}
