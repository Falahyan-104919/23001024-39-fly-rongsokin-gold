import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import ProductCard from '../../card/ProductCard';
import { Flex, Grid, Spinner, TabPanel, Text } from '@chakra-ui/react';

export default function TabPanelProductMitra() {
  const { mitraId } = useParams();
  const fetchProductMitra = async (id) => {
    const response = await axiosInstance
      .get(`mitra_products/${id}`)
      .then((res) => {
        return {
          product_mitra: res.data.product_data,
        };
      });
    return response;
  };
  const { data, error, isLoading, isError, isFetched } = useQuery({
    queryKey: ['product_mitra'],
    queryFn: () => fetchProductMitra(mitraId),
  });

  if (isError) {
    return (
      <TabPanel>
        <Flex alignContent="center" justifyContent="center">
          <Text>Something Wrong! {error.message}</Text>
        </Flex>
      </TabPanel>
    );
  }

  if (isLoading) {
    return (
      <TabPanel>
        <Flex alignContent="center" justifyContent="center">
          <Spinner />
        </Flex>
      </TabPanel>
    );
  }

  if (isFetched) {
    if (data.product_mitra.length == 0) {
      return (
        <TabPanel>
          <Flex>
            <Text>Mitra Don't Have Any Products Yet!</Text>
          </Flex>
        </TabPanel>
      );
    }
    return (
      <TabPanel>
        <Grid templateColumns="repeat(4, 1fr)" gap={6} p="15px">
          {data.product_mitra.map((product, index) => (
            <ProductCard
              key={`${product.product_id}-${index}`}
              name={product.name}
              price={product.price}
              imageURL={product.images[0].image_path}
              productId={product.product_id}
            />
          ))}
        </Grid>
      </TabPanel>
    );
  }
}
