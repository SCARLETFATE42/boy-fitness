import { Box, Title } from '@mantine/core'
import React, {useState, useEffect} from 'react'
import HeroBanner from '../Components/HeroBanner'
import SearchExercises from '../Components/SearchExercises'
import Exercises from '../Components/Exercises'
import { fetchData } from '../Components/utils/fetchData'

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      // Example for body parts
      const bodyPartsData = await fetchData('API_URL_FOR_BODYPARTS', options);
      setBodyParts(['all', ...bodyPartsData]);
    };

    fetchBodyParts();
  }, []);

  return (
    <>
      <Box className="home-container" >
        <HeroBanner />
        <SearchExercises
          setExercises={setExercises}
          bodyPart={bodyPart}
          setBodyPart={setBodyPart}
          bodyParts={bodyParts}
        />
        <Exercises
          exercises={exercises}
          setExercises={setExercises}
          bodyPart={bodyPart}
        />
      </Box>
    </>
  )
}

export default Home
