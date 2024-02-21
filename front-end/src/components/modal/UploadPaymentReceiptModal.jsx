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
import Countdown from '../Countdown';
import FormUploadPaymenReceipt from '../form/FormUploadPaymentReceipt';

export default function UploadPaymentReceiptModal({
  open,
  toggleOff,
  order_id,
}) {
  const { data, isLoading } = useQuery({
    queryKey: ['order_info', order_id],
    queryFn: () =>
      axiosInstance.get(`order/${order_id}`).then((res) => res.data.data),
  });
  return (
    <Modal isOpen={open} onClose={toggleOff} size="3xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Upload Payment Receipt</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex flexDir="column" align="center">
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                Payment Timeleft
                <Countdown datetime={data.deadline} />
                <Flex
                  w="full"
                  flexDir="row"
                  border="1px"
                  borderColor="whiteAlpha.600"
                  borderRadius="base"
                  shadow="base"
                  marginTop="2"
                  align="start"
                  p="4"
                >
                  <Image
                    src={`http://localhost:8080/${data.image_data[0].image_path}`}
                    boxSize="150px"
                  />
                  <Flex flexDir="column" marginLeft="4">
                    <Text fontSize="md">
                      Transaction ID : {data.transaction_id}
                    </Text>
                    <Text fontSize="xl"> Product Name : {data.name}</Text>
                    <Text fontSize="xl"> Quantity : {data.buy_quantity}</Text>
                    <Text fontSize="xl">
                      Total Price : Rp. {data.total_price}
                    </Text>
                    <Text fontSize="xl"> Mitra : {data.mitra_name}</Text>
                  </Flex>
                </Flex>
                <Flex
                  w="full"
                  flexDir="column"
                  border="1px"
                  borderColor="whiteAlpha.600"
                  borderRadius="base"
                  shadow="base"
                  marginTop="4"
                  marginBottom="4"
                  align="start"
                  p="4"
                >
                  <Box mb="12px">
                    <Text fontSize="md" fontWeight="medium">
                      Transfer To
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      Fullname : {data.fullname}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      Bank Name : {data.bank_name}
                    </Text>
                    <Text fontSize="md" fontWeight="medium">
                      Bank Number : {data.bank_number}
                    </Text>
                  </Box>
                  <FormUploadPaymenReceipt
                    closeModal={toggleOff}
                    transaction={{
                      transaction_id: data.transaction_id,
                      uploaded_by: data.buyer_id,
                      payment_amount: data.total_price,
                    }}
                  />
                </Flex>
              </>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

/*
bank_name: "Mandiri"
bank_number: "11400092857238"
buyer_id: "2d927576-c7ed-48b5-abb6-a460b49ada91"
created_at: "2024-02-18T17:02:40.165Z"
deadline: "2024-02-19T17:32:21.150Z"
description: "Botol Beling 750ml Berwarna Utuh, siap pakai kembali"
fullname: "Juned"
image_data: Array [ {…} ]
mitra_id: "47a24ce4-0ce1-4793-9524-0d84457cc4a8"
name: "Botol Beling Warna"
price: "800"
product_id: "4bdcaf03-b28a-4ed4-81f2-105f6d7b9686"
product_type_id: "18bd2df1-495b-4064-a3be-d82da8172d1a"
quantity: "75"
status: true
total_price: "4000"
transaction_date: "2024-02-18T17:32:21.150Z"
transaction_id: "9482a91f-5a6d-4a87-a666-299a9ef2ec35"
transaction_status: "waiting_for_payment"
unit: "Piece"
updated_at: "2024-02-18T17:02:40.165Z"
*/
