import {
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import DeleteProductAlert from './DeleteProductAlert';

const ActionButton = ({ productId }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setOpenAlert((prevAlert) => !prevAlert);
  };
  return (
    <>
      <ButtonGroup>
        <Button size="sm" colorScheme="red" onClick={handleOpenAlert}>
          <FontAwesomeIcon
            icon={faTrash}
            color="white"
            style={{ marginRight: '8px' }}
          />
          Delete
        </Button>
      </ButtonGroup>
      <DeleteProductAlert
        productId={productId}
        open={openAlert}
        toggleOff={handleOpenAlert}
      />
    </>
  );
};

export default function TableProduct({ list }) {
  const formatTime = (datetime) => {
    const formatted = new Date(datetime).toLocaleString('id-ID', {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return formatted;
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Product Owner</Th>
          <Th>Updated At</Th>
          <Th>Action Button</Th>
        </Tr>
      </Thead>
      <Tbody>
        {list.map((product, index) => {
          return (
            <Tr key={index}>
              <Td>{product.name}</Td>
              <Td>{product.mitra_name}</Td>
              <Td>{formatTime(product.updated_at)}</Td>
              <Td>
                <ActionButton productId={product.product_id} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
