import { useQuery } from '@tanstack/react-query';
import FormForumMitra from '../components/form/FormForumMitra';
import axiosInstance from '../utils/axios';
import { Flex, Spinner, Text } from '@chakra-ui/react';
import ForumCard from '../components/card/ForumCard';

export default function ForumMitraContainer() {
  const fetchAllForumMitraData = async () => {
    const response = await axiosInstance.get('forum_mitra').then((res) => {
      return {
        forumData: res.data.data,
      };
    });
    return response;
  };
  const { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['forum_mitra'],
    queryFn: () => fetchAllForumMitraData(),
  });

  if (isError) {
    return (
      <>
        <FormForumMitra />
        <Flex
          m="15px"
          alignItems="center"
          justifyContent="center"
          h="30vh"
          bgColor="white"
          borderRadius="15px"
        >
          <Text>Something Wrong! {error.message}</Text>
        </Flex>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <FormForumMitra />
        <Flex
          m="15px"
          alignItems="center"
          justifyContent="center"
          h="30vh"
          bgColor="white"
          borderRadius="15px"
        >
          <Spinner />
        </Flex>
      </>
    );
  }

  if (isFetched) {
    return (
      <>
        <FormForumMitra />
        {data.forumData.map((post, index) => (
          <ForumCard
            key={`${post.forum_mitra_id}-${index}`}
            time={post.updated_at}
            fullname={post.fullname}
            email={post.email}
            title={post.title}
            content={post.content}
            userId={post.mitra_id}
            images={post.image}
          />
        ))}
      </>
    );
  }
}

/*
content: "Dicari partner untuk mengolah botol plastik 200kg secepatnya"
forum_mitra_id: "3b930099-ea91-43a3-bfc4-f2d993f157f1"
image: Array [ {…} ]
mitra_id: "ff247e9e-f42b-41f6-964f-467a9f89b626"
title: "Partner Mengolah Botol Plastik"
updated_at: "2023-11-14T21:55:25.749Z"
*/
