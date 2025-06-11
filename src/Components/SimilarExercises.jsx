import { Box, Text } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import HorizontalScrollbar from './HorizontalScrollbar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ExerciseCard from './exerciseCard';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for 1s or until data is available
    if (targetMuscleExercises.length || equipmentExercises.length) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [targetMuscleExercises, equipmentExercises]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-[200px]">
        <DotLottieReact
          src="path/to/animation.lottie"
          loop
          autoplay
        />
      </Box>
    );
  }

  return (
   <>
    <Text className='text-black text-3xl'>Exercises that target the same muscle group</Text>
    <Box className='flex flex-col items-center justify-center gap-8 mt-6 mb-7'>
      <Box>
        {targetMuscleExercises.length ? 
          <HorizontalScrollbar
            data={targetMuscleExercises}
            renderItem={item => (
              <Box className="mb-4">
                <ExerciseCard exercise={item} />
              </Box>
            )}
          />
          : <DotLottieReact
              src="path/to/animation.lottie"
              loop
              autoplay
            />}
      </Box>
    </Box>
    <Text className='text-black text-3xl'>Exercises that target the same muscle group</Text>
    <Box className='flex flex-col items-center justify-center gap-8 mt-6'>
      <Box>
        {equipmentExercises.length ? 
          <HorizontalScrollbar
            data={equipmentExercises}
            renderItem={item => (
              <Box className="mb-4">
                <ExerciseCard exercise={item} />
              </Box>
            )}
          />
          : <DotLottieReact
              src="path/to/animation.lottie"
              loop
              autoplay
            />}
      </Box>
    </Box>
   </>
  )
}

export default SimilarExercises
