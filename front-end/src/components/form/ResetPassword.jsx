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
import { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { useParams } from 'react-router-dom';

export default function ResetPassword() {
  const { token } = useParams();
  const [isChanged, setChange] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordValid, setPasswordValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const toast = useToast();

  const mutation = useMutation({
    mutationKey: ['reset_password'],
    mutationFn: (newPassword) => {
      axiosInstance.post(`reset_password/${token}`, { password: newPassword });
    },
    onSuccess: () => {
      setLoading(false);
      setChange(true);
      toast({
        title: 'Success',
        description: 'Password reset successfully.',
        status: 'success',
        duration: 3000,
      });
    },
    onError: (error) => {
      setLoading(false);
      setErrorMessage(error.message);
      toast({
        title: 'Error',
        description: error.message,
        status: 'error',
        duration: 3000,
      });
    },
  });

  useEffect(() => {
    validatePassword(confirmPassword);
  }, [password, confirmPassword]);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (passConf) => {
    if (passConf === password) {
      setErrorMessage('');
      setPasswordValid(true);
    } else {
      setErrorMessage('Passwords must match');
      setPasswordValid(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isPasswordValid) {
      setLoading(true);
      mutation.mutate(password);
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100%">
      <Flex flexDir="column" width="60%">
        <Box>
          <Text fontWeight="bold" fontSize="2xl" color="blackAlpha.900">
            Reset Password
          </Text>
          <Text fontWeight="bold" fontSize="xl" color="blackAlpha.700">
            Enter your new password
          </Text>
        </Box>
        {isChanged ? (
          <Box mt="4">
            <Text fontWeight="bold" fontSize="xl">
              Password reset successfully. Return home and re-login.
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
              type="password"
              placeholder="New Password"
              value={password}
              onChange={handlePasswordChange}
              focusBorderColor="cyan.300"
            />
            <Input
              bgColor="whiteAlpha.800"
              width="85%"
              height="50px"
              mt="5"
              type="password"
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              focusBorderColor="cyan.300"
            />
            <Text alignSelf="end" mr="20" color="red.500">
              {errorMessage}
            </Text>
            <Box alignSelf="start">
              <Button
                mt="5"
                onClick={handleSubmit}
                color="white"
                bgColor="cyan.700"
                isDisabled={!isPasswordValid}
              >
                Reset Password
              </Button>
            </Box>
          </>
        )}
      </Flex>
    </Flex>
  );
}
