import react from 'react'
import Home from './Pages/Home'
import { Box } from '@mantine/core'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Exercicsedetail from './Pages/Exercisedetail'
import './App.css'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import { useState } from 'react'

const App=() => {
  const [bodyPart, setBodyPart] = useState('all');
  const [exercises, setExercises] = useState([]);

  return (
    <>
    <BrowserRouter>
    <Box>
      <Navbar />
    </Box>
      <Routes>
        <Route path="/" element={
  <Home
    bodyPart={bodyPart}
    setBodyPart={setBodyPart}
    exercises={exercises}
    setExercises={setExercises}
  />
}/>
        <Route path="/exercise" element={
  <Home
    bodyPart={bodyPart}
    setBodyPart={setBodyPart}
    exercises={exercises}
    setExercises={setExercises}
  />
}/>
        <Route path="/exercise/:id" element={<Exercicsedetail />}/>
      </Routes>
      <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
