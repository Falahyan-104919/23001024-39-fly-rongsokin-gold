import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { Avatar, Button, Flex, Link, Spacer, Text } from '@chakra-ui/react';

export default function FormEditProfilePicture() {
  const { user } = useContext(AuthContext);
  const image = user.imageId || 'user-placeholder.png';
  const [imagePreview, setImagePreview] = useState(image);

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const selectedImage = e.target.files[0];
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const submitHandle = (e) => {
    e.preventDefault();
  };

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      gap="5px"
      bgColor="white"
      m="10px"
      borderRadius="10px"
      boxShadow="base"
      p="15px"
    >
      <form onSubmit={submitHandle}>
        <Avatar alt={user.fullname} src={imagePreview} size="2xl" />
        <input
          id="fileInput"
          type="file"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
        <Button size="xs" type="submit">
          <Text fontSize="xs">Submit</Text>
        </Button>
      </form>
      <Link
        onClick={() => {
          document.getElementById('fileInput').click();
        }}
      >
        Upload New Image
      </Link>
    </Flex>
  );
}
