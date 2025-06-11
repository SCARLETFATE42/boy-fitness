import { Text, Button, Box } from '@mantine/core'
import React from 'react'
import bodyPartImage from '../assets/icons/body-part.jpeg'
import targetImage from '../assets/icons/target.jpeg'
import equipmentImage from '../assets/icons/equipment.jpeg'

const Details = ( { exerciseDetail } ) => {
    const { bodyPart, target, equipment, gifUrl, name } = exerciseDetail;
    const gifUrlFallback = 'https://via.placeholder.com/150'; // Fallback URL for the GIF
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
        }
    ]

  return (
   <>
   <Box className='flex justify-center items-center gap-64 p-5 overflow-x-auto'>
        <img src={gifUrl || gifUrlFallback} alt={name} loading='lazy' className='' />
        <Box className='flex flex-col justify-center gap-6 items-start p-5'>
          <Text className='text-black capitalize text-3xl font-bold'>{name}</Text>
          <Text className='text-black text-xl mt-8'>Exercise keeps you fit and healthy. {name} is a great way to stay in shape! It is a
        <Text component="span" className='font-bold'> {target}</Text> focused exercise that helps you stay fit.</Text>
          {extraDetail.map((item, index) => (
            <Box key={index} className='flex items-center gap-2 mt-8'>
              <Button className='flex items-center justify-center p-2 bg-[#fff2bd] rounded-full'>
                <img src={item.icon} alt={item.name} className='w-[50px] h-[50px] object-contain' />
              </Button>
              <Text className='text-black text-xl capitalize'>{item.name}</Text>
            </Box>
          ))}
        </Box>
   </Box>
   </>
  )
}

export default Details
