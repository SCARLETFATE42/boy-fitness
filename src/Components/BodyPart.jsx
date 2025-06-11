import { Box, Text } from '@mantine/core'
import React from 'react'
import Baixar from '../assets/icons/Baixar.png' // Assuming you have an image at this path

const BodyPart = ({ item, setBodyPart, bodyPart }) => {
  const isSelected = bodyPart === item
  return (
    <Box
      className='!flex !items-center !justify-center !p-2 !m-2'
      style={{
        borderTop: isSelected ? '4px solid #ff2625' : '2px solid #fff',
        // backgroundColor: '#fff',
        borderRadius: '16px',
        borderColor: isSelected ? '4px solid #ff2625' : '#000',
        cursor: 'pointer',
        width: '240px',
        height: '180px',
        transition: 'border 0.2s',
        // gap: '47px',
      }}
      onClick={() => (typeof setBodyPart === "function" ? setBodyPart(item) : null)}
    >
      <img
        src={Baixar}
        alt="Baixar"
        style={{
          width: 40,
          height: 40,
          objectFit: 'contain',
        }}
      />
      
    </Box>
  )
}

export default BodyPart
