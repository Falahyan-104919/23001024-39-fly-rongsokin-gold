import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ErrorMessage, Field, Form, Formik, useFormik } from 'formik';
import axiosInstance from '../../../../utils/axios';
import * as Yup from 'yup';
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';

export default function FormMitraSettings() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['mitra_type'],
    mutationFn: (values) => axiosInstance.post('mitra_type', values),
    onSuccess: () => {
      toast({
        title: 'Successfull',
        description: 'Succesfully added new Mitra Type',
        status: 'success',
        duration: 3000,
      });
      return queryClient.invalidateQueries([
        'mitra_type_list',
        'product_mitra_type',
      ]);
    },
  });
  const validationSchema = Yup.object().shape({
    type_name: Yup.string()
      .min(2, 'Too Short!')
      .max(25, 'Too Long!')
      .required('Mitra Type Name is Required!'),
  });

  const initialValues = {
    type_name: '',
  };

  const handleSubmit = (values, actions) => {
    mutate(values);
    return actions.resetForm();
  };

  return (
    <Box w="400px">
      <Heading size="md" mb={3}>
        Add New Mitra Type
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form>
            <Field name="type_name">
              {({ field }) => (
                <FormControl id="type_name" isRequired>
                  <FormLabel>Mitra Type Name</FormLabel>
                  <Input
                    {...field}
                    placeholder="Type Name"
                    type="text"
                    focusBorderColor="teal.100"
                  />
                  <ErrorMessage
                    name="type_name"
                    component={Text}
                    color="red.500"
                  />
                </FormControl>
              )}
            </Field>
            <Button
              type="submit"
              w="100%"
              mt={4}
              bgColor="teal.400"
              isLoading={isSubmitting}
              isDisabled={isSubmitting || !isValid || !dirty}
            >
              <Text fontWeight="bold" fontSize="lg" color="white">
                Submit
              </Text>
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
