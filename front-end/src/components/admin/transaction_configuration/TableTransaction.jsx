import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import BadgeStatus from './BadgeStatus';
import ActionButton from './ActionButton';
import formatNumberWithCommas from '../../../utils/helper';

export default function TableTransaction({ list }) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Buyer</Th>
          <Th>Transaction Amount</Th>
          <Th>Seller</Th>
          <Th>Status</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>
        {list.map((transaction, index) => (
          <Tr key={index}>
            <Td>{transaction.fullname}</Td>
            <Td>Rp. {formatNumberWithCommas(transaction.total_price)}</Td>
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
