import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { useState } from 'react';
import DeliveredProductsAlertModal from '../../modal/DeliveredProductsAlertModal';
import UploadPaymentReceiptModal from '../../modal/UploadPaymentReceiptModal';
import DeliveryDetailsModal from '../../modal/DeliveryDetailsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import ModalTransactionDetails from '../../admin/transaction_configuration/ModalTransactionDetails';

export default function TableBodyOrders({ orders, keyword }) {
  const [openUploadPaymentReceiptModal, setUploadPaymentReceiptModal] =
    useState({});
  const [deliverysModal, setDeliverysModal] = useState({});

  const handleOpenUploadPaymentReceiptModal = (order_id) => {
    setUploadPaymentReceiptModal((prev) => ({
      ...prev,
      [order_id]: true,
    }));
  };

  const handleOpenDeliveryModal = (order_id) => {
    setDeliverysModal((prev) => ({
      ...prev,
      [order_id]: true,
    }));
  };

  const handleCloseUploadPaymentReceiptModal = (order_id) => {
    setUploadPaymentReceiptModal((prev) => ({
      ...prev,
      [order_id]: false,
    }));
  };

  const handleCloseDeliveryModal = (order_id) => {
    setDeliverysModal((prev) => ({
      ...prev,
      [order_id]: false,
    }));
  };

  const filteredOrders = orders.filter((order) => {
    return order.name.toLowerCase().includes(keyword.toLowerCase());
  });

  const ActionButton = ({ status, id }) => {
    const [isOpen, setOpen] = useState(false);
    const handleDetails = () => {
      return setOpen((state) => !state);
    };
    switch (status) {
      case 'waiting_for_payment':
        return (
          <>
            <Button
              colorScheme="facebook"
              size="sm"
              onClick={() => handleOpenUploadPaymentReceiptModal(id)}
            >
              Upload Payment Receipt
            </Button>
            <UploadPaymentReceiptModal
              order_id={id}
              open={openUploadPaymentReceiptModal[id] || false}
              toggleOff={() => handleCloseUploadPaymentReceiptModal(id)}
            />
          </>
        );
      case 'on_the_way':
        return (
          <>
            <Button
              colorScheme="whatsapp"
              size="sm"
              onClick={() => handleOpenDeliveryModal(id)}
            >
              Delivery Details
            </Button>
            <DeliveryDetailsModal
              open={deliverysModal[id] || false}
              toggleOff={() => handleCloseDeliveryModal(id)}
              transaction_id={id}
            />
          </>
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
              id={id}
            />
          </>
        );
      default:
        return <Text>No Actions Needed</Text>;
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

  if (filteredOrders?.length == 0) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan="6" textAlign="center">
            <Text>No Order Found</Text>
          </Td>
        </Tr>
      </Tbody>
    );
  }
  return (
    <Tbody>
      {filteredOrders?.map((order, index) => (
        <Tr key={index}>
          <Td>{order.name}</Td>
          <Td>{order.quantity}</Td>
          <Td>RP. {order.total_price}</Td>
          <Td>{order.mitra_name}</Td>
          <Td>
            <BadgeStatus status={order.transaction_status} />
          </Td>
          <Td>
            <ButtonGroup>
              <ActionButton
                status={order.transaction_status}
                id={order.transaction_id}
              />
            </ButtonGroup>
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
