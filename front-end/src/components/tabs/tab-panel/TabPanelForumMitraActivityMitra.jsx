import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { Flex, Spinner, TabPanel, Text } from '@chakra-ui/react';
import ForumCard from '../../card/ForumCard';

export default function TabPanelForumMitraActivityMitra() {
  const { mitraId } = useParams();
  const fetchMitraForumMitraActivity = async (id) => {
    const response = await axiosInstance(`mitra/forum_activity/${id}`).then(
      (res) => {
        return {
          forumActivity: res.data,
        };
      }
    );
    return response;
  };
  const { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['forum_activity', mitraId],
    queryFn: () => fetchMitraForumMitraActivity(mitraId),
  });

  if (isError) {
    return (
      <TabPanel>
        <Flex alignContent="center" justifyContent="center">
          <Text>Something Wrong! {error.message}</Text>
        </Flex>
      </TabPanel>
    );
  }

  if (isLoading) {
    return (
      <TabPanel>
        <Flex alignContent="center" justifyContent="center">
          <Spinner />
        </Flex>
      </TabPanel>
    );
  }

  if (isFetched) {
    if (data.forumActivity.length == 0) {
      return (
        <TabPanel>
          <Flex alignItems="center" justifyContent="center" h="30vh">
            <Text>Mitra Don't Have Any Activity Yet!</Text>
          </Flex>
        </TabPanel>
      );
    }
    return (
      <TabPanel>
        {data.forumActivity.map((activity, index) => (
          <ForumCard
            key={`${activity.forum_customers_id}-${index}`}
            fullname={activity.fullname}
            email={activity.email}
            title={activity.title}
            content={activity.content}
            time={activity.updated_at}
          />
        ))}
      </TabPanel>
    );
  }
}
