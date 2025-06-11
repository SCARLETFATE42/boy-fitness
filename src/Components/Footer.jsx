import { Box, Text } from '@mantine/core'
import Muscle from '../assets/Muscle.svg'
import React from 'react'

const Footer = () => {
  return (
    <>
      <Box className='Footer mt-20 p-6 flex flex-col justify-center items-center bg-[#fff3f4] text-white text-center absolute bottom-0 w-full'>
        <Box className='text-center text-gray-700 gap-10'>
          <Box className='!flex !justify-center !items-center !mb-4 !pb-10'>
            <img src={Muscle} alt="Muscle" className='w-[100px] h-24 object-contain' />
            <Text className='!mt-7 !text-5xl !text-center !text-[#3A1212] !font-bold'>Fітↁѓір</Text>
          </Box>
          <Text className='!text-3xl !font-bold !mb-2'>Stay Fit, Stay Healthy!</Text>
          <Text className='!text-lg !font-bold'>Made with ❤️ React</Text>
          <Text className='!text-lg !font-bold'>© 2025 All rights reserved</Text>
          <Text className='!text-lg !font-bold'>Designed by <a href="https://yourwebsite.com" className='!text-blue-500'>Michael Emediong</a></Text>
        </Box>
      </Box>
    </>
  )
}

export default Footer
