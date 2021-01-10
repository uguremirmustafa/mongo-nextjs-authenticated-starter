/** @format */

import React, { useContext } from 'react';
import { MenuItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Cookie from 'js-cookie';
import { DataContext } from '@store/GlobalState';

function DropDownItem({ children, route }) {
  const { state, dispatch } = useContext(DataContext);
  const router = useRouter();
  const bg = 'teal.400';
  const isActive = (r) => {
    return r === router.pathname;
  };
  const handleLogout = () => {
    router.push('/');
    Cookie.remove('refreshtoken', { path: 'api/auth/accessToken' });
    localStorage.removeItem('firstLogin');
    dispatch({ type: 'AUTH', payload: {} });
    dispatch({ type: 'NOTIFY', payload: { success: 'Logged out!' } });
  };
  return (
    <NextLink href={route && route !== '/logout' ? route : ''}>
      <MenuItem
        background="gray.900"
        _hover={{ background: bg }}
        _active={{ background: bg }}
        _focus={{ background: bg }}
        fontWeight="bold"
        className="react-icons-container"
        color={isActive(route) ? 'teal.100' : 'white'}
        onClick={route === '/logout' && handleLogout}
      >
        {children}
      </MenuItem>
    </NextLink>
  );
}

export default DropDownItem;
