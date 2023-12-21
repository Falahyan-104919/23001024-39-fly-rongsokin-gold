import {
  Flex,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import ForumCard from '../card/ForumCard';

export default function TabsUserForumActivity({ id }) {
  const fetchForumActivity = async (userId) => {
    const response = await axiosInstance
      .get(`forum_activity/${userId}`)
      .then((res) => {
        return {
          forumActivity: res.data,
        };
      });
    return response;
  };
  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ['forum_activity'],
    queryFn: () => fetchForumActivity(id),
  });

  if (isError) {
    return (
      <Tabs borderRadius="10px" variant="enclosed" bgColor="whiteAlpha.500">
        <TabList>
          <Tab>Forum Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex alignContent="center" justifyContent="center">
              <Text>Something Wrong! {error.message}</Text>
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }

  if (isLoading) {
    return (
      <Tabs borderRadius="10px" variant="enclosed" bgColor="whiteAlpha.500">
        <TabList>
          <Tab>Forum Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Flex alignContent="center" justifyContent="center">
              <Spinner />
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }

  if (isFetched) {
    if (data.forumActivity.length == 0) {
      return (
        <Tabs borderRadius="10px" variant="enclosed" bgColor="white">
          <TabList>
            <Tab>Forum Activity</Tab>
          </TabList>
          <TabPanels>
            <Flex alignItems="center" justifyContent="center" h="250px">
              <Text>No Activity yet!</Text>
            </Flex>
          </TabPanels>
        </Tabs>
      );
    }
    return (
      <Tabs borderRadius="10px" variant="enclosed" bgColor="white">
        <TabList>
          <Tab>Forum Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {data.forumActivity.map((activity, index) => (
              <ForumCard
                key={`${activity.forum_customers_id}-${index}`}
                fullname={activity.fullname}
                profileImg={activity.profile_image}
                email={activity.email}
                title={activity.title}
                content={activity.content}
                time={activity.updated_at}
                userId={activity.user_id}
                images={activity.images}
              />
            ))}
          </TabPanel>
        </TabPanels>
      </Tabs>
    );
  }
}

/*
content: "Dicari Barang Plastik Rongsok sudah bersih jangan kotor"
email: "rendi.fitra@gmail.com"
forum_customers_id: "a1b9371f-24a3-45f8-a79e-c540cf3ff2d6"
fullname: "Rendi Fitra"
images: Array [ {…} ]
0: Object { image_path: null, image_name: null, image_id: null }
length: 1
<prototype>: Array []
title: "Dicari Barang Plastik Rongsok"
updated_at: "2023-11-14T18:46:49.393Z"
user_id: "c6928dd6-de9b-40d3-9bd8-e6443cd454a0"

*/
