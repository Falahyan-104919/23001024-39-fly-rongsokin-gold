import { Flex, Grid, Heading, Spinner, Text } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../components/card/ProductCard';
import axiosInstance from '../utils/axios';

export default function HomeContainer() {
  const fetchProducts = async () => {
    const res = await axiosInstance.get('products').then((res) => {
      return {
        products: res.data.products,
      };
    });
    return res;
  };

  const { data, isError, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isError) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Text>Something Wrong!</Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Flex>
    );
  }

  if (data.products?.length == 0) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Heading>No Data Found</Heading>
      </Flex>
    );
  }

  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={6} p="15px">
      {data.products?.map((product) => (
        <ProductCard
          key={product.product_id}
          name={product.name}
          price={product.price}
          imageURL={product.images[0].image_path}
          productId={product.product_id}
        />
      ))}
    </Grid>
  );
}
