import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axios';
import { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteProductTypeAlert from '../alert/DeleteProductTypeAlert';

const ActionButton = ({ product_type_id }) => {
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
      <DeleteProductTypeAlert
        product_type_id={product_type_id}
        open={openAlert}
        toggleOff={handleOpenAlert}
      />
    </>
  );
};

export default function ProductTypeTable() {
  const [keywordType, setKeywordType] = useState('');
  const fetchProductType = async () => {
    const productType = await axiosInstance
      .get('/admin/product_and_mitra_type')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return productType;
  };
  const { data, isFetched } = useQuery({
    queryKey: ['product_type'],
    queryFn: fetchProductType,
  });
  const filteredType = isFetched
    ? data['productMitraType'].filter((type) =>
        type.name.toLowerCase().includes(keywordType.toLowerCase())
      )
    : [];

  return (
    <TableContainer>
      <Heading size="md">Product Type</Heading>
      <Flex justifyContent="flex-end">
        <InputGroup maxW="250px">
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Search Type..."
            onChange={(e) => {
              setKeywordType(e.target.value);
            }}
          />
        </InputGroup>
      </Flex>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Mitra Type</Th>
            <Th>Product Type</Th>
            <Th>Action Button</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredType.map((type, index) => (
            <Tr key={index}>
              <Td>{type.type}</Td>
              <Td>{type.name}</Td>
              <Td>
                <ActionButton product_type_id={type.product_type_id} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
