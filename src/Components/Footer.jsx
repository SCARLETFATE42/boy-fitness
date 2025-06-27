import { Box, Text } from '@mantine/core';
import Muscle from '../assets/Muscle.svg';
import React from 'react';

const Footer = () => {
  return (
    <Box
      className="
        !w-full 
        !bg-[#fff3f4] 
        !px-4 
        !py-8 
        !flex 
        !flex-col 
        !items-center 
        !text-center
        !mt-20
      "
    >
      <Box className="!flex !flex-col md:!flex-row !justify-center !items-center !gap-6 !mb-6">
        <img src={Muscle} alt="Muscle" className="!w-24 !h-24 !object-contain" />
        <Text className="!text-4xl md:!text-5xl !text-[#3A1212] !font-bold">Fітↁѓір</Text>
      </Box>

      <Text className="!text-2xl md:!text-3xl !font-bold !mb-2 !text-gray-700">
        Stay Fit, Stay Healthy!
      </Text>
      <Text className="!text-base md:!text-lg !font-bold !text-gray-700">
        Made with ❤️ React
      </Text>
      <Text className="!text-base md:!text-lg !font-bold !text-gray-700">
        © 2025 All rights reserved
      </Text>
      <Text className="!text-base md:!text-lg !font-bold !text-gray-700">
        Designed by{' '}
        <a href="https://portfolio-seven-psi-a1ngg80ta9.vercel.app/" className="text-blue-500 hover:underline">
          Michael Emediong
        </a>
      </Text>
    </Box>
  );
};

export default Footer;
