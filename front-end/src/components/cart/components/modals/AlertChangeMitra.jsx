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
import { useDispatch } from 'react-redux';
import { addProducts, changeMitra, resetCart } from '../../utils/cartSlice';

export default function AlertChangeMitra({
  open,
  toggleOff,
  mitra_id,
  products,
}) {
  const toast = useToast();
  const dispatch = useDispatch();
  const handleChangeMitra = (mitra_id, products) => {
    try {
      dispatch(changeMitra(mitra_id));
      dispatch(resetCart());
      dispatch(addProducts(products));
      toast({
        title: 'Successfully Add Products to Cart',
        status: 'success',
        duration: 3000,
      });
      return toggleOff();
    } catch (err) {
      return toast({
        title: 'Failed to Add Products to Cart',
        status: 'error',
        description: 'Something Wrong!',
        duration: 3000,
      });
    }
  };
  return (
    <AlertDialog isOpen={open} onClose={toggleOff} size={'3xl'} isCentered>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Change Mitra
          </AlertDialogHeader>

          <AlertDialogBody flex="1">
            Are you sure want to change Mitra ?
          </AlertDialogBody>

          <AlertDialogFooter flex={1} gap={4}>
            <Button onClick={toggleOff}>Close</Button>
            <Button
              onClick={() => handleChangeMitra(mitra_id, products)}
              colorScheme="green"
            >
              Yes
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
