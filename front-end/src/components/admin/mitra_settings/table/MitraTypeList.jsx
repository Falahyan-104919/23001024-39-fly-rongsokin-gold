import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../../../utils/axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  ListItem,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import DeleteMitraTypeAlert from '../alert/DeleteMitraTypeAlert';
import { useState } from 'react';

const ActionButton = ({ mitra_type_id }) => {
  const [isOpenAlert, setOpenAlert] = useState(false);
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
      <DeleteMitraTypeAlert
        mitra_type_id={mitra_type_id}
        open={isOpenAlert}
        toggleOff={handleOpenAlert}
      />
    </>
  );
};

export default function MitraTypeList() {
  const fetchMitraType = async () => {
    const list = await axiosInstance
      .get('mitra_type')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return list;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['mitra_type_list'],
    queryFn: fetchMitraType,
  });
  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    );
  }
  return (
    <Flex flexDir="column">
      <Heading size="md" mb={2}>
        Mitra Type List
      </Heading>
      <TableContainer w="100%">
        <Table variant="striped">
          <Thead>
            <Tr>
              <Th>Mitra Type</Th>
              <Th>Action Button</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data['mitraType'].map((mt) => {
              const { mitra_type_id, type } = mt;
              return (
                <Tr key={mitra_type_id}>
                  <Td>{type}</Td>
                  <Td>
                    <ActionButton mitra_type_id={mitra_type_id} />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
}
