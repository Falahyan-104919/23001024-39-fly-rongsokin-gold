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
import UploadDeliveryReceiptModal from '../../modal/UploadDeliveryReceiptModal';

export default function TableBodyTransaction({ transactions, keyword }) {
  const [openProcessAlert, setOpenProcessAlert] = useState({});
  const [openCancelAlert, setOpenCancelAlert] = useState({});
  const [openDeliveryModal, setDeliveryModal] = useState({});

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

  const handleOpenDeliveryModal = (transaction_id) => {
    setDeliveryModal((prevDeliveryModal) => ({
      ...prevDeliveryModal,
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

  const handleCloseDeliveryModal = (transaction_id) => {
    setDeliveryModal((prevDeliveryModal) => ({
      ...prevDeliveryModal,
      [transaction_id]: false,
    }));
  };

  const ActionButton = ({ status, transactionId }) => {
    switch (status) {
      case 'waiting_for_payment':
        return <Text>No Action Needed</Text>;
      case 'waiting_for_delivery':
        return (
          <ButtonGroup>
            <Button
              colorScheme="messenger"
              onClick={() => handleOpenDeliveryModal(transactionId)}
            >
              Upload Delivery Receipts
            </Button>
            <UploadDeliveryReceiptModal
              open={openDeliveryModal[transactionId] || false}
              toggleOff={() => handleCloseDeliveryModal(transactionId)}
              trans_id={transactionId}
            />
          </ButtonGroup>
        );
      default:
        return <Text>No Action Needed</Text>;
    }
  };

  const BadgeStatus = ({ status }) => {
    switch (status) {
      case 'waiting_for_payment':
        return (
          <Badge variant="subtle" colorScheme="yellow">
            {status.replaceAll('_', ' ').toUpperCase()}
          </Badge>
        );
      case 'waiting_for_delivery':
        return (
          <Badge variant="subtle" colorScheme="blue">
            {status.replaceAll('_', ' ').toUpperCase()}
          </Badge>
        );
      case 'on_the_way':
        return (
          <Badge variant="subtle" colorScheme="green">
            {status.replaceAll('_', ' ').toUpperCase()}
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
      {filteredTransactions?.map((transaction, index) => {
        return (
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
        );
      })}
    </Tbody>
  );
}
