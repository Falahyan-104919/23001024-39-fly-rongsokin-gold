import { Box, Heading } from '@chakra-ui/react';
import OrderTable from '../components/table/OrderTable';

export function Order() {
  return (
    <Box bgColor="whiteAlpha.500" m="10px" borderRadius="15px" p="10px">
      <Heading fontWeight="bold" mb="20px" mt="15px">
        List Order
      </Heading>
      <OrderTable />
    </Box>
  );
}
