import { Box, Text } from '@mantine/core';
import React, { useState, useEffect } from 'react';
import HorizontalScrollbar from './HorizontalScrollbar';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ExerciseCard from './exerciseCard';

const SimilarExercises = ({ targetMuscleExercises, equipmentExercises }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (targetMuscleExercises.length || equipmentExercises.length) {
      const timer = setTimeout(() => setLoading(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [targetMuscleExercises, equipmentExercises]);

  if (loading) {
    return (
      <Box className="!flex !justify-center !items-center !min-h-[200px] !w-full !p-4">
        <DotLottieReact src="path/to/animation.lottie" loop autoplay />
      </Box>
    );
  }

  return (
    <Box className="!w-full !px-4 !sm:px-6 !md:px-10 !lg:px-20 !py-6">
      <Text className="!text-black !text-2xl !sm:text-3xl !font-semibold !mb-4 !capitalize !text-center !sm:text-left">
        Exercises that target the same muscle group
      </Text>
      <Box className="!flex flex-col !items-center !justify-center !gap-6 !mt-4 !mb-10 !w-full">
        {targetMuscleExercises.length ? (
          <HorizontalScrollbar
            data={targetMuscleExercises}
            renderItem={(item) => (
              <Box className="!min-w-[250px] !max-w-xs sm:!min-w-[280px] !mb-4">
                <ExerciseCard exercise={item} />
              </Box>
            )}
          />
        ) : (
          <DotLottieReact src="path/to/animation.lottie" loop autoplay />
        )}
      </Box>

      <Text className="!text-black !text-2xl sm:!text-3xl !font-semibold !mb-4 !capitalize !text-center sm:!text-left">
        Equipment that targets the same muscle group
      </Text>
      <Box className="!flex flex-col !items-center !justify-center !gap-6 !mt-4 !w-full">
        {equipmentExercises.length ? (
          <HorizontalScrollbar
            data={equipmentExercises}
            renderItem={(item) => (
              <Box className="!min-w-[250px] !max-w-xs sm:!min-w-[280px] !mb-4">
                <ExerciseCard exercise={item} />
              </Box>
            )}
          />
        ) : (
          <DotLottieReact src="path/to/animation.lottie" loop autoplay />
        )}
      </Box>
    </Box>
  );
};

export default SimilarExercises;
