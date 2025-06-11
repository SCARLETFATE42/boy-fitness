import React from 'react';
import { Box, Flex, Text } from '@mantine/core';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import Muscle from '../assets/Muscle.svg';

const Navbar = () => {
  return (
    <Box className="!w-full !px-4 !py-3 !flex flex-col sm:flex-row !items-center !justify-between">
      {/* Logo and Title */}
      <Link to="/" className="!flex !items-center !gap-2 !text-[#3A1212]">
        <img
          src={Muscle}
          alt="Flex Logo"
          className="!w-[40px] !h-[40px] !sm:w-[50px] !sm:h-[50px]"
        />
        <Text className="!text-3xl !sm:text-4xl !font-bold">Fітↁѓір</Text>
      </Link>

      {/* Navigation Links */}
      <Flex
        className="mt-4 sm:mt-0"
        gap="lg"
        justify="center"
        align="center"
        wrap="wrap"
      >
        <Button variant="text">
          <Link to="/" className="!text-[#3A1212] !border-b-4 !border-[#FF2625]">
            Home
          </Link>
        </Button>
        <Button variant="text">
          <a href="#exercises" className="!text-[#3A1212]">
            Exercises
          </a>
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
