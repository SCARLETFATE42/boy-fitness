import React from 'react';
import { Box, Text } from '@mantine/core';
import { exerciseOptions, fetchData, youtubeOptions } from '../Components/utils/fetchData';

const Exercisedetail = ({ exercise }) => {
  if (!exercise) return null;

  const getExerciseVideos = async () => {
    const videoData = await fetchData(
      `https://youtube-search-and-download.p.rapidapi.com/search?query=${exercise.name} exercise`,
      youtubeOptions
    );
    // console.log(videoData);
  };

  return (
    <Box p={4} >
      {/* <Text size="xl" weight={700} className='text-white'>{exercise.name}</Text> */}
      <Text mt="sm" className='text-black'>Body Part: {exercise.bodyPart}</Text>
      <Text mt="sm" className='text-black'>Target: {exercise.target}</Text>
      <Text mt="sm" className='text-black'>Equipment: {exercise.equipment}</Text>
    </Box>
  );
};

export default Exercisedetail;