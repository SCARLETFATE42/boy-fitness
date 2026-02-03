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
        setBodyParts([]);
      }
    };

    fetchBodyParts();
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
