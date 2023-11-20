import {
  Box,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import AuthModal from './modal/AuthModal';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../store/AuthProvider';
import LogoutButton from './button/LogoutButton';

export default function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  let [searchParams, setSearchParams] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`search?name=${searchParams}`);
    return setSearchParams('');
  };

  return (
    <Flex as="nav" bg={'teal.600'} alignItems="center" p="5px">
      <Link to="/">
        <Image
          ml="25px"
          w="150px"
          h="50px"
          objectFit="cover"
          src="/logo-home.svg"
        />
      </Link>
      <Spacer />
      <HStack>
        <form onSubmit={handleSubmit}>
          <Box bgColor={'whitesmoke'} borderRadius={10}>
            <InputGroup alignContent={'center'}>
              <InputLeftElement pointerEvents="none" pb={2} pr={1}>
                <FontAwesomeIcon icon={faMagnifyingGlass} color="gray" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Search Product"
                size={'sm'}
                borderRadius={10}
                value={searchParams}
                name="search_params"
                onChange={(e) => {
                  setSearchParams((prevData) => {
                    setSearchParams(e.target.value);
                  });
                }}
              />
            </InputGroup>
          </Box>
        </form>
        {isLoggedIn ? <LogoutButton /> : <AuthModal />}
      </HStack>
    </Flex>
  );
}
