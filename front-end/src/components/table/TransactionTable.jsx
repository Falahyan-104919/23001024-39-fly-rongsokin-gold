import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import TableBodyTransaction from './table-body/TableBodyTransactions';
import { useState } from 'react';
import axiosInstance from '../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function TransactionTable() {
  const { mitraId } = useParams();
  const [keywordTransaction, setKeywordTransaction] = useState('');
  const fetchTransaction = async (id) => {
    const transaction = await axiosInstance
      .get(`mitra/transaction_list/${id}`)
      .then((res) => {
        return res.data.data;
      });
    return transaction;
  };
  const { data, error, isLoading, isFetched, isError } = useQuery({
    queryKey: ['transaction'],
    queryFn: () => fetchTransaction(mitraId),
  });

  return (
    <TableContainer borderRadius="10px" bgColor="white" p="10px">
      <Flex mb="10px">
        <Spacer />
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search Transaction"
            onChange={(e) => {
              setKeywordTransaction(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Buyer Name</Th>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Status</Th>
            <Th colSpan="2" textAlign="center">
              Actions
            </Th>
          </Tr>
        </Thead>
        {isError && (
          <Tbody>
            <Tr>
              <Td colSpan="5" textAlign="center">
                <Text>Something Wrong! ${error.message}</Text>
              </Td>
            </Tr>
          </Tbody>
        )}
        {isLoading && (
          <Tbody>
            <Tr>
              <Td colSpan="5" textAlign="center">
                <Spinner />
              </Td>
            </Tr>
          </Tbody>
        )}
        {isFetched && (
          <TableBodyTransaction
            transactions={data}
            keyword={keywordTransaction}
          />
        )}
      </Table>
    </TableContainer>
  );
}
