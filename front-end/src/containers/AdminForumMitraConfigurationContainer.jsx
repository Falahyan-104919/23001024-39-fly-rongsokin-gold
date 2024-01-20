import {
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  TableContainer,
} from '@chakra-ui/react';
import { useState } from 'react';
import axiosInstance from '../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { SearchIcon } from '@chakra-ui/icons';
import TableForum from '../components/admin/forum_configuration/mitra/TableForum';

export default function AdminForumMitraConfigurationContainer() {
  const [keywordForumTitle, setKeywordForumTitle] = useState('');
  const fetchForumList = async () => {
    const list = await axiosInstance
      .get('admin/forum_mitra')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return list;
  };
  const { data, isFetched } = useQuery({
    queryKey: ['forum_mitra'],
    queryFn: fetchForumList,
  });

  const filteredList = isFetched
    ? data['forumList'].filter((list) =>
        list['title'].toLowerCase().includes(keywordForumTitle.toLowerCase())
      )
    : [];
  return (
    <Container
      display="flex"
      flexDir="column"
      backgroundColor="white"
      maxW="full"
      padding="16px"
      rowGap="8px"
      borderRadius="12px"
    >
      <Heading size="lg">Forum Mitra Configuration</Heading>
      <Flex justify="flex-end">
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            onChange={(e) => {
              setKeywordForumTitle(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <TableContainer>
        <TableForum list={filteredList} />
      </TableContainer>
    </Container>
  );
}
