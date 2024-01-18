import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../utils/axios';

export default function DeactivateUserAlert({ userId, open, toggleOff }) {
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, error, status } = useMutation({
    mutationKey: ['deactive'],
    mutationFn: (userId) =>
      axiosInstance.put(`admin/deactivate_user/${userId}`),
    onMutate: () => {
      return console.log('mutating is in progress', status);
    },
    onSettled: () => {
      return console.log(status);
    },
    onSuccess: () => {
      console.log('refetching the data');
      return queryClient.invalidateQueries('users');
    },
  });
  const toast = useToast();
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Deactivate User ?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            {isPending ? (
              <Button
                colorScheme="red"
                isLoading
                loadingText="Deactivating..."
                ml={3}
              >
                Deactivate
              </Button>
            ) : (
              <Button
                colorScheme="red"
                ml={3}
                onClick={() => {
                  mutate(userId);
                  if (isError) {
                    console.error(error);
                    return toast({
                      title: 'Failed',
                      description: 'Deactivating User is Failed',
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                  toast({
                    title: 'Success',
                    description: 'Deactivating User is Successful',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  return toggleOff();
                }}
              >
                Deactivate
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
