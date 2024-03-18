import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import BadgeStatus from './BadgeStatus';
import ActionButton from './ActionButton';

export default function TableTransaction({ list }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Product</Th>
          <Th>Buyer</Th>
          <Th>Seller</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {list.map((transaction, index) => (
          <Tr key={index}>
            <Td>{transaction.product_name}</Td>
            <Td>{transaction.fullname}</Td>
            <Td>{transaction.mitra_name}</Td>
            <Td>
              <BadgeStatus status={transaction.transaction_status} />
            </Td>
            <Td>
              <ActionButton
                status={transaction.transaction_status}
                id={transaction.transaction_id}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
