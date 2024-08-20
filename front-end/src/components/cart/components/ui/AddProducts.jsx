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
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import {
  addProducts,
  changeMitra,
  getCurrentMitra,
} from '../../utils/cartSlice';
import { useState } from 'react';
import AlertChangeMitra from '../modals/AlertChangeMitra';

export default function AddProducts({
  mitra_id,
  products,
  disabled,
  order_quantity,
}) {
  const mitra = useSelector(getCurrentMitra);
  const dispatch = useDispatch();
  const toast = useToast();
  const [isAlertOpen, setOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setOpenAlert((state) => !state);
  };
  const handleAddProducts = () => {
    if (mitra == null || mitra == mitra_id) {
      try {
        dispatch(changeMitra(mitra_id));
        dispatch(
          addProducts({
            ...products,
            order_quantity: parseInt(order_quantity),
            totalProductPrice: order_quantity * products.price,
          })
        );
        return toast({
          title: 'Successfully Add Products to Cart',
          status: 'success',
          duration: 3000,
        });
      } catch (err) {
        return toast({
          title: 'Failed to Add Products to Cart',
          status: 'error',
          description: 'Something Wrong!',
          duration: 3000,
        });
      }
    } else {
      return handleOpenAlert();
    }
  };
  return (
    <>
      <Button
        colorScheme="facebook"
        onClick={handleAddProducts}
        mt={4}
        isDisabled={disabled}
      >
        <FontAwesomeIcon icon={faCartPlus} style={{ marginRight: '8px' }} />
        Add to Cart
      </Button>
      <AlertChangeMitra
        open={isAlertOpen}
        toggleOff={handleOpenAlert}
        mitra_id={mitra_id}
        products={{
          ...products,
          order_quantity: parseInt(order_quantity),
          totalProductPrice: order_quantity * products.price,
        }}
      />
    </>
  );
}
