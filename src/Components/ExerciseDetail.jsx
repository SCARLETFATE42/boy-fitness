import React from 'react';
import { Box, Text } from '@mantine/core';

const Exercisedetail = ({ exercise }) => {
  if (!exercise) return null;

  return (
    <Box className="py-5">
      <Text className="!text-2xl md:!text-3xl !font-semibold !text-[#ff2625] !mb-6 capitalize">
        {exercise.name}
      </Text>

      <Box className="space-y-4">
        <Text className="text-base md:text-lg text-gray-800">
          <strong>Body Part:</strong> {exercise.bodyPart}
        </Text>
        <Text className="text-base md:text-lg text-gray-800">
          <strong>Target:</strong> {exercise.target}
        </Text>
        <Text className="text-base md:text-lg text-gray-800">
          <strong>Equipment:</strong> {exercise.equipment}
        </Text>
      </Box>
    </Box>
  );
};

export default Exercisedetail;
