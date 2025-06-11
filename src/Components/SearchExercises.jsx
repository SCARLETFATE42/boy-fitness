import { Box, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import { PlaceholdersAndVanishInput } from './PlaceholdersAndVanishInput'
import { exerciseOptions } from './utils/fetchData'
import HorizontalScrollbar from './HorizontalScrollbar'

const SearchExercises = ({ setExercises, bodyPart, setBodyPart }) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [exercise, setExercise] = useState('');
  const [selectedBodyPart, setSelectedBodyPart] = useState('');
  const [error, setError] = useState('');
  const [cooldown, setCooldown] = useState(false);
  const [allExercises, setAllExercises] = useState([]); // NEW STATE FOR ALL EXERCISES

  // Fetch body parts for the horizontal scrollbar (optional UI)
  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', exerciseOptions);
        const data = await response.json();
        setBodyParts(data);
      } catch (err) {
        setBodyParts([]);
      }
    };
    fetchBodyParts();
  }, []);

  // NEW: Fetch all exercises on initial load (if needed)
  useEffect(() => {
    const fetchAllExercises = async () => {
      try {
        const response = await fetch('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        const data = await response.json();
        setAllExercises(data);
      } catch (err) {
        setAllExercises([]);
      }
    };
    fetchAllExercises();
  }, []);

  // Search for exercises by name or muscle (old search)
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

      const url = `https://exercisedb.p.rapidapi.com/exercises/name/${exercise.trim().toLowerCase()}`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '960a3fbe01msh515fa685f11a260p1df61fjsn25df6125545d',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          // Remove duplicates by id
          const unique = Array.from(
            new Map(result.map(item => [item.id, item])).values()
          );
          setExercises(unique);
        } else {
          setExercises([]);
          setError('No exercises found for your search.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        setExercises([]);
        console.error(error);
      }
      setTimeout(() => setCooldown(false), 5000);
    }, 1000); // 1 second delay
  };

  // NEW: Search for exercises by selected body part (from Home.jsx)
  useEffect(() => {
    if (!bodyPart || bodyPart === 'all') return;
    const fetchByBodyPart = async () => {
      setError('');
      setCooldown(true);
      const url = `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=90&offset=0`;
      const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '960a3fbe01msh515fa685f11a260p1df61fjsn25df6125545d',
          'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
        }
      };
      try {
        const response = await fetch(url, options);
        const result = await response.json();
        if (Array.isArray(result) && result.length > 0) {
          // Remove duplicates by id
          const unique = Array.from(
            new Map(result.map(item => [item.id, item])).values()
          );
          setExercises(unique);
        } else {
          setExercises([]);
          setError('No exercises found for this body part.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
        setExercises([]);
        console.error(error);
      }
      setTimeout(() => setCooldown(false), 5000);
    };
    fetchByBodyPart();
    // eslint-disable-next-line
  }, [bodyPart]);

  // Example filtering logic
  const displayedExercises = bodyPart === 'all'
    ? allExercises // allExercises is the full array from the API
    : allExercises.filter(ex => ex.bodyPart === bodyPart);

  return (
    <Box className='!items-center justify-center p-5 mt-9'>
      <Text className='!font-bold !text-[44px] !mb-[50px] !text-center'>
        Search Exercises by Name or Muscle
      </Text>
      <Box className="!flex !flex-col !gap-3 !w-full !mb-5 !max-w-xl !mx-auto">
        <PlaceholdersAndVanishInput
          placeholders={["biceps", "triceps", "chest", "back", "legs"]}
          value={exercise}
          onChange={e => setExercise(e.target.value)}
          onSubmit={handleSearch}
          disabled={cooldown}
        />
        {error && <Text color="red">{error}</Text>}
      </Box>
      <Box>
        <HorizontalScrollbar
          data={bodyParts} // bodyParts includes "all" as the first item
          isBodyParts={true}
          setBodyPart={setBodyPart}
          bodyPart={bodyPart}
        />
      </Box>
    </Box>
  );
};

export default SearchExercises;
