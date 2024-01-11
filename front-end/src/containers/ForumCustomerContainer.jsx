import { useQuery } from '@tanstack/react-query';
import ForumCard from '../components/card/ForumCard';
import FormForumCustomer from '../components/form/FormForumCustomer';
import axiosInstance from '../utils/axios';
import { Flex, Spinner, Text } from '@chakra-ui/react';

export default function ForumCustomerContainer() {
  const fetchAllForumCustomerData = async () => {
    const response = await axiosInstance.get('/forum').then((res) => {
      return {
        forumData: res.data.data,
      };
    });
    return response;
  };
  const { data, isError, isLoading, isFetched } = useQuery({
    queryKey: ['forum_customer_data'],
    queryFn: fetchAllForumCustomerData,
  });

  if (isError) {
    return (
      <>
        <FormForumCustomer />
        <Flex
          alignItems="center"
          justifyItems="center"
          h="30vh"
          bgColor="white"
          borderRadius="15px"
        >
          <Text>Something Wrong!</Text>
        </Flex>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <FormForumCustomer />
        <Flex
          alignItems="center"
          justifyItems="center"
          h="30vh"
          bgColor="white"
        >
          <Spinner />
        </Flex>
      </>
    );
  }

  if (isFetched) {
    return (
      <>
        <FormForumCustomer />
        {data.forumData.map((post, index) => (
          <ForumCard
            key={`${post.user_id}-${index}`}
            forum_id={post.forum_customers_id}
            profileImg={post.image_profile}
            time={post.updated_at}
            fullname={post.fullname}
            email={post.email}
            title={post.title}
            content={post.content}
            userId={post.user_id}
            images={post.image}
          />
        ))}
      </>
    );
  }
}
