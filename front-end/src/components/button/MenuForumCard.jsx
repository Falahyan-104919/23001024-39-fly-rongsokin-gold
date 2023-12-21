import {
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HamburgerIcon, DeleteIcon } from '@chakra-ui/icons';

export default function MenuForumCard() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<HamburgerIcon />}
        variant="outline"
      />
      <MenuList>
        <MenuItem icon={<DeleteIcon />}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
