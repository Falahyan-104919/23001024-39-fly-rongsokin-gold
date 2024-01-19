import {
  Button,
  ButtonGroup,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useState } from 'react';
import DeleteForumCustomerAlert from './DeleteForumCustomerAlert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const ActionButton = ({ forumId }) => {
  const [openAlert, setOpenAlert] = useState(false);
  const handleOpenAlert = () => {
    setOpenAlert((prevAlert) => !prevAlert);
  };
  return (
    <>
      <ButtonGroup>
        <Button size="sm" colorScheme="red" onClick={handleOpenAlert}>
          <FontAwesomeIcon
            icon={faTrash}
            color="white"
            style={{ marginRight: '8px' }}
          />
          Delete Forum
        </Button>
      </ButtonGroup>
      <DeleteForumCustomerAlert
        open={openAlert}
        toggleOff={handleOpenAlert}
        forumId={forumId}
      />
    </>
  );
};

export default function TableForum({ forumList }) {
  const formattingTime = (datetime) => {
    const time = new Date(datetime).toLocaleString('id-ID', {
      year: '2-digit',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return time;
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Title</Th>
          <Th>Author</Th>
          <Th>Updated At</Th>
          <Th>Action Button</Th>
        </Tr>
      </Thead>
      <Tbody>
        {forumList.map((forum, index) => {
          const { forum_customers_id, title, fullname, updated_at } = forum;
          return (
            <Tr key={index}>
              <Td>{title}</Td>
              <Td>{fullname}</Td>
              <Td>{formattingTime(updated_at)}</Td>
              <Td>
                <ActionButton forumId={forum_customers_id} />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
}
