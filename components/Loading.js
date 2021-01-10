/** @format */

import { Flex, Text, Spinner } from '@chakra-ui/react';

const Loading = () => {
  return (
    <Flex
      justify="center"
      position="absolute"
      top="0"
      left="0"
      align="center"
      direction="column"
      w="100vw"
      h="calc(100vh - 90px)"
      zIndex="10"
      bg="white"
    >
      <Spinner thickness="10px" speed="0.65s" emptyColor="gray.200" color="teal.500" size="xl" />
      <Text pt="8" color="teal.500" fontWeight="bold">
        Loading...
      </Text>
    </Flex>
  );
};
export default Loading;
