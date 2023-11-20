import { SearchIcon } from '@chakra-ui/icons';
import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import TableBodyOrders from './table-body/TableBodyOrders';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';

export default function OrderTable() {
  const { userId } = useParams();
  const [keywordOrder, setKeywordOrder] = useState('');
  const fetchOrders = async (userId) => {
    const orders = await axiosInstance
      .get(`order_list/${userId}`)
      .then((res) => {
        return res.data.data;
      });
    return orders;
  };
  const { data, error, isError, isLoading, isFetched } = useQuery({
    queryKey: ['order'],
    queryFn: () => fetchOrders(userId),
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
            placeholder="Search Your Order"
            onChange={(e) => {
              setKeywordOrder(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Table>
        <Thead>
          <Tr>
            <Th>Product Name</Th>
            <Th>Quantity</Th>
            <Th>Price</Th>
            <Th>Mitra Name</Th>
            <Th>Status</Th>
            <Th colSpan="2">Actions</Th>
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
        {isFetched && <TableBodyOrders orders={data} keyword={keywordOrder} />}
      </Table>
    </TableContainer>
  );
}
