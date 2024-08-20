import { Box, Button, Text } from '@chakra-ui/react';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { getTotalProducts } from './utils/cartSlice';
import CartModal from './components/modals/CartModal';

export default function CartProducts() {
  const [isOpen, setOpen] = useState(false);
  const totalProducts = useSelector(getTotalProducts);
  const handleOpen = () => {
    return setOpen((state) => !state);
  };
  return (
    <>
      <Button size="sm" colorScheme="gray" onClick={handleOpen}>
        <FontAwesomeIcon icon={faCartShopping} style={{ marginRight: '8px' }} />
        <Box borderLeft="solid 1.5px">
          <Text marginLeft="4px"> {totalProducts}</Text>
        </Box>
      </Button>
      <CartModal open={isOpen} toggleOff={handleOpen} />
    </>
  );
}
