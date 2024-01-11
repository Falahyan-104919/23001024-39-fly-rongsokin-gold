import { useParams } from 'react-router-dom';
import axiosInstance from '../../../utils/axios';
import { useQuery } from '@tanstack/react-query';
import {
  Badge,
  Button,
  ButtonGroup,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { focusManager } from '@tanstack/react-query';
import { useState } from 'react';
import ProcessOrderAlertModal from '../../modal/ProcessOrderAlertModal';
import CancelTransactionAlertModal from '../../modal/CancelTransactionAlertModal';

export default function TableBodyTransaction({ transactions, keyword }) {
  const [openProcessAlert, setOpenProcessAlert] = useState({});
  const [openCancelAlert, setOpenCancelAlert] = useState({});

  const handleOpenProcessAlert = (transaction_id) => {
    setOpenProcessAlert((prevProcessAlert) => ({
      ...prevProcessAlert,
      [transaction_id]: true,
    }));
  };

  const handleOpenCancelAlert = (transaction_id) => {
    setOpenCancelAlert((prevCancelAlert) => ({
      ...prevCancelAlert,
      [transaction_id]: true,
    }));
  };

  const handleCloseProcessAlert = (transaction_id) => {
    setOpenProcessAlert((prevProcessAlert) => ({
      ...prevProcessAlert,
      [transaction_id]: false,
    }));
  };

  const handleCloseCancelAlert = (transaction_id) => {
    setOpenCancelAlert((prevCancelAlert) => ({
      ...prevCancelAlert,
      [transaction_id]: false,
    }));
  };

  const ActionButton = ({
    status,
    order_quantity,
    quantity_product,
    transactionId,
    productId,
  }) => {
    switch (status) {
      case 'pending':
        return (
          <ButtonGroup>
            <Button
              colorScheme="blue"
              isDisabled={order_quantity > quantity_product}
              onClick={() => {
                focusManager.setFocused(false);
                handleOpenProcessAlert(transactions.transaction_id);
              }}
            >
              Process
            </Button>
            <ProcessOrderAlertModal
              transactionId={transactionId}
              productId={productId}
              newQuantity={quantity_product - order_quantity}
              toggleOff={() =>
                handleCloseProcessAlert(transactions.transaction_id)
              }
              open={openProcessAlert[transactions.transaction_id] || false}
            />
            <Button
              colorScheme="red"
              onClick={() => {
                focusManager.setFocused(false);
                handleOpenCancelAlert(transactions.transaction_id);
              }}
            >
              Cancel
            </Button>
            <CancelTransactionAlertModal
              transactionId={transactionId}
              open={openCancelAlert[transactions.transaction_id] || false}
              toggleOff={() =>
                handleCloseCancelAlert(transactions.transaction_id)
              }
            />
          </ButtonGroup>
        );
      case 'process':
        return (
          <Button colorScheme="green" isDisabled>
            Success
          </Button>
        );
      case 'delivered':
        return <Button colorScheme="green">Success</Button>;
      default:
        return <Text>No Action Needed</Text>;
    }
  };

  const BadgeStatus = ({ status }) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="subtle" colorScheme="yellow">
            {status.toUpperCase()}
          </Badge>
        );
      case 'process':
        return (
          <Badge variant="subtle" colorScheme="blue">
            {status.toUpperCase()}
          </Badge>
        );
      case 'success':
        return (
          <Badge variant="subtle" colorScheme="teal">
            {status.toUpperCase()}
          </Badge>
        );
      default:
        return (
          <Badge variant="subtle" colorScheme="red">
            {status.toUpperCase()}
          </Badge>
        );
    }
  };

  const filteredTransactions = transactions?.filter((transaction) => {
    return transaction.name.toLowerCase().includes(keyword.toLowerCase());
  });

  if (filteredTransactions?.length == 0) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan="5" textAlign="center">
            <Text>No Order Found</Text>
          </Td>
        </Tr>
      </Tbody>
    );
  }
  return (
    <Tbody>
      {filteredTransactions?.map((transaction, index) => (
        <Tr key={index}>
          <Td>{transaction.fullname}</Td>
          <Td>{transaction.name}</Td>
          <Td>{transaction.quantity}</Td>
          <Td>RP. {transaction.total_price}</Td>
          <Td>
            <BadgeStatus status={transaction.transaction_status} />
          </Td>
          <Td colSpan={2} textAlign="center">
            <ActionButton
              status={transaction.transaction_status}
              transactionId={transaction.transaction_id}
              productId={transaction.product_id}
              order_quantity={transaction.quantity}
              quantity_product={transaction.quantity_product}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
