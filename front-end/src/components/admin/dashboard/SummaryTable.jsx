import {
  Box,
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import LastUserRegisteredTable from './table/LastUserRegisteredTable';
import LastUProductsAddedTable from './table/LastProductsAddedTable';
import LastDiscussionPostedTable from './table/LastDiscussionPostedTable';
import LastTransactionPlacedTable from './table/LastTransactionPlaced';

export default function SummaryTable() {
  return (
    <Container
      display="flex"
      flexDir="row"
      columnGap="16px"
      rowGap="16px"
      flexGrow="1"
      maxW="full"
      flexWrap="wrap"
      justifyContent="space-evenly"
    >
      <LastUserRegisteredTable />
      <LastUProductsAddedTable />
      <LastDiscussionPostedTable />
      <LastTransactionPlacedTable />
    </Container>
  );
}
