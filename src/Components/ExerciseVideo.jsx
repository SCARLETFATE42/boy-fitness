import { Box, Text } from '@mantine/core';
import React from 'react';

const ExerciseVideo = ({ exerciseVideos, name }) => {
  if (!exerciseVideos.length)
    return (
      <Text className="text-black text-xl md:text-2xl font-medium mb-8 text-center">
        Loading {name}...
      </Text>
    );

  return (
    <Box className="exercise-video mt-24 mb-16 px-4">
      <Text className="text-black text-2xl md:text-3xl font-medium mb-8 text-center">
        Watch <span className="text-[#ff2625] capitalize">{name}</span> Exercise Videos
      </Text>

      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 border-t border-gray-300 pt-6">
        {exerciseVideos.slice(0, 6).map((item) => (
          <Box key={item.video.videoId} className="w-full">
            <a
              href={`https://www.youtube.com/watch?v=${item.video.videoId}`}
              target="_blank"
              rel="noreferrer"
              className="flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-200"
              title={item.video.title}
            >
              <img
                src={item.video.thumbnails[0].url}
                alt={item.video.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <Text className="text-lg font-medium text-black px-2">
                {item.video.title.length > 60
                  ? item.video.title.slice(0, 60) + '...'
                  : item.video.title}
              </Text>
            </a>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ExerciseVideo;
