import { useSelector } from 'react-redux';
import { getAllProducts } from '../../utils/cartSlice';
import { Box, Flex, Image, Text } from '@chakra-ui/react';
import QuantityControl from './QuantityControl';
import formatNumberWithCommas from '../../../../utils/helper';

export default function ProductCard() {
  const products = useSelector(getAllProducts);
  console.log(products);
  if (products.length == 0) {
    return <Text>Currently no product in the cart.</Text>;
  }
  return products.map((products, index) => {
    return (
      <Box key={index} shadow="base" rounded="md" padding={4} mb={4}>
        <Flex gap={4} alignItems={'center'}>
          <Image
            src={`http://localhost:8080/${products.images[0].image_path}`}
            alt={products.name}
            w="125px"
            h="125px"
          />
          <Box flex={1}>
            <Text fontWeight="medium">Nama : {products.name}</Text>
            <Text fontWeight="medium">
              Price : Rp. {formatNumberWithCommas(products.price)} per{' '}
              {products.unit}
            </Text>
            <Text fontWeight="medium">
              Minimum Order : {products.minimum_order}
            </Text>
            <Text fontWeight="medium">
              Order Quantity : {products.order_quantity}
            </Text>
            <Text fontWeight="medium">
              Total Transaction : Rp.{' '}
              {formatNumberWithCommas(products.totalProductPrice)}
            </Text>
            <QuantityControl products={products} />
          </Box>
        </Flex>
      </Box>
    );
  });
}
