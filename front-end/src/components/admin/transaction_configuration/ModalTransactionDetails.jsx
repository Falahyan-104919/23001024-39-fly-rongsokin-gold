import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Flex,
  Image,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../../utils/axios';

function convertString(str) {
  const words = str.split('_');
  const format = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  return format;
}

export default function ModalTransactionDetails({ open, toggleOff, id }) {
  const fetchTransactionDetails = async () => {
    const res = await axiosInstance
      .get(`order_details/${id}`)
      .then((res) => res.data.details)
      .catch((err) => err.response.data.message);
    return res;
  };
  const { data, isFetched } = useQuery({
    queryKey: ['transaction_details', id],
    queryFn: fetchTransactionDetails,
  });
  if (isFetched) console.log(data);
  return (
    <AlertDialog
      isOpen={open}
      onClose={toggleOff}
      size={'3xl'}
      isCentered
      scrollBehavior="inside"
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Transactions Details
          </AlertDialogHeader>

          <AlertDialogBody flex="1">
            {isFetched ? (
              <>
                <Flex justify="center" flexDir="column" gap="16px">
                  <Box shadow="lg" borderRadius="lg" p="2">
                    <Text fontSize="3xl">Order Data</Text>
                    <Flex flexDir="column" gap="4px" mt="2">
                      <Text>Buyer : {data.fullname}</Text>
                      <Text>Mitra : {data.mitra_name}</Text>
                      <Text>Products : {data.name}</Text>
                      <Text>Quantity : {data.order_quantity}</Text>
                    </Flex>
                  </Box>
                  {data['transfer_receipt_id'] ? (
                    <Box shadow="lg" borderRadius="lg" p="2">
                      <Text fontSize="3xl">Payment Data</Text>
                      <Flex flexDir="column" gap="4px" mt="2">
                        <Text>
                          Payment Method : {convertString(data.payment_method)}
                        </Text>
                        <Text>From : {data.fullname}</Text>
                        <Text>Amount : Rp. {data.payment_amount} </Text>
                        <Text>Payment Receipt</Text>
                        <Box alignSelf="center" m="8px">
                          <Image
                            src={`http://localhost:8080/${data.payment_pict}`}
                            fit="contain"
                            alt="Payment Receipt"
                          />
                        </Box>
                      </Flex>
                    </Box>
                  ) : null}
                  {data['delivery_receipt_id'] ? (
                    <Box shadow="lg" borderRadius="lg" p="2">
                      <Text fontSize="3xl">Delivery Data</Text>
                      <Flex flexDir="column" gap="4px" mt="2">
                        <Text>
                          Delivery Method :{' '}
                          {convertString(data.delivery_services)}
                        </Text>
                        {data.tracking_number ? (
                          <Text> Tracking Number : {data.tracking_number}</Text>
                        ) : null}
                        <Text>Delivery Receipts</Text>
                        <Box alignSelf="center" m="8px">
                          <Image
                            src={`http://localhost:8080/${data.delivery_pict}`}
                            fit="contain"
                            alt="Delivery Receipt"
                          />
                        </Box>
                      </Flex>
                    </Box>
                  ) : null}
                </Flex>
              </>
            ) : (
              <Flex justify="center">
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="green.500"
                  size="xl"
                />
              </Flex>
            )}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Close</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

/*
buyer_id: "280caee4-9e82-4b79-869e-c7f4fc6e93b2"
deadline: "2024-03-02T19:52:48.913Z"
delivery_receipt_id: "e5b33283-6d0c-46a9-b61b-6c11ab2e0a4e"
delivery_services: "self_delivery"
file_path: "public/img/transaction/97c57def-5b58-4d36-a248-206f04037761/delivery_receipt/172544c9-a9fb-495d-8cf0-dfd4b1159694"
mitra_id: "2fe70f9f-f2ae-4b6f-ada4-dbcbe223b335"
payment_amount: "50000"
payment_method: "bank_transfer"
product_id: "dfbfa49e-5bf3-44c9-99c6-658c56d4f5c4"
quantity: "25"
total_price: "50000"
tracking_number: null
transaction_date: "2024-03-01T19:52:48.913Z"
transaction_id: "97c57def-5b58-4d36-a248-206f04037761"
transaction_status: "success"
transfer_receipt_id: "b1894e94-ce73-4ae6-9d45-280285cd2201"
uploaded_by: "172544c9-a9fb-495d-8cf0-dfd4b1159694"
*/
