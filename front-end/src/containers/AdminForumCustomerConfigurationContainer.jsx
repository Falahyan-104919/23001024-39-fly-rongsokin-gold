import { SearchIcon } from '@chakra-ui/icons';
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
import TableForum from '../components/admin/forum_configuration/customer/TableForum';
import axiosInstance from '../utils/axios';
import { useQuery } from '@tanstack/react-query';

export default function AdminForumCustomerConfigurationContainer() {
  const [keywordForumTitle, setKeywordForumTitle] = useState('');
  const fetchForumList = async () => {
    const list = await axiosInstance
      .get('admin/forum_customer')
      .then((res) => res.data.list)
      .catch((err) => err.data.message);
    return list;
  };
  const { data, isFetched } = useQuery({
    queryKey: ['forum_customer'],
    queryFn: fetchForumList,
  });
  const filterredList = isFetched
    ? data.filter((forum) =>
        forum.title.toLowerCase().includes(keywordForumTitle.toLowerCase())
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
      <Heading size="lg">Forum Customer Configuration</Heading>
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
        <TableForum forumList={filterredList} />
      </TableContainer>
    </Container>
  );
}
