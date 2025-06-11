import { Box, Text } from '@mantine/core'
import React from 'react'
import { youtubeOptions } from './utils/fetchData';


const ExerciseVideo = ({ exerciseVideos, name }) => {
  // console.log('this is exercise videos',exerciseVideos);
  if (!exerciseVideos.length) return <Text className='text-black text-2xl font-medium mb-[33px]'>Loading {name}</Text>;

  return (
    <>
      <Box className="exercise-video !mt-[200px] !mb-[100px] !p-5">
        <Text className='!text-black !text-2xl !font-medium !mb-[33px]'>
          Watch <span className='!font-medium !text-[#ff2625] !capitalize'>{name}</span> Exercise Video
        </Text>
        <Box className='!flex !flex-wrap !justify-start !gap-[40px] !border-t !border-gray-300 !pt-5'>
          {exerciseVideos
            .slice(0, 6)
          .map((item)=>{
            return (
               <Box key={item.video.videoId} className='w-[300px] h-[350px] mb-5'>
                  <a
                    href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
                    target="_blank"
                    rel="noreferrer"
                    className='!flex !flex-col !items-center !justify-center'
                    title={item.video.title}
                  >
                    <img
                      src={item.video.thumbnails[0].url}
                      alt={item.video.title}
                      className='!w-full !h-[200px] !object-cover !rounded-lg !mb-2'
                    />
                    <Text className='!mt-2 !font-medium !text-lg !text-black !text-center'>{item.video.title}</Text>
                  </a>
                </Box>
            )
          })}
        </Box>
      </Box>
    </>
  )
}

export default ExerciseVideo
