import axiosInstance from '../../../utils/axios';
import { focusManager } from '@tanstack/react-query';
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

export default function TableBodyOrders({ orders, keyword }) {
  const [openDeliveredAlert, setOpenDeliveredAlert] = useState({});

  const handleOpenDeliveredAlert = (order_id) => {
    setOpenDeliveredAlert((prevDeliveredAlert) => ({
      ...prevDeliveredAlert,
      [order_id]: true,
    }));
  };

  const handleCloseDeliveredAlert = (order_id) => {
    setOpenDeliveredAlert((prevDeliveredAlert) => ({
      ...prevDeliveredAlert,
      [order_id]: false,
    }));
  };

  const filteredOrders = orders.filter((order) => {
    return order.name.toLowerCase().includes(keyword.toLowerCase());
  });

  const ActionButton = ({ status, id }) => {
    const toast = useToast();
    switch (status) {
      case 'pending':
        return (
          <Button isDisabled colorScheme="green">
            Delivered
          </Button>
        );
      case 'process':
        return (
          <>
            <Button
              colorScheme="green"
              onClick={() => {
                focusManager.setFocused(false);
                handleOpenDeliveredAlert(orders.order_id);
              }}
            >
              Delivered
            </Button>
            <DeliveredProductsAlertModal
              orderId={id}
              open={openDeliveredAlert[orders.order_id] || false}
              toggleOff={() => {
                focusManager.setFocused(true);
                handleCloseDeliveredAlert(orders.order_id);
              }}
            />
          </>
        );
      default:
        return <Text>No Actions Needed</Text>;
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
