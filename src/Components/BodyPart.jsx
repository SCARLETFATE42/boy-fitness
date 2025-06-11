import { Box, Text } from '@mantine/core';
import React from 'react';
import Baixar from '../assets/icons/Baixar.png';

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item;

  return (
    <Box
      className='!flex !flex-col !items-center !justify-center !p-4 !m-2 !transition-all !duration-300 !cursor-pointer !w-[240px] !h-[180px] sm:!w-[200px] sm:!h-[160px] !bg-white !rounded-xl hover:!shadow-lg'
      style={{
        borderTop: isSelected ? '4px solid #ff2625' : '4px solid transparent',
        borderColor: isSelected ? '#ff2625' : '#e0e0e0',
      }}
      onClick={() => typeof setBodyPart === 'function' && setBodyPart(item)}
    >
      <img
        src={Baixar}
        alt="Baixar"
        className="!w-[40px] !h-[40px] !mb-4"
        style={{ objectFit: 'contain' }}
      />
      <Text className='!text-lg !font-semibold !capitalize !text-center'>
        {item?.name || item}
      </Text>
    </Box>
  );
};

export default BodyPart;
