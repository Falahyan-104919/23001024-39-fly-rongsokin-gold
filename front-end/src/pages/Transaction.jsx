import { Box, Heading } from '@chakra-ui/react';
import TransactionTable from '../components/table/TransactionTable';

export function Transaction() {
  return (
    <Box bgColor="whiteAlpha.500" m="10px" borderRadius="15px" p="10px">
      <Heading fontWeight="bold" mb="20px" mt="15px">
        List My Transaction
      </Heading>
      <TransactionTable />
    </Box>
  );
}
