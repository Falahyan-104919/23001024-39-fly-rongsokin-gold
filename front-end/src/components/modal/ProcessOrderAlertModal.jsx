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

export default function ProcessOrderAlertModal({
  transactionId,
  productId,
  newQuantity,
  open,
  toggleOff,
}) {
  const toast = useToast();
  const handleProcessOrder = async (transaction_id, product_id, quantity) => {
    focusManager.setFocused(false);
    await axiosInstance
      .put(`process_order/${transaction_id}`, {
        status: 'process',
        quantity: quantity,
        product_id: product_id,
      })
      .then((res) => {
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
          description: err.message,
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
            Process Order ?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            <Button
              colorScheme="facebook"
              onClick={async () => {
                await handleProcessOrder(transactionId, productId, newQuantity);
                focusManager.setFocused(true);
                toggleOff();
              }}
              ml={3}
            >
              Process
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
