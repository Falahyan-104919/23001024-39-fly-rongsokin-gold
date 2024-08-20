import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Spacer,
  Text,
  useToast,
} from '@chakra-ui/react';
import ProductCard from '../ui/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAllProducts,
  getCurrentMitra,
  getTotalPrice,
  resetCart,
} from '../../utils/cartSlice';
import { AuthContext } from '../../../../store/AuthProvider';
import { useContext } from 'react';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axios';
import formatNumberWithCommas from '../../../../utils/helper';

export default function CartModal({ open, toggleOff }) {
  const { user } = useContext(AuthContext);
  const totalPrice = useSelector(getTotalPrice);
  const allProducts = useSelector(getAllProducts);
  const current_mitra = useSelector(getCurrentMitra);
  const dispatch = useDispatch();
  const toast = useToast();
  const { mutate } = useMutation({
    mutationKey: ['checkout_all_items'],
    mutationFn: (values) =>
      axiosInstance.post(`order/${values.user_id}`, values),
    onSuccess: () => {
      dispatch(resetCart());
      toggleOff();
      return toast({
        title: 'Successfully Place Order!',
        status: 'success',
        duration: 3000,
      });
    },
    onError: () => {
      return toast({
        title: 'Place Order Failed',
        status: 'error',
        duration: 3000,
      });
    },
  });
  const handleCheckoutItems = () => {
    mutate({
      user_id: user.userId,
      mitraId: current_mitra,
      products: allProducts,
      totalPrice,
    });
  };
  return (
    <AlertDialog
      isOpen={open}
      onClose={toggleOff}
      size={'3xl'}
      isCentered
      scrollBehavior="inside"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Cart Products
          </AlertDialogHeader>

          <AlertDialogBody flex="1">
            <ProductCard />
          </AlertDialogBody>

          <AlertDialogFooter flex={1} gap={4}>
            <Text fontWeight="bold" fontSize="lg">
              Total Price : Rp. {formatNumberWithCommas(totalPrice)}
            </Text>
            <Spacer />
            <Button onClick={toggleOff}>Close</Button>
            <Button
              onClick={handleCheckoutItems}
              colorScheme="green"
              isDisabled={allProducts.length == 0}
            >
              Checkout Items
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
