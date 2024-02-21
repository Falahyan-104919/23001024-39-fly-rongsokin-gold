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
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import axiosInstance from '../../utils/axios';

export default function FormUploadPaymenReceipt({ closeModal, transaction }) {
  const queryClient = useQueryClient();
  const [uploadReceipt, setUploadReceipt] = useState({});
  const toast = useToast();
  const { mutate } = useMutation({
    mutationKey: ['payment_post'],
    mutationFn: (values) => axiosInstance.post('payment', values),
    onSuccess: () => {
      queryClient.invalidateQueries('order');
      closeModal();
      return toast({
        title: 'Success',
        status: 'success',
        description: 'Successfull Uploading Payment Receipt',
        duration: 3000,
      });
    },
  });

  const fd = new FormData();
  fd.append('transaction_id', transaction.transaction_id);
  fd.append('uploaded_by', transaction.uploaded_by);
  fd.append('payment_amount', transaction.payment_amount);

  const initialValues = {
    payment_receipt: '',
  };

  const resetFormData = (fd) => {
    setUploadReceipt({});
    Object.keys(fd).forEach((key) => delete fd[key]);
  };

  const handleSubmit = async (values, actions) => {
    fd.append('payment_receipt', uploadReceipt, uploadReceipt.name);
    mutate(fd);
    resetFormData(fd);
    actions.resetForm();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {({
        isSubmitting,
        isValid,
        dirty,
        values,
        setFieldValue,
        handleSubmit,
        actions,
      }) => (
        <Form autoComplete="off" style={{ width: '100%' }}>
          <Field name="payment_receipt" type="file" multiple>
            {({ field: { value, ...field } }) => (
              <FormControl id="payment_receipt" isRequired>
                <FormLabel>Upload Payment Receipt</FormLabel>
                <Flex alignItems="center">
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    id="payment_receipt"
                    {...field}
                    onChange={(e) => {
                      const files = e.target.files[0];
                      const displayImage = URL.createObjectURL(files);
                      setUploadReceipt(files);
                      setFieldValue('payment_receipt', displayImage);
                    }}
                    disabled={value !== '' ? true : false}
                  />
                  {values?.payment_receipt !== '' ? (
                    <Box m="10px">
                      <Flex>
                        <Image
                          src={values?.payment_receipt}
                          alt={`attached_product_image_${values?.payment_receipt}`}
                          boxSize="200px"
                          objectFit="cover"
                        />
                        <IconButton
                          size="xs"
                          icon={<SmallCloseIcon />}
                          onClick={() => {
                            const updatedImages = '';
                            setUploadReceipt({});
                            setFieldValue('payment_receipt', updatedImages);
                          }}
                        />
                      </Flex>
                    </Box>
                  ) : null}
                  <label htmlFor="payment_receipt">
                    <IconButton
                      as="span"
                      icon={<AttachmentIcon color="white" />}
                      aria-label="Attach"
                      isDisabled={value !== '' ? true : false}
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
