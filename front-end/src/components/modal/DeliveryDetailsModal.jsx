import {
  Box,
  Button,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { useState } from 'react';
import DeliveredProductsAlertModal from './DeliveredProductsAlertModal';

const stringFormatter = (str) => {
  return str.replaceAll('_', ' ').toUpperCase();
};

export default function DeliveryDetailsModal({
  transaction_id,
  toggleOff,
  open,
}) {
  const [alertRecieve, setAlertRecieve] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ['delivery_details', transaction_id],
    queryFn: () =>
      axiosInstance
        .get(`delivery_receipt/${transaction_id}`)
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });
  const handleAlert = () => setAlertRecieve((prev) => !prev);
  return (
    <Modal isOpen={open} onClose={toggleOff} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Delivery Details</ModalHeader>
        <ModalCloseButton />
        {isLoading ? (
          <Flex grow="1" justify="center" align="center" h="400px">
            <Spinner size="xl" />
          </Flex>
        ) : (
          <ModalBody gap="4">
            <Box shadow="base" p="4" mb="4">
              <Text fontSize="xl" fontWeight="medium">
                Delivery Method : {stringFormatter(data.delivery_services)}
              </Text>
              {data.tracking_number ? (
                <Text fontSize="xl" fontWeight="medium">
                  Tracking Number : {data.tracking_number}
                </Text>
              ) : null}
            </Box>
            <Box shadow="base" p="4">
              <Text fontSize="xl" fontWeight="medium">
                Delivery Receipt
              </Text>
              <Flex grow="1" w="100%" justify="center">
                <Image src={`http://localhost:8080/${data.file_path}`} />
              </Flex>
            </Box>
          </ModalBody>
        )}
        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={toggleOff}>
            Close
          </Button>
          <Button colorScheme="whatsapp" onClick={handleAlert}>
            Receive Products
          </Button>
          <DeliveredProductsAlertModal
            orderId={transaction_id}
            open={alertRecieve}
            toggleOffAlert={handleAlert}
            toggleOffModal={toggleOff}
          />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

/*
delivery_receipt_id: "e99d0264-e713-4079-8bd5-6fd82ebba524"
delivery_services: "courier_cargo"
file_path: "public/img/transaction/ed881c46-0bd9-44d2-8f5f-dd42b069b462/delivery_receipt/172544c9-a9fb-495d-8cf0-dfd4b1159694"
tracking_number: "courier_cargo"
transaction_id: "ed881c46-0bd9-44d2-8f5f-dd42b069b462"
uploaded_by: "172544c9-a9fb-495d-8cf0-dfd4b1159694"
*/
