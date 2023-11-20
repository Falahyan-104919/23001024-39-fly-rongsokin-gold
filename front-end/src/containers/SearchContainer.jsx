import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../utils/axios';
import { Flex, GridItem, Heading, Spinner, Text } from '@chakra-ui/react';
import ProductCard from '../components/card/ProductCard';

export default function SearchContainer(props) {
  const { keyword } = props;
  const fetchProductsByName = async (name) => {
    const response = await axiosInstance
      .get(`search_products?name=${encodeURIComponent(name)}`)
      .then((res) => {
        return {
          products: res.data,
        };
      });
    return response;
  };
  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ['search_product', keyword],
    queryFn: () => fetchProductsByName(keyword),
  });
  if (isError) {
    return (
      <Flex alignItems="center" justifyContent="center" h="100vh">
        <Text>Something Wrong! ${error.message}</Text>
      </Flex>
    );
  }

  if (isLoading) {
    return (
      <GridItem colSpan={5} bgColor="white" borderRadius="15px">
        <Flex alignItems="center" justifyContent="center" h="50vh">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </GridItem>
    );
  }

  if (isFetched) {
    if (data.products.length == 0) {
      return (
        <GridItem colSpan={5} bgColor="white" borderRadius="15px">
          <Flex alignItems="center" justifyContent="center" h="50vh">
            <Heading>No Data Found</Heading>
          </Flex>
        </GridItem>
      );
    }

    return data.products.map((product) => (
      <ProductCard
        key={product.product_id}
        name={product.name}
        price={product.price}
        imageURL={product.images[0].image_path}
        productId={product.product_id}
      />
    ));
  }
}
