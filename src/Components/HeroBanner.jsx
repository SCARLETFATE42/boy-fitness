import { Box, Text } from '@mantine/core';
import { Button } from '@mui/material';
import Shape from '../assets/Shape.jpg';
import React from 'react';

const HeroBanner = () => {
  return (
    <Box className="flex flex-col-reverse lg:!flex-row !items-center !justify-between mt-20 p-5 lg:!mt-[212px] lg:!ml-[50px] !relative">
      {/* Left Content */}
      <Box className="text-center lg:!text-left">
        <Text className="!text-[#FF2625] !font-semibold !text-[24px] sm:!text-[26px]">
          Fitness Club
        </Text>
        <Text className="!font-bold !text-[36px] sm:!text-[44px] !mb-4 !mt-6 sm:!mt-8">
          Sweat, Smile <br /> and Repeat
        </Text>
        <Text className="!text-[18px] sm:!text-[22px] !leading-8 sm:!leading-9 !mb-4">
          Check out the most Effective Exercises
        </Text>
        <Button
          variant="contained"
          component="a"
          href="#exercises"
          className="!text-white !bg-[#FF2625] hover:!bg-[#e31b1b] normal-case"
          sx={{ mt: 2 }}
        >
          Explore Exercises
        </Button>
        <Text className="!font-semibold !text-[#FF2625] !opacity-10 !text-[190px] sm:!text-[160px] lg:!text-[200px] hidden sm:!block">
          Exercises
        </Text>
      </Box>

      {/* Right Image */}
      <Box className="!mb-10 lg:!mb-0 lg:!mt-[-60px] !w-full lg:!w-1/2 !flex !justify-center">
        <img
          src={Shape}
          alt="Decorative shape"
          className="!rounded-bl-[20%] !w-[80%] sm:!w-[70%] lg:!w-full !max-w-[500px]"
        />
      </Box>
    </Box>
  );
};

export default HeroBanner;
