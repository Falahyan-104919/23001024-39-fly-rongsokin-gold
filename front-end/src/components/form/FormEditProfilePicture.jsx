import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import {
  Avatar,
  Button,
  Flex,
  Grid,
  GridItem,
  Link,
  Text,
  useToast,
} from '@chakra-ui/react';
import axiosInstance from '../../utils/axios';

export default function FormEditProfilePicture() {
  const { user, setProfilePic } = useContext(AuthContext);
  const image =
    user.profileImg == null || user.profileImg == undefined
      ? 'user-placeholder.png'
      : `http://localhost:8080/${user.profileImg}`;
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
        setProfilePic(response.image_path);
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
    <Grid
      h="250px"
      templateColumns="repeat(2, '1fr')"
      templateRows="repeat(2, '1fr')"
      gap={4}
      bgColor="white"
      p={4}
      m={2}
      borderRadius={10}
    >
      <GridItem colSpan={1} alignSelf="end" w="112%">
        <Flex justifyContent="end" alignItems="end">
          <Avatar alt={user.fullname} src={imagePreview} size="2xl" />
          <input
            id="fileInput"
            type="file"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </Flex>
      </GridItem>
      <GridItem colSpan={1}>
        <Flex justifyContent="end">
          {user.profileImg == null || user.profileImg == undefined ? (
            <Button
              size="xs"
              onClick={() => submitHandle(uploadProfileImage)}
              colorScheme="facebook"
              isDisabled={uploadProfileImage.name == undefined}
            >
              <Text fontSize="xs">Upload New Image</Text>
            </Button>
          ) : (
            <Button
              size="xs"
              onClick={() => submitHandle(uploadProfileImage)}
              colorScheme="teal"
              isDisabled={uploadProfileImage.name == undefined}
            >
              <Text fontSize="xs">Update New Image</Text>
            </Button>
          )}
        </Flex>
      </GridItem>
      <GridItem colSpan={2}>
        <Flex justifyContent="center">
          <Link
            onClick={() => {
              document.getElementById('fileInput').click();
            }}
          >
            Upload New Image
          </Link>
        </Flex>
      </GridItem>
    </Grid>
  );
}
