import { AttachmentIcon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  IconButton,
  Image,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axios';
import { AuthContext } from '../../store/AuthProvider';

export default function FormUploadDeliveryReceipt({ trans_id, toggleOff }) {
  const { user } = useContext(AuthContext);
  const [deliveryReceipt, setDeliveryReceipt] = useState({});
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['delivery_post'],
    mutationFn: (value) => axiosInstance.post('delivery_receipt', value),
    onSuccess: () => {
      queryClient.invalidateQueries('transaction');
      toggleOff();
      return toast({
        title: 'Successfull',
        description: 'Successfully Upload Delivery Receipt',
        status: 'success',
        duration: 3000,
      });
    },
  });
  const fd = new FormData();
  fd.append('transaction_id', trans_id);
  fd.append('uploaded_by', user.userId);

  const initialValues = {
    delivery_method: '',
    delivery_receipt: '',
    tracking_number: '',
  };

  const validationSchema = Yup.object().shape({
    delivery_method: Yup.string().required('Delivery Method is Required'),
    tracking_number: Yup.string().when('delivery_method', {
      is: 'courier_cargo',
      then: () => Yup.string().required('Tracking Number is Required'),
      otherwise: () => Yup.string(),
    }),
    delivery_receipt: Yup.string().required('Delivery Receipt is Required'),
  });

  const resetFormData = (fd) => {
    setDeliveryReceipt({});
    Object.keys(fd).forEach((key) => delete fd[key]);
  };

  const handleSubmit = async (values, actions) => {
    fd.append('delivery_services', values.delivery_method);
    if (values.tracking_number) {
      fd.append('tracking_number', values.tracking_number);
    }
    fd.append('delivery_receipt', deliveryReceipt, deliveryReceipt.name);
    mutate(fd);
    resetFormData(fd);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {({
        isSubmitting,
        isValid,
        values,
        setFieldValue,
        handleSubmit,
        actions,
        dirty,
      }) => (
        <Form
          autoComplete="off"
          style={{ width: '100%', marginBottom: '24px' }}
        >
          <Field name="delivery_method">
            {({ field }) => (
              <FormControl id="delivery_method" isRequired>
                <FormLabel>Delivery Method</FormLabel>
                <Select
                  placeholder="Select Delivery Method"
                  name="delivery_method"
                  {...field}
                >
                  <option value="self_delivery" id="self_delivery">
                    Self Delivery
                  </option>
                  <option value="courier_cargo" id="courier_cargo">
                    Courier Cargo
                  </option>
                </Select>
              </FormControl>
            )}
          </Field>
          {values.delivery_method == 'courier_cargo' ? (
            <Field name="tracking_number">
              {({ field }) => (
                <FormControl id="tracking_number" isRequired marginTop="12px">
                  <FormLabel>Tracking Number</FormLabel>
                  <Input
                    {...field}
                    placeholder="Enter Tracking Number"
                    focusBorderColor="teal.100"
                  />
                  <ErrorMessage
                    name="tracking_number"
                    component={Text}
                    color="red.500"
                  />
                </FormControl>
              )}
            </Field>
          ) : null}
          <Field name="delivery_receipt" type="file">
            {({ field: { value, ...field } }) => (
              <FormControl id="delivery_receipt" isRequired marginTop="18px">
                <FormLabel>Delivery Receipt</FormLabel>
                <Flex alignItems="center">
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="delivery_receipt"
                    {...field}
                    onChange={(e) => {
                      const files = e.target.files[0];
                      const displayImage = URL.createObjectURL(files);
                      setDeliveryReceipt(files);
                      setFieldValue('delivery_receipt', displayImage);
                    }}
                    disabled={value !== '' ? true : false}
                  />
                  {values?.delivery_receipt !== '' ? (
                    <Box m="10px">
                      <Flex>
                        <Image
                          src={values?.delivery_receipt}
                          alt={`attached_product_image_${values?.delivery_receipt}`}
                          boxSize="200px"
                          objectFit="cover"
                        />
                        <IconButton
                          size="xs"
                          icon={<SmallCloseIcon />}
                          onClick={() => {
                            const updatedImages = '';
                            setDeliveryReceipt({});
                            setFieldValue('delivery_receipt', updatedImages);
                          }}
                        />
                      </Flex>
                    </Box>
                  ) : null}
                  <label htmlFor="delivery_receipt">
                    <IconButton
                      as="span"
                      icon={<AttachmentIcon color="white" />}
                      aria-label="Attach"
                      isDisabled={values.delivery_receipt !== '' ? true : false}
                      size="lg"
                      bgColor="teal"
                    />
                  </label>
                </Flex>
                <FormErrorMessage>
                  Payment Receipt is Need at Least 1 Image
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex grow="1" justify="end" marginTop="4">
            <Button
              colorScheme="teal"
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isValid || !dirty}
              onClick={() => handleSubmit(values, actions)}
            >
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}
