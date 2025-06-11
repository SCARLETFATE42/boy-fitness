import { Box, Text} from '@mantine/core'
import { Button } from '@mui/material'
import Shape from '../assets/Shape.jpg'
import React from 'react'

const HeroBanner = () => {
  return (
   <>
<Box className="flex items-center justify-center mt-[212px] ml-[50px] p-5 relative">
      <Box>
        <Text className="text-[#FF2625] font-semibold text-[26px]">
          Fitness Club
        </Text>
        <Text className="font-bold text-[44px] mb-6 mt-8">
          Sweat, Smile <br /> and Repeat
        </Text>
        <Text className="text-[22px] leading-9 mb-4">
          Check out the most Effective Exercises
        </Text>
        <Button
          variant="filled"
          color="red"
          component="a"
          href="#exercises"
          className="text-white bg-[#FF2625] hover:bg-[#e31b1b]"
        >
          Explore Exercises
        </Button>
        <Text className="font-semibold text-[#FF2625] opacity-[0.1] block text-[200px]">
          Exercises
        </Text>
      </Box>

      <Box className="mt-[-60px]">
        <img src={Shape} alt="Decorative shape" className="rounded-bl-[20%] w-full" />
      </Box>
    </Box>
   </>
  )
}

export default HeroBanner
