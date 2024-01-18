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

export default function SuperuserAlert({
  userId,
  open,
  toggleOff,
  handleSuperuser,
}) {
  const toast = useToast();
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
            {handleSuperuser.isLoading ? (
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
                  handleSuperuser.mutate(userId);
                  if (handleSuperuser.isError) {
                    return toast({
                      title: 'Failed',
                      description: 'Turning User to Superuser is Failed',
                      status: 'error',
                      duration: 3000,
                      isClosable: true,
                    });
                  }
                  toast({
                    title: 'Success',
                    description: 'Turning User to Superuser is Successfull',
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                  });
                  toggleOff();
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
