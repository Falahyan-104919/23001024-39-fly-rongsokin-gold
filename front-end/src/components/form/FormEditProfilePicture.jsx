import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import { Avatar, Button, Flex, Link, Text, useToast } from '@chakra-ui/react';
import axiosInstance from '../../utils/axios';

export default function FormEditProfilePicture() {
  const { user } = useContext(AuthContext);
  const image = user.imageId || 'user-placeholder.png';
  const [imagePreview, setImagePreview] = useState(image);
  const [uploadProfileImage, setUploadProfileImage] = useState({});
  const toast = useToast();

  const handleFileChange = (e) => {
    const reader = new FileReader();
    const selectedImage = e.target.files[0];
    reader.onloadend = () => {
      setUploadProfileImage(selectedImage);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selectedImage);
  };

  const submitHandle = async (image) => {
    const formData = new FormData();
    formData.append('profileImg', image, image.name);
    const response = await axiosInstance
      .put(`user/set_profile_image/${user.userId}`, formData)
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      });
    switch (response.status) {
      case 201:
        return toast({
          title: 'Success',
          description: `${response.message}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      default:
        return toast({
          title: 'Internal Server Error',
          description: `${response.message}`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
    }
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
        <Button size="xs" onClick={() => submitHandle(uploadProfileImage)}>
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
