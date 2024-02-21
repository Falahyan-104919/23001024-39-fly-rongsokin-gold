import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import FormUploadDeliveryReceipt from '../form/FormUploadDeliveryReceipt';

export default function UploadDeliveryReceiptModal({
  open,
  toggleOff,
  trans_id,
}) {
  const { isLoading, data } = useQuery({
    queryKey: ['payment_receipt', trans_id],
    queryFn: () =>
      axiosInstance
        .get(`payment/${trans_id}`)
        .then((res) => res.data)
        .catch((err) => err.response.data),
  });
  return isLoading ? (
    <Spinner />
  ) : (
    <Modal isOpen={open} onClose={toggleOff} size="3xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Delivery Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box shadow="base" p="4">
            <Text fontSize="xl" fontWeight="medium" mb="12px">
              Buyer Information
            </Text>
            <Text fontSize="md" fontWeight="medium">
              Buyer Name : {data.fullname}
            </Text>
            <Text fontSize="md" fontWeight="medium">
              Buyer Address : {data.address}
            </Text>
            <Text fontSize="md" fontWeight="medium">
              Buyer Phone Number : {data.phone_number}
            </Text>
          </Box>
          <Box mt="12px" shadow="base" p="4">
            <Text fontSize="xl" fontWeight="medium" mb="12px">
              Payment Receipt
            </Text>
            <Image
              src={`http://localhost:8080/${data.file_path}`}
              boxSize="350px"
            />
          </Box>
          <Box mt="12px" shadow="base" p="4">
            <Text mt="12px" fontSize="xl" fontWeight="medium">
              Upload Delivery Receipts
            </Text>
            <Flex mt="12px">
              <FormUploadDeliveryReceipt
                trans_id={data.transaction_id}
                toggleOff={toggleOff}
              />
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

/*
file_path: "public/img/transaction/ed881c46-0bd9-44d2-8f5f-dd42b069b462/payment_receipt/280caee4-9e82-4b79-869e-c7f4fc6e93b2"
payment_amount: "50000"
payment_method: "bank_transfer"
transaction_id: "ed881c46-0bd9-44d2-8f5f-dd42b069b462"
transfer_receipt_id: "0671ff78-77a1-4196-a011-0441b71f83e5"
uploaded_by: "280caee4-9e82-4b79-869e-c7f4fc6e93b2"
*/
