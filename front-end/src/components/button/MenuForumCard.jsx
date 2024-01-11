import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon } from '@chakra-ui/icons';
import DeleteForumAlert from '../modal/DeleteForumAlertModal';
import { useState } from 'react';
import { focusManager } from '@tanstack/react-query';

export default function MenuForumCard({ forum_id }) {
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenDeleteAlert = () => {
    setOpenAlert(true);
  };
  const handleCloseDeleteAlert = () => {
    setOpenAlert(false);
  };
  return (
    <>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          variant="outline"
        />
        <MenuList>
          <MenuItem icon={<DeleteIcon />} onClick={handleOpenDeleteAlert}>
            Delete
          </MenuItem>
        </MenuList>
      </Menu>
      <DeleteForumAlert
        open={openAlert}
        toggleOff={() => {
          focusManager.setFocused(true);
          handleCloseDeleteAlert();
        }}
        forumId={forum_id}
      />
    </>
  );
}
