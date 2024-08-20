import {
  Box,
  Button,
  Flex,
  Input,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import axiosInstance from '../../utils/axios';

export default function ForgotPassword() {
  const [isSent, setSent] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailValid, setEmailValid] = useState(true);

  const toast = useToast();

  const { mutate } = useMutation({
    mutationKey: ['send_reset_link'],
    mutationFn: (value) => {
      console.log('mutation running');
      setLoading(true);
      return axiosInstance.post('forgot_password', { email: value });
    },
    onSuccess: () => {
      setLoading(false);
      setSent(true);
      return toast({
        title: 'Successfull',
        description: 'Successfully Sent Reset Password Link',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      setLoading(false);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    },
  });

  const validateEmail = (str) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(str);
  };

  const handlEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailValid(validateEmail(e.target.value));
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Flex flexDir="column" width="60%" alignItems="center">
        <Box>
          <Text fontWeight="bold" fontSize="2xl" color="blackAlpha.900">
            Forgotten Password ?
          </Text>
          <Text fontWeight="bold" fontSize="xl" color="blackAlpha.700">
            Enter your email to reset your password
          </Text>
        </Box>
        {isSent ? (
          <Box ml="9" mt="4">
            <Text fontWeight="bold" fontSize="xl">
              Password Reset Link Successfully Sended to Your Email. Please
              Kindly Check Your Email
            </Text>
          </Box>
        ) : isLoading ? (
          <Spinner
            mt="5"
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="cyan.500"
            size="xl"
          />
        ) : (
          <>
            <Input
              bgColor="whiteAlpha.800"
              width="85%"
              height="50px"
              mt="5"
              placeholder="Email"
              value={email}
              onChange={handlEmailChange}
              focusBorderColor="cyan.300"
            />
            {!isEmailValid ? (
              <Text
                alignSelf="end"
                mr="9"
                mt="2"
                color="red.500"
                fontWeight="semibold"
              >
                Email is Invalid
              </Text>
            ) : null}
            <Box alignSelf="start" ml="9">
              <Button
                mt="5"
                onClick={() => {
                  console.log('click');
                  return mutate(email);
                }}
                color="white"
                bgColor="cyan.700"
                isDisabled={!isEmailValid || email == ''}
              >
                Send Password Reset Link
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
