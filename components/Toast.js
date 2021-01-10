/** @format */

import { Box, Heading, Divider, CloseButton, Flex, Text } from '@chakra-ui/react';

const Toast = ({ msg, handleShow, bgColor }) => {
  return (
    <Box
      zIndex="1"
      color="white"
      position="absolute"
      top="4"
      right="4"
      bg={bgColor}
      borderRadius="sm"
      w="150px"
      onClick={handleShow}
    >
      <Flex justify="space-between" align="center" px="3" pt="2" pb="1">
        <Heading as="h4" size="xs">
          {msg.title}
        </Heading>
        <CloseButton />
      </Flex>
      <Divider />
      <Text fontSize="xs" px="3" pt="1" pb="2">
        {msg.msg}
      </Text>
    </Box>
  );
};
export default Toast;
