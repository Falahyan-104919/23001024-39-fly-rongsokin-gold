import {
  Button,
  FormControl,
  FormLabel,
  Select,
  Text,
  Input,
  useToast,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import axiosInstance from '../../utils/axios';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { focusManager } from '@tanstack/react-query';

export default function FormBecomeMitra() {
  const { userId } = useParams();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const toast = useToast();
  const initialValues = {
    mitraName: '',
    type: '',
    address: '',
  };
  const mitraSchema = Yup.object().shape({
    mitraName: Yup.string()
      .min(10, 'Mitra Name is Need at least Contain 10 Character')
      .required('Mitra Name is Required'),
    type: Yup.string().required('Mitra Type is Required'),
    address: Yup.string()
      .min(30, 'Mitra Address at least Contain 30 Character')
      .required('Mitra Address is Required'),
  });

  const becomeMitra = async ({ mitraName, type, address }) => {
    const response = await axiosInstance
      .post(`user/become_mitra/${userId}`, {
        mitraName,
        type,
        address,
      })
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
          mitraId: res.data.mitra_id,
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
    focusManager.setFocused(false);
    const response = await becomeMitra(values);
    switch (response.status) {
      case 201:
        logout();
        navigate('/');
        focusManager.setFocused(true);
        return toast({
          title: 'Success',
          description: `${response.message} \n You need to Re-Logged In`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      default:
        return toast({
          title: 'Become Mitra Failed',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={mitraSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field name="mitraName">
            {({ field }) => (
              <FormControl id="mitraName" isRequired>
                <FormLabel>Mitra Name</FormLabel>
                <Input
                  {...field}
                  placeholder="Mitra Name"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="mitraName"
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
              Become Mitra
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
