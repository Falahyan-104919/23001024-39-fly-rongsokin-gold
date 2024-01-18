import { SearchIcon } from '@chakra-ui/icons';
import {
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import axiosInstance from '../utils/axios';
import ActionButton from '../components/admin/user_configuration/ActionButton';

export default function UserConfigurationContainer() {
  const [keywordUser, setKeywordUser] = useState('');
  const queryClient = useQueryClient();
  const fetchUserData = async () => {
    const userData = await axiosInstance
      .get('user')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return userData;
  };
  const { data, isLoading, isFetched } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUserData,
  });
  const deactivateUser = async (userId) => {
    return await axiosInstance.put(`admin/deactivate_user/${userId}`);
  };
  const deactiveUserMutation = useMutation({
    mutationKey: ['deactive'],
    mutationFn: deactivateUser,
    onSettled: () => {
      console.log('triggering the refetch');
      return queryClient.invalidateQueries(['user']);
    },
  });
  const superuserMutation = useMutation((userId) =>
    axiosInstance.put(`admin/deactivate_user/${userId}`)
  );

  const userTypeDecider = (type) => {
    switch (type) {
      case 'user':
        return 'Customer';
      case 'mitra':
        return 'Mitra';
      default:
        return 'Admin';
    }
  };

  const formatingDate = (dateTime) => {
    const date = new Date(dateTime).toLocaleDateString('id-ID', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return date;
  };

  const filteredUsers = isFetched
    ? data['data'].filter((user) => {
        return user.fullname.toLowerCase().includes(keywordUser.toLowerCase());
      })
    : [];

  return (
    <Container
      display="flex"
      flexDir="column"
      backgroundColor="white"
      maxW="full"
      padding="16px"
      rowGap="16px"
      borderRadius="12px"
    >
      <Heading>User Configuration</Heading>
      <Flex justify="flex-end">
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search Your Product"
            onChange={(e) => {
              setKeywordUser(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Fullname</Th>
            <Th>Email</Th>
            <Th>User Type</Th>
            <Th>Last Activity</Th>
            <Th>Action Button</Th>
          </Tr>
        </Thead>
        <Tbody>
          {isLoading ? (
            <Tr>
              <Td colSpan="5" textAlign="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              </Td>
            </Tr>
          ) : (
            filteredUsers.map((user, index) => {
              return (
                <Tr key={index}>
                  <Td>{user.fullname}</Td>
                  <Td>{user.email}</Td>
                  <Td>{userTypeDecider(user.role)}</Td>
                  <Td>{formatingDate(user.updated_at)}</Td>
                  <Td>
                    <ActionButton
                      id={user.user_id}
                      role={user.role}
                      handleDeactivate={deactiveUserMutation}
                      handleSuperUser={superuserMutation}
                    />
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>
    </Container>
  );
}
