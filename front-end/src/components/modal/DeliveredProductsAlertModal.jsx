import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/axios';
import { focusManager } from '@tanstack/react-query';

export default function DeliveredProductsAlertModal({
  orderId,
  open,
  toggleOff,
}) {
  const toast = useToast();
  const handleRecieveProducts = async (order_id) => {
    focusManager.setFocused(false);
    await axiosInstance
      .put(`order/arrived/${order_id}`, {
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
  };
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Recieve Products ?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            <Button
              colorScheme="whatsapp"
              onClick={() => {
                handleRecieveProducts(orderId);
                focusManager.setFocused(true);
                toggleOff();
              }}
              ml={3}
            >
              Recieve
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
