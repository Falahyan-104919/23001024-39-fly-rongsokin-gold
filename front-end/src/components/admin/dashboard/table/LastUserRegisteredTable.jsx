import {
  Container,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

export default function LastUserRegisteredTable() {
  return (
    <Container
      display="flex"
      flexDir="column"
      w="500px"
      border="1px"
      borderColor="gray"
      rounded="lg"
      pb="16px"
    >
      <Text ml="12px" mt="12px" fontWeight="bold">
        Last User Registered
      </Text>
      <Table size="md" colorScheme="gray" variant="striped">
        <Thead>
          <Tr>
            <Th>Email</Th>
            <Th>Date Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>email.email@gmail.com</Td>
            <Td>25-02-2023 15.34</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
}
