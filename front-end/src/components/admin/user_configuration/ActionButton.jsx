import { Button, ButtonGroup } from '@chakra-ui/react';
import { faUserSecret, faUserSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DeactivateUserAlert from '../../modal/DeactivateUserAlert';
import SuperuserAlert from '../../modal/SuperuserAlert';

export default function ActionButton({
  id,
  role,
  handleDeactivate,
  handleSuperUser,
}) {
  const [isDeactivateAlertOpen, setIsDeactivateAlertOpen] = useState(false);
  const [isSuperuserAlertOpen, setSuperuserAlertOpen] = useState(false);
  const handleOpenDeactivateAlert = () => {
    return setIsDeactivateAlertOpen(true);
  };
  const handleOpenSuperuserAlert = () => {
    setSuperuserAlertOpen(true);
  };
  const handleCloseDeactivateAlert = () => {
    setIsDeactivateAlertOpen(false);
  };
  const handleCloseSuperuserAlert = () => {
    setSuperuserAlertOpen(false);
  };
  switch (role) {
    case 'admin':
      return (
        <>
          <DeactivateButton toggleOnAlert={handleOpenDeactivateAlert} />
          <DeactivateUserAlert
            userId={id}
            open={isDeactivateAlertOpen}
            toggleOff={handleCloseDeactivateAlert}
            handleDeactivate={handleDeactivate}
          />
        </>
      );
    default:
      return (
        <>
          <ButtonGroup size="sm" variant="solid">
            <DeactivateButton toggleOnAlert={handleOpenDeactivateAlert} />
            <Button
              colorScheme="twitter"
              onClick={() => handleOpenSuperuserAlert()}
            >
              <FontAwesomeIcon
                icon={faUserSecret}
                style={{ marginRight: '8px' }}
              />
              Turn to Superuser
            </Button>
          </ButtonGroup>
          <DeactivateUserAlert
            userId={id}
            open={isDeactivateAlertOpen}
            toggleOff={handleCloseDeactivateAlert}
            handleDeactivate={handleDeactivate}
          />
          <SuperuserAlert
            userId={id}
            open={isSuperuserAlertOpen}
            toggleOff={handleCloseSuperuserAlert}
            handleSuperuser={handleSuperUser}
          />
        </>
      );
  }
}

const DeactivateButton = ({ toggleOnAlert }) => {
  return (
    <Button size="sm" onClick={() => toggleOnAlert()} colorScheme="red">
      <FontAwesomeIcon icon={faUserSlash} style={{ marginRight: '8px' }} />
      Deactivate
    </Button>
  );
};
