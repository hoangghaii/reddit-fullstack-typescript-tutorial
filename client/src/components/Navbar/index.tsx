import React from 'react';
import { Button, Box, Flex, Heading, Link, Text } from '@chakra-ui/react';
import DarkModeSwitch from 'components/DarkModeSwitch';
import NextLink from 'next/link';

type PropsType = {};

const Navbar = (props: PropsType) => {
  const textLink = 'Login';

  return (
    <Box boxShadow="sm" py={3} position="fixed" top={0} w="100%">
      <Flex
        maxW={800}
        justifyContent="space-between"
        alignItems="center"
        mx="auto"
      >
        <Heading bgGradient="linear(to-l, violet, pinkDark)" bgClip="text">
          Reddit
        </Heading>
        <NextLink href="/login">
          <Button colorScheme="orange" size="sm" variant="ghost">
            {textLink}
          </Button>
        </NextLink>
        {/* <Button>
          <Link>Register</Link>
        </Button>
        <Button>
          <Link>Logout</Link>
        </Button> */}
        <DarkModeSwitch />
      </Flex>
    </Box>
  );
};

export default Navbar;
