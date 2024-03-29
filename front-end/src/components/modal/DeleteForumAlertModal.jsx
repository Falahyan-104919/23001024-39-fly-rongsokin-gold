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
import axiosInstance from '../../utils/axios';
import { focusManager } from '@tanstack/react-query';

export default function DeleteForumAlert({ forumId, open, toggleOff }) {
  const toast = useToast();
  const handleDeleteProducts = async (id) => {
    focusManager.setFocused(false);
    await axiosInstance
      .delete(`forum/${id}`)
      .then((res) => {
        if (res.status == 203) {
          return toast({
            title: 'Forum Successfull Delete',
            description: res.data.message,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        }
      })
      .catch((err) => {
        return toast({
          title: 'Forum Failed to Delete',
          description: err.response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };
  return (
    <AlertDialog isOpen={open} onClose={toggleOff}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Forum ?
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={toggleOff}>Cancel</Button>
            <Button
              colorScheme="red"
              onClick={() => {
                handleDeleteProducts(forumId);
                focusManager.setFocused(true);
                toggleOff();
              }}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}
