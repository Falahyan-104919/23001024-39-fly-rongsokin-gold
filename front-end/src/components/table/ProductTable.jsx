import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
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
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import AddProductsModal from '../modal/AddProductsModal';
import { useState } from 'react';
import TableBodyProduct from './table-body/TableBodyProduct';
import { focusManager, useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';

export default function ProductTable() {
  const { mitraId } = useParams();
  const [openModalAddProducts, setOpenModalAddProducts] = useState(false);
  const [keywordProduct, setKeywordProduct] = useState('');

  const fetchMyProducts = async () => {
    const res = await axiosInstance
      .get(`mitra_products/${mitraId}`)
      .then((res) => {
        return {
          product_data: res.data.product_data,
        };
      });
    return res;
  };

  const { isLoading, isError, isFetched, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: fetchMyProducts,
  });

  return (
    <TableContainer borderRadius="10px" bgColor="white" p="10px">
      <Flex mb="10px">
        <Button
          colorScheme="whatsapp"
          leftIcon={<AddIcon />}
          onClick={() => {
            setOpenModalAddProducts(true);
            focusManager.setFocused(false);
          }}
        >
          Add Product
        </Button>
        <Spacer />
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search Your Product"
            onChange={(e) => {
              setKeywordProduct(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <AddProductsModal
        open={openModalAddProducts}
        toggleOff={() => {
          setOpenModalAddProducts(false);
          focusManager.setFocused(true);
        }}
      />
      <Table
        variant="simple"
        colorScheme="teal"
        bgColor="gray.100"
        borderRadius="10px"
      >
        <Thead>
          <Tr>
            <Th textAlign="center">Name</Th>
            <Th textAlign="center">Type</Th>
            <Th textAlign="center">Price</Th>
            <Th textAlign="center">Quantity</Th>
            <Th colSpan="2" textAlign="center">
              Action
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
          <TableBodyProduct
            products={data.product_data}
            keyword={keywordProduct}
          />
        )}
      </Table>
    </TableContainer>
  );
}
