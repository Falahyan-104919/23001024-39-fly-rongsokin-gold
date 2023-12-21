import { focusManager } from '@tanstack/react-query';
import { useState } from 'react';
import { Button, ButtonGroup, Tbody, Td, Text, Tr } from '@chakra-ui/react';
import EditProductsModal from '../../modal/EditProducts.Modal';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteProductsAlert from '../../modal/DeleteProductsAlertModal';

export default function TableBodyProduct({ products, keyword }) {
  const [openModalsAddProducts, setOpenModalsAddProducts] = useState({});
  const [openAlertDeleteProducts, setOpenAlertDeleteProducts] = useState({});

  const handleOpenModalAddProducts = (productId) => {
    setOpenModalsAddProducts((prevModals) => ({
      ...prevModals,
      [productId]: true,
    }));
  };

  const handleOpenAlertDeleteProducts = (productId) => {
    setOpenAlertDeleteProducts((prevAlert) => ({
      ...prevAlert,
      [productId]: true,
    }));
  };

  const handleCloseModalAddProducts = (productId) => {
    setOpenModalsAddProducts((prevModals) => ({
      ...prevModals,
      [productId]: false,
    }));
  };

  const handleCloseAlertDeleteProducts = (productId) => {
    setOpenAlertDeleteProducts((prevAlert) => ({
      ...prevAlert,
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
                colorScheme="orange"
                onClick={() => {
                  focusManager.setFocused(false);
                  handleOpenModalAddProducts(product.product_id);
                }}
              >
                Edit
              </Button>
              <Button
                colorScheme="red"
                leftIcon={<DeleteIcon />}
                onClick={() => {
                  focusManager.setFocused(false);
                  handleOpenAlertDeleteProducts(product.product_id);
                }}
              >
                Delete
              </Button>
            </ButtonGroup>
            <EditProductsModal
              products={product}
              open={openModalsAddProducts[product.product_id] || false}
              toggleOff={() => {
                focusManager.setFocused(true);
                handleCloseModalAddProducts(product.product_id);
              }}
            />
            <DeleteProductsAlert
              products={product}
              open={openAlertDeleteProducts[product.product_id] || false}
              toggleOff={() => {
                focusManager.setFocused(true);
                handleCloseAlertDeleteProducts(product.product_id);
              }}
            />
          </Td>
        </Tr>
      ))}
    </Tbody>
  );
}
