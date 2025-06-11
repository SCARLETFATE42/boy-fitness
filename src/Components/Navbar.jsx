import React from 'react'
import { Box, Flex } from '@mantine/core'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import  Muscle  from '../assets/Muscle.svg'


const Navbar = () => {
  return (
  <>
   <Box className='flex justify-center items-center m-auto p-4'>
   <Link to="/">
   <img src={Muscle} alt="Flex Logo" className='w-[8%] h-[8%] ml-5' />
   </Link>
       <Flex
      mih={50}
      // bg="rgba(0, 0, 0, .3)"
      gap="xl"
      justify="flex-start"
      align="flex-start"
      direction="row"
      wrap="wrap"
      // className='flex-row justify-start items-start gap-[xl]'
    >
  <Button><Link to="/" className="text-[#3A1212] border-b-4 border-b-[#FF2625]">Home</Link></Button>
  <Button><a href="#exercises" className="text-[#3A1212]">Exercises</a></Button>
</Flex>

   </Box>
  </>
  )
}

export default Navbar
