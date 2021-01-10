/** @format */

import React from 'react';
import NextLink from 'next/link';
import { Link, ListItem } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

function NavbarItem({ children, route, close }) {
  const router = useRouter();
  const bg = 'teal.400';
  const isActive = (r) => {
    return r === router.pathname;
  };
  return (
    <NextLink href={route}>
      <ListItem
        onClick={close}
        _hover={{ background: bg }}
        _active={{ background: bg }}
        _focus={{ background: bg }}
        color={isActive(route) ? 'teal.100' : 'white'}
        py="2"
        px="4"
        borderRadius={{ base: '0', md: 'sm' }}
        cursor="pointer"
        fontWeight="bold"
      >
        <Link display="flex" justify="center" align="center" className="react-icons-container">
          {children}
        </Link>
      </ListItem>
    </NextLink>
  );
}

export default NavbarItem;
