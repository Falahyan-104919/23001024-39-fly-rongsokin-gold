import * as Yup from 'yup';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import {
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import axiosInstance from '../../utils/axios';

export default function FormChangePassword() {
  const { user } = useContext(AuthContext);
  const toast = useToast();
  const initialValues = {
    oldPassword: '',
    newPassword: '',
    newPasswordConf: '',
  };

  const passwordSchema = Yup.object().shape({
    oldPassword: Yup.string()
      .min(6, 'Old Password need at least 6 Character')
      .required('Old Password is Required'),
    newPassword: Yup.string()
      .min(6, 'New Password need at least 6 Character')
      .required('New Password is Required'),
    newPasswordConf: Yup.string()
      .required('Password Confirmation is Requirements')
      .oneOf(
        [Yup.ref('newPassword'), null],
        'Password Confirmation must Match with New Password'
      ),
  });

  const putPassword = async ({ oldPassword, newPassword }) => {
    const res = await axiosInstance
      .put(`user/change_password/${user.userId}`, {
        oldPassword: oldPassword,
        newPassword: newPassword,
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
    return res;
  };

  const handleSubmit = async (values, actions) => {
    const response = await putPassword(values);
    switch (response.status) {
      case 201:
        toast({
          title: 'Password Changed.',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        return actions.resetForm();
      case 401:
        toast({
          title: 'Password Change Failed.',
          description: response.message,
          status: 'warning',
          duration: 3000,
          isClosable: true,
        });
        return null;
      default:
        toast({
          title: 'Something Wrong',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return null;
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={passwordSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, isValid, dirty }) => (
        <Form autoComplete="off">
          <Field name="oldPassword">
            {({ field }) => (
              <FormControl id="oldPassword" isRequired>
                <FormLabel>Old Password</FormLabel>
                <Input
                  {...field}
                  placeholder="Old Password"
                  type="password"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="oldPassword"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="newPassword">
            {({ field }) => (
              <FormControl id="newPassword" isRequired>
                <FormLabel>New Password</FormLabel>
                <Input
                  {...field}
                  placeholder="New Password"
                  type="password"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="newPassword"
                  component={Text}
                  color="red.500"
                />
              </FormControl>
            )}
          </Field>
          <Field name="newPasswordConf">
            {({ field }) => (
              <FormControl id="newPasswordConf" isRequired>
                <FormLabel>New Password Confirmation</FormLabel>
                <Input
                  {...field}
                  placeholder="New Password Confirmation"
                  type="password"
                  focusBorderColor="teal.100"
                />
                <ErrorMessage
                  name="newPasswordConf"
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
              Change Password
            </Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
}
