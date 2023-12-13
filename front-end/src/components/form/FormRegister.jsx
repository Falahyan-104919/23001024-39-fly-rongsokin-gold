import {
  FormControl,
  Text,
  FormLabel,
  Button,
  Input,
  useToast,
  InputLeftAddon,
  InputGroup,
} from '@chakra-ui/react';
import { ErrorMessage, Form, Formik, Field } from 'formik';
import axiosInstance from '../../utils/axios';
import * as Yup from 'yup';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';

export default function FormRegister({ close }) {
  const { login } = useContext(AuthContext);
  const toast = useToast();
  const registerSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please Provide Correct Email')
      .required('Email is Required'),
    fullname: Yup.string()
      .min(4, 'Fullname need at least 4 Character')
      .required('Fullname is Required'),
    phoneNumber: Yup.number()
      .min(10, 'Phone Number Must be at least 10 Character')
      .required('Phone Number is Required'),
    password: Yup.string()
      .min(6, 'Password need at least 6 Character')
      .required('Password is Required'),
    passwordConf: Yup.string()
      .required('Password Confirmation is Requirements')
      .oneOf([Yup.ref('password'), null], 'Password must Match'),
  });

  const initialValues = {
    email: '',
    fullname: '',
    phoneNumber: '',
    password: '',
    passwordConf: '',
  };

  const register = async ({ email, fullname, phoneNumber, password }) => {
    const user = {
      email: '',
      password: '',
    };

    const regist = await axiosInstance
      .post('register', {
        email: email,
        fullname: fullname,
        phoneNumber: phoneNumber,
        password: password,
      })
      .then((res) => {
        user.email = email;
        user.password = password;
        return {
          data: res.data.message,
          status: res.status,
        };
      })
      .catch((err) => {
        return {
          status: err.response.status,
          data: err.response.data.message,
        };
      });

    if (regist.status == 201) {
      await login(user);
    }

    return regist;
  };

  const handleSubmit = async (values, actions) => {
    const res = await register(values);
    switch (res.status) {
      case 409:
        return toast({
          title: 'Failed to create Account.',
          description: res.data,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
      case 201:
        close();
        return toast({
          title: 'Account created.',
          description: res.data,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty, setFieldValue }) => (
        <Form autoComplete="off" autoCapitalize="words">
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
                <InputGroup>
                  <InputLeftAddon children="+62" />
                  <Input
                    {...field}
                    placeholder="Phone Number"
                    focusBorderColor="teal.100"
                    onChange={(e) => {
                      if (!isNaN(Number(e.target.value))) {
                        if (e.target.value == 0) {
                          setFieldValue('phoneNumber', '');
                        }
                        setFieldValue('phoneNumber', Number(e.target.value));
                      } else {
                        setFieldValue('phoneNumber', '');
                      }
                    }}
                  />
                </InputGroup>

                <ErrorMessage
                  name="phoneNumber"
                  component={Text}
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
                  placeholder="Password"
                  type="password"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="password"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="passwordConf">
            {({ field }) => (
              <FormControl id="passwordConf" isRequired>
                <FormLabel>Re-Type</FormLabel>
                <Input
                  {...field}
                  placeholder="Password Confirmation"
                  type="password"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="passwordConf"
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
