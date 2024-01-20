import {
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import DeleteForumMitraAlert from './DeleteForumMitraAlert';

const ActionButton = ({ forum_id }) => {
  const [isAlertOpen, setAlertOpen] = useState(false);
  const handleSetAlertOpen = () => {
    setAlertOpen((prevAlert) => !prevAlert);
  };
  return (
    <>
      <ButtonGroup>
        <Button colorScheme="red" size="sm" onClick={handleSetAlertOpen}>
          <FontAwesomeIcon
            icon={faTrash}
            color="white"
            style={{ marginRight: '8px' }}
          />
          Delete Forum
        </Button>
      </ButtonGroup>
      <DeleteForumMitraAlert
        open={isAlertOpen}
        toggleOff={handleSetAlertOpen}
        forumId={forum_id}
      />
    </>
  );
};

export default function TableForum({ list }) {
  const formattingDate = (datetime) => {
    const date = new Date(datetime).toLocaleString('id-ID', {
      year: '2-digit',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
    return date;
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Author</Th>
          <Th>Posted At</Th>
          <Th>Action Button</Th>
        </Tr>
      </Thead>
      <Tbody>
        {list.map((forum) => {
          const { forum_mitra_id, title, fullname, updated_at } = forum;
          return (
            <Tr key={forum_mitra_id}>
              <Td>{title}</Td>
              <Td>{fullname}</Td>
              <Td>{formattingDate(updated_at)}</Td>
              <Td>
                <ActionButton forum_id={forum_mitra_id} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
