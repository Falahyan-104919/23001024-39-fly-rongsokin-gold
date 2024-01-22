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

export default function DeleteMitraTypeAlert({
  mitra_type_id,
  open,
  toggleOff,
}) {
  const toast = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationKey: ['mitra_type_mutation'],
    mutationFn: (values) => axiosInstance.put(`mitra_type/${values}`),
    onSuccess: () => {
      toast({
        title: 'Successfull',
        description: 'Successfully Delete Mitra Type',
        status: 'success',
        duration: 3000,
      });
      return queryClient.invalidateQueries([
        'mitra_type_list',
        'product_mitra_type',
      ]);
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
            {isPending ? (
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
                  mutate(mitra_type_id);
                  toggleOff();
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
