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

export default function SuperuserAlert({ userId, open, toggleOff }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isError, isPending, error, status, failureReason } =
    useMutation({
      mutationKey: ['superuser'],
      mutationFn: () => axiosInstance.put(`admin/turn_to_superuser/${userId}`),
      onMutate: () => {
        return console.log('mutating is in progress', status);
      },
      onSettled: () => {
        return console.log(status, failureReason);
      },
      onSuccess: () => {
        console.log('refetching is in progress');
        return queryClient.invalidateQueries('users');
      },
    });
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Turn User to Superuser?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            {isPending ? (
              <Button
                colorScheme="twitter"
                isLoading
                loadingText="Processing..."
                ml={3}
              >
                Turn User to Superuser
              </Button>
            ) : (
              <Button
                colorScheme="twitter"
                onClick={() => {
                  mutate(userId);
                  if (isError) {
                    console.error(error);
                    return toast({
                      title: 'Failed',
                      description: 'Turn User to Superuser is Failed',
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
                ml={3}
              >
                Turn User to Superuser
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
