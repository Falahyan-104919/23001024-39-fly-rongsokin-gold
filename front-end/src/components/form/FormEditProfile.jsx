import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import axiosInstance from '../../utils/axios';

export default function FormEditProfile() {
  const { user, setUser } = useContext(AuthContext);
  const toast = useToast();
  const initialValues = {
    ...user,
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please Provide Correct Email')
      .required('Email is Required'),
    fullname: Yup.string()
      .min(4, 'Fullname need at least 4 Character')
      .required('Fullname is Required'),
    phoneNumber: Yup.string()
      .min(10, 'Phone Number Must be at least 10 Character')
      .required('Phone Number is Required')
      .transform((currentValue) => currentValue.replace('0', '62')),
  });

  const editProfile = async ({ fullname, email, phoneNumber }) => {
    const response = await axiosInstance
      .put(`user/${user.userId}`, {
        userId: user.userId,
        fullname,
        email,
        phoneNumber,
      })
      .then((res) => {
        return {
          status: res.status,
          message: res.message,
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
    const res = await editProfile(values);
    switch (res.status) {
      case 201:
        toast({
          title: 'Profile Updated.',
          description: res.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        setUser((prevData) => {
          return {
            ...prevData,
            email: values.email,
            fullname: values.fullname,
            phoneNumber: values.phoneNumber,
          };
        });
        return actions.resetForm();
      default:
        return toast({
          title: 'Something Wrong!',
          description: res.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field name="email">
            {({ field }) => (
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  {...field}
                  placeholder="Email"
                  type="email"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage name="email" component={Text} color="red.500" />
              </FormControl>
            )}
          </Field>
          <Field name="fullname">
            {({ field }) => (
              <FormControl id="fullname" isRequired>
                <FormLabel>Fullname</FormLabel>
                <Input
                  {...field}
                  placeholder="Fullname"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="fullname"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="phoneNumber">
            {({ field }) => (
              <FormControl id="phoneNumber" isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  {...field}
                  placeholder="Phone Number"
                  type="text"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component={Text}
                  color="red.500"
                />
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
              Register
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
