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
} from '@chakra-ui/react';
import { useState } from 'react';
import UploadDeliveryReceiptModal from '../../modal/UploadDeliveryReceiptModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalTransactionDetails from '../../admin/transaction_configuration/ModalTransactionDetails';
import formatNumberWithCommas from '../../../utils/helper';

export default function TableBodyTransaction({ transactions, keyword }) {
  const [openDeliveryModal, setDeliveryModal] = useState({});

  const handleOpenDeliveryModal = (transaction_id) => {
    setDeliveryModal((prevDeliveryModal) => ({
      ...prevDeliveryModal,
      [transaction_id]: true,
    }));
  };

  const handleCloseDeliveryModal = (transaction_id) => {
    setDeliveryModal((prevDeliveryModal) => ({
      ...prevDeliveryModal,
      [transaction_id]: false,
    }));
  };

  const ActionButton = ({ status, transactionId, products, total_price }) => {
    const [isOpen, setOpen] = useState(false);
    const handleDetails = () => {
      setOpen((state) => !state);
    };
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
              products={products}
              total_price={total_price}
            />
          </ButtonGroup>
        );
      case 'success':
        return (
          <>
            <Button colorScheme="gray" onClick={() => handleDetails()}>
              <FontAwesomeIcon icon={faEye} style={{ marginRight: '8px' }} />
              See Details
            </Button>
            <ModalTransactionDetails
              open={isOpen}
              toggleOff={handleDetails}
              id={transactionId}
              products={products}
            />
          </>
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
    return transaction.fullname.toLowerCase().includes(keyword.toLowerCase());
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
            <Td>RP. {formatNumberWithCommas(transaction.total_price)}</Td>
            <Td>
              <BadgeStatus status={transaction.transaction_status} />
            </Td>
            <Td colSpan={2} textAlign="center">
              <ActionButton
                status={transaction.transaction_status}
                transactionId={transaction.transaction_id}
                products={transaction.products}
                total_price={transaction.total_price}
              />
            </Td>
          </Tr>
        );
      })}
    </Tbody>
  );
}
