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

export default function LastDiscussionPostedTable() {
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
        Last Discussion Posted
      </Text>
      <Table size="md" colorScheme="gray" variant="striped">
        <Thead>
          <Tr>
            <Th>Title</Th>
            <Th>Date Time</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Dicari Pengepul Koran</Td>
            <Td>25-02-2023 15.34</Td>
          </Tr>
        </Tbody>
      </Table>
    </Container>
  );
}
