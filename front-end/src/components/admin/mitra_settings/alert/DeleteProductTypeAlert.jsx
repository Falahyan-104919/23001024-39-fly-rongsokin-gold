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

export default function DeleteProductTypeAlert({
  product_type_id,
  open,
  toggleOff,
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ['product_type_mutation'],
    mutationFn: (values) => axiosInstance.put(`admin/product_type/${values}`),
    onSuccess: () => {
      toast({
        title: 'Success!',
        description: 'The product type has been deleted.',
        status: 'success',
        duration: 3000,
      });
      return queryClient.invalidateQueries('product_type');
    },
  });
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Mitra Type?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            {isLoading ? (
              <Button
                colorScheme="red"
                isLoading
                loadingText="Processing..."
                ml={3}
              >
                Delete Type
              </Button>
            ) : (
              <Button
                colorScheme="red"
                onClick={() => {
                  mutate(product_type_id);
                  return toggleOff();
                }}
                ml={3}
              >
                Delete Type
              </Button>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
