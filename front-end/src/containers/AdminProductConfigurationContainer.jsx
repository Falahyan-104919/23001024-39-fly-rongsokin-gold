import {
  Container,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  TableContainer,
  Text,
} from '@chakra-ui/react';
import TableProduct from '../components/admin/product_configuration/TableProduct';
import { SearchIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';

export default function AdminProductConfigurationContainer() {
  const [keywordProduct, setKeywordProduct] = useState('');
  const fetchProducts = async () => {
    const data = await axiosInstance
      .get('admin/products')
      .then((res) => res.data.products)
      .catch((err) => err.data.message);
    return data;
  };
  const { data, isFetched } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
  if (isFetched) {
    console.log(data);
    const filteredProducts = Array.isArray(data)
      ? data.filter((product) => {
          return product['name']
            .toLowerCase()
            .includes(keywordProduct.toLowerCase());
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
        <Heading size="lg">Configure Product</Heading>
        <Flex justify="flex-end">
          <InputGroup maxW="250px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Search..."
              onChange={(e) => {
                setKeywordProduct(e.target.value);
              }}
            />
          </InputGroup>
        </Flex>
        <TableContainer>
          <TableProduct list={filteredProducts} />
        </TableContainer>
      </Container>
    );
  }
}
