import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import { Box } from '@mantine/core'
// import {InfinitySpin} from 'react-loader-spinner';
import React from 'react'

const Loader = () => {
  return (
    <>
    
       <DotLottieReact
      src="path/to/animation.lottie"
      loop
      autoplay
    />
    
    </>
  )
}

export default Loader
