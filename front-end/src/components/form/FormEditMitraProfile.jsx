import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';

export default function FormEditMitraProfile() {
  const { userId } = useParams();
  const toast = useToast();
  let initialValues;

  const { isPending, isError, isFetched, data, error } = useQuery({
    queryKey: ['mitraData', userId],
    queryFn: async () => await axiosInstance.get(`user_mitra/${userId}`),
  });

  const mitraSchema = Yup.object().shape({
    mitra_name: Yup.string()
      .min(10, 'Mitra Name is Need at least Contain 10 Character')
      .required('Mitra Name is Required'),
    type: Yup.string().required('Mitra Type is Required'),
    address: Yup.string()
      .min(30, 'Mitra Address at least Contain 30 Character')
      .required('Mitra Address is Required'),
  });

  const editMitra = async ({ mitra_id, mitra_name, type, address }) => {
    const response = await axiosInstance
      .post(`mitra/${mitra_id}`, {
        mitra_name,
        type,
        address,
      })
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          status: err.response.status,
          message: err.response.data.message,
        };
      });
    return response;
  };

  const handleSubmit = async (values, actions) => {
    const response = await editMitra(values);
    switch (response.status) {
      case 201:
        toast({
          title: 'Update Mitra Profile Successfull',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return actions.resetForm();
      default:
        return toast({
          title: 'Something Wrong!',
          description: response.message,
          status: 'Error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  if (isError) {
    return <Text>Something Wrong! \n {error.message}</Text>;
  }

  if (isPending) {
    return (
      <Button
        isLoading
        loadingText="Loading"
        colorScheme="teal"
        variant="link"
        spinnerPlacement="start"
      />
    );
  }

  if (isFetched) {
    initialValues = { ...data.data.data };
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mitraSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field name="mitra_id" style={{ display: 'none' }} />
          <Field name="mitra_name">
            {({ field }) => (
              <FormControl id="mitra_name" isRequired>
                <FormLabel>Mitra Name</FormLabel>
                <Input
                  {...field}
                  placeholder="Mitra Name"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="mitra_name"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="type">
            {({ field }) => (
              <FormControl id="type" isRequired>
                <FormLabel>Mitra Type</FormLabel>
                <Select
                  placeholder="Select Mitra Type"
                  name="type"
                  onChange={field.onChange}
                  value={field.value}
                >
                  {['Pengumpul', 'Pengelola'].map((type) => (
                    <option key={type} value={type} id={type}>
                      {type}
                    </option>
                  ))}
                </Select>
              </FormControl>
            )}
          </Field>
          <Field name="address">
            {({ field }) => (
              <FormControl id="type" isRequired>
                <FormLabel>Mitra Address</FormLabel>
                <Input
                  {...field}
                  placeholder="Address"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage name="address" component={Text} color="red.500" />
              </FormControl>
            )}
          </Field>
          <Button
            w="100%"
            mt={4}
            bgColor="teal.300"
            isLoading={isSubmitting}
            type="submit"
            isDisabled={isSubmitting || !isValid || !dirty}
          >
            <Text fontWeight="bold" fontSize="lg" color="white">
              Edit Profile Mitra
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
