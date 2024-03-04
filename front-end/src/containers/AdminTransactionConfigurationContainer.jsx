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
import axiosInstance from '../utils/axios';
import { useQuery } from '@tanstack/react-query';
import TableTransaction from '../components/admin/transaction_configuration/TableTransaction';

export default function AdminTransactionConfigurationContainer() {
  const [keywordTranscation, setKeywordTransaction] = useState('');
  const fetchTransaction = async () => {
    const res = await axiosInstance
      .get('/admin/transactions')
      .then((res) => res.data)
      .catch((err) => err.response.data);
    return res;
  };
  const { isFetched, data } = useQuery({
    queryKey: ['transaction_list'],
    queryFn: fetchTransaction,
  });

  const filteredTransaction = isFetched
    ? data.filter((transaction) => {
        return transaction['product_name']
          .toLowerCase()
          .includes(keywordTranscation.toLowerCase());
      })
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
      <Heading size="lg">Transaction Details</Heading>
      <Flex justify="flex-end">
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search..."
            onChange={(e) => {
              setKeywordTransaction(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <TableContainer>
        <TableTransaction list={filteredTransaction} />
      </TableContainer>
    </Container>
  );
}
