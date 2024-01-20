import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Image,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import * as Yup from 'yup';
import { AttachmentIcon, SmallCloseIcon } from '@chakra-ui/icons';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from '../../store/AuthProvider';
import axiosInstance from '../../utils/axios';
import { focusManager } from '@tanstack/react-query';

export default function FormForumMitra() {
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState({});
  const toast = useToast();
  const initialValues = {
    forumTitle: '',
    forumTopic: '',
    forumImage: '',
  };

  const validationSchema = Yup.object().shape({
    forumTitle: Yup.string().required('Title Forum is Required'),
    forumTopic: Yup.string().required('Topic Forumis Required'),
  });

  const formData = new FormData();

  const postForumMitra = async ({ forumTitle, forumTopic }, images) => {
    formData.append('title', forumTitle);
    formData.append('content', forumTopic);
    if ('name' in images) {
      formData.append('forumMitraImg', images, images.name);
    }
    const response = await axiosInstance
      .post(`mitra/forum/${user.mitraId}`, formData)
      .then((res) => {
        return {
          status: res.status,
          message: res.data.message,
        };
      })
      .catch((err) => {
        return {
          status: err.response.status,
          message: err.response.data.message,
        };
      });
    return response;
  };

  const onSubmit = async (values, { resetForm }) => {
    focusManager.setFocused(false);
    const response = await postForumMitra(values, images);
    switch (response.status) {
      case 201:
        toast({
          title: 'Post Successfull',
          description: response.message,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        resetFormData(formData);
        setImages({});
        resetForm();
        return focusManager.setFocused(true);
      default:
        return toast({
          title: 'Something Wrong!',
          description: response.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
    }
  };

  const resetFormData = (formData) => {
    for (var key of formData.keys()) {
      formData.delete(key);
    }
  };

  return (
    <Box m="10px" bgColor="whiteAlpha.500" p="10px" borderRadius="10px">
      <Text mb="15px" ml="5px" fontWeight="bold" fontSize="larger" color="teal">
        Post To Forum Mitra
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, isValid, dirty, values, setFieldValue }) => (
          <Form>
            <Stack spacing={3}>
              <Field name="forumTitle">
                {({ field }) => (
                  <FormControl id="forumTitle" isRequired>
                    <FormLabel ml="10px">Forum Title</FormLabel>
                    <Input
                      {...field}
                      placeholder="Forum Title"
                      type="text"
                      focusBorderColor="teal.100"
                      bgColor="white"
                    />
                    <ErrorMessage
                      ml="2px"
                      name="forumTitle"
                      component={Text}
                      color="red.500"
                    />
                  </FormControl>
                )}
              </Field>
              <Field name="forumTopic">
                {({ field }) => (
                  <FormControl id="forumTopic" isRequired>
                    <FormLabel ml="10px">Forum Topic</FormLabel>
                    <Textarea
                      {...field}
                      placeholder="Enter your text here..."
                      bgColor="white"
                    />
                    <ErrorMessage
                      name="forumTopic"
                      component={Text}
                      color="red"
                      ml="2px"
                    />
                  </FormControl>
                )}
              </Field>
              <Flex>
                {values.forumImage !== '' ? (
                  <Box m="10px">
                    <Flex>
                      <Image
                        src={values.forumImage}
                        alt={`attached_image_${values.forumImage}`}
                        boxSize="150px"
                        objectFit="cover"
                      />
                      <IconButton
                        size="xs"
                        icon={<SmallCloseIcon />}
                        onClick={() => {
                          const updatedImages = '';
                          setImages({});
                          setFieldValue('forumImage', updatedImages);
                        }}
                      />
                    </Flex>
                  </Box>
                ) : null}
                <Spacer />
                <Field type="file" name="forumImage" multiple>
                  {({ field: { value, ...field } }) => (
                    <Box>
                      <input
                        type="file"
                        style={{ display: 'none' }}
                        id="forumImage"
                        {...field}
                        onChange={(e) => {
                          const files = e.target.files[0];
                          setImages(files);
                          const displayImage = URL.createObjectURL(files);
                          setFieldValue('forumImage', displayImage);
                        }}
                        disabled={value ? value.length === 1 : false}
                      />
                      <label htmlFor="forumImage">
                        <IconButton
                          as="span"
                          icon={<AttachmentIcon />}
                          aria-label="Attach"
                          isDisabled={value ? value.length === 1 : false}
                        />
                      </label>
                    </Box>
                  )}
                </Field>
                <Button
                  colorScheme="teal"
                  ml="15px"
                  isLoading={isSubmitting}
                  type="submit"
                  isDisabled={isSubmitting || !isValid || !dirty}
                >
                  Submit
                </Button>
              </Flex>
            </Stack>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
