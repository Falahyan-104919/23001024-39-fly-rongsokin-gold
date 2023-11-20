import { Box, Text } from '@chakra-ui/react';
import ProductTable from '../components/table/ProductTable';

export default function ProductConfiguration() {
  return (
    <Box bgColor="whiteAlpha.500" m="10px" borderRadius="15px" p="10px">
      <Text mb="30px" fontSize="3xl" fontWeight="bold">
        Product Configuration
      </Text>
      <ProductTable />
    </Box>
  );
}
