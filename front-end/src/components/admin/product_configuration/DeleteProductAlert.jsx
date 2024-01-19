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
import axiosInstance from '../../../utils/axios';

export default function DeleteProductAlert({ productId, open, toggleOff }) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending, isError } = useMutation({
    mutationKey: ['product_mutate'],
    mutationFn: (productId) =>
      axiosInstance.put(`admin/deactivate_product/${productId}`),
    onSuccess: () => {
      return queryClient.invalidateQueries('products');
    },
  });
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Product?
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
                  mutate(productId);
                  if (isError) {
                    return toast({
                      title: 'Failed',
                      description: "Couldn't delete the user.",
                      status: 'error',
                      duration: 3000,
                    });
                  }
                  toast({
                    title: 'Deleted',
                    description: `User was successfully deleted.`,
                    status: 'success',
                    duration: 5000,
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
