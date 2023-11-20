import { focusManager } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, ButtonGroup, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import EditProductsModal from '../../modal/EditProducts.Modal';

export default function TableBodyProduct({ products, keyword }) {
  const [openModals, setOpenModals] = useState({});

  const handleOpenModal = (productId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [productId]: true,
    }));
  };

  const handleCloseModal = (productId) => {
    setOpenModals((prevModals) => ({
      ...prevModals,
      [productId]: false,
    }));
  };

  const filteredProducts = products?.filter((product) => {
    return product.name.toLowerCase().includes(keyword.toLowerCase());
  });

  if (filteredProducts?.length == 0) {
    return (
      <Tbody>
        <Tr>
          <Td colSpan="5" textAlign="center">
            <Text>No Products Found!</Text>
          </Td>
        </Tr>
      </Tbody>
    );
  }

  return (
    <Tbody>
      {filteredProducts?.map((product) => (
        <Tr key={product.product_id}>
          <Td>{product.name}</Td>
          <Td>{product.product_type}</Td>
          <Td>Rp. {product.price}</Td>
          <Td>{product.quantity}</Td>
          <Td colSpan="2" textAlign="center">
            <ButtonGroup>
              <Button
                onClick={() => {
                  focusManager.setFocused(false);
                  handleOpenModal(product.product_id);
                }}
              >
                Edit
              </Button>
              <Button>Delete</Button>
            </ButtonGroup>
            <EditProductsModal
              products={product}
              open={openModals[product.product_id] || false}
              toggleOff={() => {
                focusManager.setFocused(true);
                handleCloseModal(product.product_id);
              }}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
