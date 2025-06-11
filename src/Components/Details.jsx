import { Text, Button, Box } from '@mantine/core';
import React from 'react';
import bodyPartImage from '../assets/icons/body-part.jpeg';
import targetImage from '../assets/icons/target.jpeg';
import equipmentImage from '../assets/icons/equipment.jpeg';

const Details = ({ exerciseDetail }) => {
  const { bodyPart, target, equipment, gifUrl, name } = exerciseDetail;
  const gifUrlFallback = 'https://via.placeholder.com/150';

  const extraDetail = [
    {
      icon: bodyPartImage,
      name: bodyPart,
    },
    {
      icon: targetImage,
      name: target,
    },
    {
      icon: equipmentImage,
      name: equipment,
    },
  ];

  return (
    <Box className="flex flex-col lg:flex-row justify-center items-center gap-12 px-4 py-10 overflow-x-auto">
      <img
        src={gifUrl || gifUrlFallback}
        alt={name}
        loading="lazy"
        className="w-full max-w-md object-contain rounded-lg"
      />

      <Box className="flex flex-col justify-center items-start gap-6 mt-8 lg:mt-0">
        <Text className="text-black capitalize text-3xl md:text-4xl font-bold">{name}</Text>

        <Text className="text-black text-base md:text-lg">
          Exercise keeps you fit and healthy. <span className="capitalize font-semibold">{name}</span> is a great way to stay in shape! It is a
          <Text component="span" className="font-bold"> {target}</Text> focused exercise that helps you stay fit.
        </Text>

        {extraDetail.map((item, index) => (
          <Box key={index} className="flex items-center gap-4 mt-4">
            <Button className="bg-[#fff2bd] p-3 rounded-full shadow-md hover:scale-105 transition">
              <img src={item.icon} alt={item.name} className="w-[40px] h-[40px] object-contain" />
            </Button>
            <Text className="text-black text-lg capitalize">{item.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Details;
