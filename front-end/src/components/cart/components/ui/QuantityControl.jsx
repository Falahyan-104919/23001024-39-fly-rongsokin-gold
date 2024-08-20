import { Button, Flex, Text } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import {
  addProducts,
  deleteFromCart,
  removeProducts,
} from '../../utils/cartSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

export default function QuantityControl({ products }) {
  const dispatch = useDispatch();
  const incrementQuantity = () => {
    return dispatch(addProducts(products));
  };
  const decrementQuantity = () => {
    return dispatch(removeProducts(products));
  };
  const removeProduct = () => {
    return dispatch(deleteFromCart(products));
  };
  return (
    <Flex gap={3} dir="column" justifyContent="end" alignItems="center">
      <Button onClick={removeProduct} colorScheme="red" size="sm">
        <FontAwesomeIcon icon={faTrash} />
      </Button>
      <Button
        onClick={decrementQuantity}
        colorScheme="red"
        size="sm"
        isDisabled={products.order_quantity == products.minimum_order}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <Text>{products.order_quantity}</Text>
      <Button onClick={incrementQuantity} colorScheme="blue" size="sm">
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </Flex>
  );
}
