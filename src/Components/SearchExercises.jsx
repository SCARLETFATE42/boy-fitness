import { Box, Text } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { PlaceholdersAndVanishInput } from './PlaceholdersAndVanishInput';
import { exerciseOptions } from './utils/fetchData';
import HorizontalScrollbar from './HorizontalScrollbar';

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [allExercises, setAllExercises] = useState([]);

  // Fetch list of body parts
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        );
        const data = await response.json();
        setBodyParts(['all', ...data]);
      } catch {
        setBodyParts([]);
      }
    };
    fetchBodyParts();
  }, []);

  // Fetch all exercises
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await fetch(
          'https://exercisedb.p.rapidapi.com/exercises',
          exerciseOptions
        );
        const data = await response.json();
        setAllExercises(data);
      } catch {
        setAllExercises([]);
      }
    };
    fetchAllExercises();
  }, []);

  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (cooldown) return;

    setError('');
    setCooldown(true);

    setTimeout(async () => {
      if (!exercise.trim()) {
        setError('Please enter a search term.');
        setCooldown(false);
        return;
      }

      try {
        const res = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises/name/${exercise.trim().toLowerCase()}`,
          exerciseOptions
        );
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const unique = Array.from(new Map(data.map(i => [i.id, i])).values());
          setExercises(unique);
        } else {
          setExercises([]);
          setError('No exercises found.');
        }
      } catch {
        setError('Error fetching exercises.');
        setExercises([]);
      }
      setTimeout(() => setCooldown(false), 5000);
    }, 1000);
  };

  useEffect(() => {
    if (!bodyPart || bodyPart === 'all') return;

    const fetchByBodyPart = async () => {
      setError('');
      setCooldown(true);
      try {
        const res = await fetch(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`,
          exerciseOptions
        );
        const data = await res.json();
        const unique = Array.from(new Map(data.map(i => [i.id, i])).values());
        setExercises(unique);
      } catch {
        setError('Error fetching by body part.');
        setExercises([]);
      }
      setTimeout(() => setCooldown(false), 5000);
    };

    fetchByBodyPart();
  }, [bodyPart]);

  return (
    <Box className="!w-full !px-4 sm:!px-6 md:!px-10 lg:!px-20 !py-8">
      <Text className="!font-bold !text-2xl sm:!text-3xl md:!text-4xl !text-center !mb-6">
        Search Exercises by Name or Muscle
      </Text>

      <Box className="!w-full !max-w-xl !mx-auto !flex !flex-col !gap-3 !mb-6 !px-2 sm:!px-0">
        <PlaceholdersAndVanishInput
          placeholders={['biceps', 'triceps', 'chest', 'back', 'legs']}
          value={exercise}
          onChange={(e) => setExercise(e.target.value)}
          onSubmit={handleSearch}
          disabled={cooldown}
        />
        {error && <Text color="red" size="sm" className="!text-center">{error}</Text>}
      </Box>

      <Box className="!w-full !max-w-7xl !mx-auto !mt-4">
        <HorizontalScrollbar
          data={bodyParts}
          isBodyParts
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Box>
  );
};

export default SearchExercises;
