import {
  Container,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function LastTransactionPlacedTable({ loading, activity }) {
  const formatingDate = (dateTime) => {
    const date = new Date(dateTime).toLocaleDateString('id-ID', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return date;
  };
  return (
    <Container
      display="flex"
      flexDir="column"
      rowGap="12px"
      w="500px"
      border="1px"
      borderColor="gray"
      rounded="lg"
      pb="16px"
    >
      <Text ml="12px" mt="12px" fontWeight="bold">
        Last Transaction Placed
      </Text>
      <Table size="md" colorScheme="gray" variant="striped">
        <Thead>
          <Tr>
            <Th>Product</Th>
            <Th>Date Time</Th>
          </Tr>
        </Thead>
        {loading ? (
          <Tbody>
            <Tr>
              <Td colSpan="2" textAlign="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="teal.500"
                  size="xl"
                />
              </Td>
            </Tr>
          </Tbody>
        ) : (
          <Tbody>
            {activity.map((act, index) => {
              return (
                <Tr key={index}>
                  <Td>{act.name}</Td>
                  <Td>{formatingDate(act.transaction_date)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        )}
      </Table>
    </Container>
  );
}
