import axiosInstance from '../../../utils/axios';
import { focusManager } from '@tanstack/react-query';
import {
  Button,
  ButtonGroup,
  Tbody,
  Td,
  Text,
  Tr,
  useToast,
} from '@chakra-ui/react';

export default function TableBodyOrders({ orders, keyword }) {
  const toast = useToast();
  const ActionButton = ({ status, id }) => {
    switch (status) {
      case 'pending':
        return (
          <Button isDisabled colorScheme="green">
            Delivered
          </Button>
        );
      case 'process':
        return (
          <Button
            colorScheme="green"
            onClick={async () => {
              focusManager.setFocused(false);
              await axiosInstance
                .put(`order/arrived/${id}`, {
                  status: 'success',
                })
                .then((res) => {
                  focusManager.setFocused(true);
                  if (res.status == 201) {
                    return toast({
                      title: 'Status Order Updated',
                      description: res.data.message,
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                })
                .catch((err) => {
                  return toast({
                    title: 'Status Order Failed to Update',
                    description: err.response.data.message,
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                  });
                });
            }}
          >
            Delivered
          </Button>
        );
      default:
        return <Text>No Actions Needed</Text>;
    }
  };

  const filteredOrders = orders.filter((order) => {
    return order.name.toLowerCase().includes(keyword.toLowerCase());
  });

  if (filteredOrders?.length == 0) {
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
      {filteredOrders?.map((order, index) => (
        <Tr key={index}>
          <Td>{order.name}</Td>
          <Td>{order.quantity}</Td>
          <Td>RP. {order.total_price}</Td>
          <Td>{order.mitra_name}</Td>
          <Td>{order.transaction_status.toUpperCase()}</Td>
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
