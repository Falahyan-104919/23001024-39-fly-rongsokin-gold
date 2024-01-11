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

export default function CancelTransactionAlertModal({
  transactionId,
  open,
  toggleOff,
}) {
  const toast = useToast();
  const handleCancelTransaction = async (transaction_id) => {
    focusManager.setFocused(false);
    await axiosInstance
      .put(`update_status_transaction/${transaction_id}`, {
        status: 'cancel',
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
            Cancel Transaction ?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleCancelTransaction(transactionId);
                focusManager.setFocused(true);
                toggleOff();
              }}
              ml={3}
            >
              Cancel Transactions
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
