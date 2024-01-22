import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as Yup from 'yup';
import axiosInstance from '../../../../utils/axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';

const OptionMitraType = () => {
  const fetchMitraType = async () => {
    const mitraType = await axiosInstance
      .get('mitra_type')
      .then((res) => res.data)
      .catch((err) => err.data.message);
    return mitraType;
  };
  const { data, isLoading } = useQuery({
    queryKey: ['product_mitra_type'],
    queryFn: fetchMitraType,
  });
  if (isLoading) return <option>Loading....</option>;
  return data['mitraType'].map((mt) => {
    const { mitra_type_id, type } = mt;
    return (
      <option key={mitra_type_id} value={mitra_type_id} id={mitra_type_id}>
        {type}
      </option>
    );
  });
};

export default function FormProductType() {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ['product_mitra_type'],
    mutationFn: (values) => axiosInstance.post('product_types', values),
    onSuccess: () => {
      toast({
        title: 'Successfull',
        description: 'Successfull added New Product Type for Mitra',
        status: 'success',
        duration: 3000,
      });
      return queryClient.invalidateQueries(['']);
    },
  });
  const validationSchema = Yup.object().shape({
    mitra_type_id: Yup.string().required('Mitra Type is Required'),
    type: Yup.string()
      .min(5, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Product Type Name is Required'),
  });

  const initialValues = {
    mitra_type_id: '',
    type: '',
  };

  const handleSubmit = (values, actions) => {
    // return console.log(values);
    mutate(values);
    return actions.resetForm();
  };

  return (
    <Box w="400px">
      <Heading size="md" mb={3}>
        Add New Product Type for Mitra
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, isValid, dirty }) => (
          <Form autoComplete="off">
            <Field name="mitra_type_id">
              {({ field }) => (
                <FormControl id="mitra_type_id" isRequired>
                  <FormLabel>Mitra Type</FormLabel>
                  <Select
                    {...field}
                    placeholder="Select Mitra Type"
                    name="mitra_type_id"
                  >
                    <OptionMitraType />
                  </Select>
                  <ErrorMessage
                    name="mitra_type_id"
                    component={Text}
                    color="red.500"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="type">
              {({ field }) => (
                <FormControl id="type" isRequired>
                  <FormLabel>Product Type</FormLabel>
                  <Input
                    {...field}
                    placeholder="Product Type"
                    type="text"
                    focusBorderColor="teal.100"
                  />
                  <ErrorMessage name="type" component={Text} color="red.500" />
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
                Become Mitra
              </Text>
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
