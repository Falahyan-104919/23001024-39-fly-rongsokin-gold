import { Button } from '@chakra-ui/react';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import ModalTransactionDetails from './ModalTransactionDetails';

const ActionButton = ({ status, id }) => {
  const [isOpen, setOpen] = useState(false);
  const handleModal = () => {
    return setOpen((state) => !state);
  };
  switch (status) {
    case 'cancel':
      return 'No Actions Needed';
    default:
      return (
        <>
          <Button colorScheme="gray" onClick={() => handleModal()}>
            <FontAwesomeIcon icon={faEye} style={{ marginRight: '8px' }} />
            See Details
          </Button>
          <ModalTransactionDetails
            open={isOpen}
            toggleOff={handleModal}
            id={id}
          />
        </>
      );
  }
};

export default ActionButton;
