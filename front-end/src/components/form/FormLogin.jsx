import { ErrorMessage, Field, Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  FormErrorMessage,
  Stack,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { AuthContext } from '../../store/AuthProvider';
import { useContext } from 'react';

export default function FormLogin({ close }) {
  const toast = useToast();
  const { login } = useContext(AuthContext);
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please Provide Correct Email')
      .required('Email is Required'),
    password: Yup.string()
      .min(6, 'Password Must be at Least 6 Character')
      .required('Password is Required'),
  });

  const initialValues = {
    email: '',
    password: '',
  };

  const handleSubmit = async (values, actions) => {
    const { status, message } = await login(values);
    console.log(status);
    if (status != 200) {
      switch (status) {
        case 404:
          return toast({
            title: 'Login Failed!',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        case 401:
          return toast({
            title: 'Login Failed!',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        default:
          return toast({
            title: 'Something Wrong!',
            description: message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
      }
    }
    close();
    toast({
      title: 'Login Successfull!',
      description: message,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Stack spacing={3}>
            <Field name="email">
              {({ field }) => (
                <FormControl id="email" isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    {...field}
                    placeholder="Your Email"
                    focusBorderColor="teal.100"
                  />
                  <ErrorMessage
                    name="email"
                    component={FormErrorMessage}
                    color="red.500"
                  />
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field }) => (
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <Input
                    {...field}
                    type="password"
                    placeholder="Your Password"
                    focusBorderColor="teal.100"
                  />
                  <ErrorMessage
                    name="password"
                    component={FormErrorMessage}
                    color="red.500"
                  />
                </FormControl>
              )}
            </Field>
          </Stack>
          <Button
            w="100%"
            mt={4}
            bgColor="teal.300"
            color="white"
            isLoading={isSubmitting}
            type="submit"
            isDisabled={isSubmitting || !isValid || !dirty}
          >
            <Text fontWeight="bold" fontSize="lg">
              Login
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
