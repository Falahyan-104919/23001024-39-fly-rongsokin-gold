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

export default function DeleteProductsAlert({ products, open, toggleOff }) {
  const toast = useToast();
  const handleDeleteProducts = async (id) => {
    const response = await axiosInstance
      .delete(`products/${id}`)
      .then((res) => {
        return {
          status: res.status,
          message: res.message,
        };
      });
    if (response.status != 203) {
      toast({
        title: 'Something Wrong!',
        description: response.message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    return toast({
      title: 'Successfully Delete Products!',
      description: response.message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDeleteProducts(products.product_id);
                toggleOff();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
