/** @format */

import { Box, Heading } from '@chakra-ui/react';
import { DataContext } from '@store/GlobalState';
import React, { useContext } from 'react';

function profile() {
  const { state } = useContext(DataContext);
  const { auth } = state;
  return (
    <Box>
      <Heading>{auth.user?.name}</Heading>
    </Box>
  );
}

export default profile;
