import { Box, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import HeroBanner from '../Components/HeroBanner'
import SearchExercises from '../Components/SearchExercises'
import Exercises from '../Components/Exercises'
import { fetchData, exerciseOptions } from '../Components/utils/fetchData'

const Home = ({ exercises, setExercises, bodyPart, setBodyPart }) => {
  const [bodyParts, setBodyParts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const bodyPartsData = await fetchData(
          'https://exercisedb.p.rapidapi.com/exercises/bodyPartList',
          exerciseOptions
        );
        setBodyParts(['all', ...bodyPartsData]);
      } catch (err) {
        console.error('Error fetching body parts:', err);
        setBodyParts([]);
      }
    };

    fetchBodyParts();
  }, []);

  // Load a random sample of exercises on first visit (when 'All' is default)
  useEffect(() => {
    const fetchInitialExercises = async () => {
      try {
        const all = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
        if (Array.isArray(all) && all.length > 0) {
          // Shuffle and pick a sample to show as default
          const shuffled = all.sort(() => 0.5 - Math.random());
          const sample = shuffled.slice(0, 12);
          setExercises(sample);
          setCurrentPage(1);
        }
      } catch (err) {
        console.error('Error fetching initial exercise sample:', err);
        setExercises([]);
      }
    };

    fetchInitialExercises();
    // run only once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box className="home-container" >
        <HeroBanner />
        <SearchExercises
          setExercises={setExercises}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts={bodyParts}
        />
        <Exercises
          exercises={exercises}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </Box>
    </>
  )
}

export default Home
