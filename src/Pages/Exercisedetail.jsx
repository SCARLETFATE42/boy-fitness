import { Box, Text } from '@mantine/core'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { exerciseOptions, fetchData, youtubeOptions } from '../Components/utils/fetchData'
import ExerciseCard from '../Components/exerciseCard'
import Details from '../Components/Details'
import ExerciseVideo from '../Components/ExerciseVideo'
import SimilarExercises from '../Components/SimilarExercises'

const Exercisedetail = () => {
  const [Exercisedetail, setExercisedetail] = useState({})
  const [exerciseVideos, setExerciseVideos] = useState([]);
  const [targetMuscleExercises, setTargetMuscleExercises] = useState([]);
  const [equipmentExercises, setEquipmentExercises] = useState([]);
  // console.log(Exercisedetail);
  // console.log(exerciseVideos);
  
  const {id} = useParams();

  useEffect(() => {
    const fetchExerciseDetail = async () => {
      const exerciseDbUrl = 'https://exercisedb.p.rapidapi.com';
      const youtubeSearchUrl = 'https://youtube-search-and-download.p.rapidapi.com';
      const exerciseDetailData = await fetchData(`${exerciseDbUrl}/exercises/exercise/${id}`, exerciseOptions);
      setExercisedetail(exerciseDetailData);
      const exerciseVideosData = await fetchData(`${youtubeSearchUrl}/search?query=${exerciseDetailData.name}`, youtubeOptions);
      setExerciseVideos(exerciseVideosData.contents);
      const targetMuscleExercisesData = await fetchData(`${exerciseDbUrl}/exercises/target/${exerciseDetailData.target}`, exerciseOptions);
      setTargetMuscleExercises(targetMuscleExercisesData);

      const equipmentExercisesData = await fetchData(`${exerciseDbUrl}/exercises/equipment/${exerciseDetailData.equipment}`, exerciseOptions);
      setEquipmentExercises(equipmentExercisesData);

    };

    fetchExerciseDetail();
  }, [id]);

  return (
    <>
    <Box>
        <Details exerciseDetail={Exercisedetail} />
        <ExerciseVideo exerciseVideos={exerciseVideos} name={Exercisedetail.name} />
        <SimilarExercises targetMuscleExercises={targetMuscleExercises} equipmentExercises={equipmentExercises} />
    </Box>
    </>
  )
}

export default Exercisedetail
