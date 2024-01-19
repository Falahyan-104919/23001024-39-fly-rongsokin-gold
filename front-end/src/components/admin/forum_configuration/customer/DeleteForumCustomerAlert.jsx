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
import axiosInstance from '../../../../utils/axios';

export default function DeleteForumCustomerAlert({ open, toggleOff, forumId }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['forum_customer_mutation'],
    mutationFn: (forumId) =>
      axiosInstance.put(`admin/deactivate_forum_customer/${forumId}`),
    onSuccess: () => {
      return queryClient.invalidateQueries('forum_customer');
    },
  });
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Forum Customer?
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
                loadingText="Processing..."
                ml={3}
              >
                Delete Product
              </Button>
            ) : (
              <Button
                colorScheme="red"
                onClick={() => {
                  mutate(forumId);
                  if (isError) {
                    return toast({
                      title: 'Failed Deleting Forum Customer',
                      status: 'error',
                      description: 'Something Wrong',
                      duration: 3000,
                    });
                  }
                  toast({
                    title: 'Success',
                    status: 'success',
                    description: 'Successfull Deleting Forum Customer',
                    duration: 3000,
                  });
                  toggleOff();
                }}
                ml={3}
              >
                Delete Product
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
