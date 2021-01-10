/** @format */
import {
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { FaChevronDown, FaDoorOpen, FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import React, { useEffect, useState, useContext } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { DataContext } from '@store/GlobalState';
import NavbarItem from './NavbarItem';
import DropDownItem from './DropDownItem';

function Navbar({ transparent }) {
  const { state, dispatch } = useContext(DataContext);
  const { auth } = state;
  const router = useRouter();
  const [navbar, setNavbar] = useState(false);
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);
  const handleToggle = () => setClick(!click);

  useEffect(() => {
    const changeBackground = () => {
      if (window.scrollY >= 100) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };
    window.addEventListener('scroll', changeBackground);
    return () => {
      window.removeEventListener('scroll', changeBackground);
    };
  }, []);

  const loggedRouter = ({ auth }) => {
    return (
      <ListItem cursor="pointer">
        <Menu background="gray.900">
          <MenuButton
            fontWeight="bold"
            _hover={{ background: 'teal.400' }}
            py="2"
            px="4"
            borderRadius={{ base: '0', md: 'sm' }}
          >
            <Flex justify="center" align="center">
              <Image src={auth.user.avatar} w="28px" borderRadius="full" />
              <Text mx="4" textTransform="capitalize">
                {auth.user.name}
              </Text>
              <FaChevronDown />
            </Flex>
          </MenuButton>
          <MenuList background="gray.900">
            <DropDownItem route="/profile">
              Profile <FaUser />
            </DropDownItem>
            <DropDownItem route="/logout">
              Logout <FaDoorOpen />
            </DropDownItem>
          </MenuList>
        </Menu>
      </ListItem>
    );
  };
  return (
    <>
      <Flex
        as="nav"
        position="fixed"
        top="0"
        left="0"
        color={navbar ? 'gray.100' : 'white'}
        bgColor={{
          base: transparent
            ? navbar
              ? 'gray.900'
              : click
              ? 'gray.900'
              : 'transparent'
            : 'gray.900',
        }}
        bgGradient={transparent ? (navbar ? 'gray.500' : 'linear(to-b, black, transparent)') : ''}
        h={navbar ? '80px' : '80px'}
        w="100%"
        zIndex="200"
        justify="space-between"
        align="center"
        transition="ease-in height 0.3s"
        p="8"
        textTransform="capitalize"
      >
        <NextLink href="/">
          <Heading size="md" cursor="pointer">
            Devugur Store
          </Heading>
        </NextLink>
        <List
          flexDirection={{ base: 'column', md: 'row' }}
          align="end"
          transition="ease-in 0.3s all"
          display={{ base: click ? 'flex' : 'none', md: 'flex' }}
          position={{ base: 'absolute', md: 'relative' }}
          top="0"
          right="0"
          py={{ base: '100px', md: '0' }}
          bgColor={{ base: navbar ? 'gray.900' : click ? 'gray.900' : 'transparent' }}
          w={{ base: '100vw', md: 'auto' }}
          justify="center"
          align="center"
          transition="all ease 0.1s"
        >
          <NavbarItem route="/" close={closeMobileMenu}>
            Home <FaHome />
          </NavbarItem>
          <NavbarItem route="/cart" close={closeMobileMenu}>
            Cart <FaShoppingCart />
          </NavbarItem>

          {Object.keys(auth).length === 0 ? (
            <>
              <NavbarItem route="/signin" close={closeMobileMenu}>
                Sign In
              </NavbarItem>
              <NavbarItem route="/register" close={closeMobileMenu}>
                Register
              </NavbarItem>
            </>
          ) : (
            loggedRouter({ auth })
          )}
        </List>
        {!click ? (
          <Image
            src="/square-white.svg"
            h="32px"
            onClick={handleToggle}
            className="navbar-btn"
            display={{ base: 'block', md: 'none' }}
            zIndex="100"
            cursor="pointer"
          />
        ) : (
          <Image
            cursor="pointer"
            src="/close-white.svg"
            h="32px"
            onClick={handleToggle}
            className="navbar-btn"
            display={{ base: 'block', md: 'none' }}
            zIndex="100"
          />
        )}
      </Flex>
    </>
  );
}

export default Navbar;
