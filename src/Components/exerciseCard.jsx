import React, { useState, useId, useRef, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { AnimatePresence, motion } from "motion/react";
import ExerciseDetail from './ExerciseDetail';
import { useNavigate } from 'react-router-dom';

const ExerciseCardComponent = ({ exercise }) => {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setActive(null);
    }
    if (active) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [active]);

  const renderExercise = (item, idx) => (
    <motion.div
      key={idx}
      layoutId={`card-${item.id}-${id}`}
      onClick={() => setActive(item)}
      className="cursor-pointer bg-white rounded-xl shadow-md p-4 w-full max-w-xs flex flex-col items-center transition-transform hover:scale-105"
    >
      {item.gifUrl && (
        <img
          src={item.gifUrl}
          alt={item.name}
          loading="lazy"
          className="w-full h-48 object-cover rounded-lg mb-4"
        />
      )}
      <Text className="text-lg font-semibold text-center capitalize">{item.name || `Exercise ${idx + 1}`}</Text>
      {item.bodyPart && (
        <Text className="text-sm text-gray-600 mt-1">Body Part: {item.bodyPart}</Text>
      )}
    </motion.div>
  );

  const ExpandedModal = () => (
    <AnimatePresence>
      {active && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
            onClick={() => setActive(null)}
          />
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.div
              ref={ref}
              layoutId={`card-${active.id}-${id}`}
              className="w-full max-w-[600px] max-h-[90vh] overflow-auto bg-white dark:bg-neutral-900 rounded-2xl relative"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                className="absolute top-3 right-3 bg-gray-200 hover:bg-gray-300 rounded-full h-8 w-8 flex items-center justify-center shadow-md z-10"
                onClick={() => setActive(null)}
              >
                <span className="text-xl font-bold">×</span>
              </button>
              <div className="flex flex-col items-center w-full p-8 bg-white border-t-4 border-red-600 overflow-y-auto max-w-[600px]">
                {active.gifUrl && (
                  <img
                    src={active.gifUrl}
                    alt={active.name}
                    className="w-[80%] md:w-[60%] h-auto max-h-[250px] object-cover object-top rounded-lg mx-auto mb-4"
                  />
                )}
                <h3 className="font-medium text-center items-center justify-center flex text-2xl md:text-4xl capitalize">
                  {active.name}
                </h3>
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded mt-4 transition"
                  onClick={() => {
                    const safeId = active.id ? encodeURIComponent(active.id) : '';
                    setActive(null);
                    navigate(`/exercise/${safeId}`);
                  }}
                >
                  Visit
                </button>
                <div className="w-full text-left">
                  <ExerciseDetail exercise={active} />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <ExpandedModal />
      {Array.isArray(exercise) ? (
        <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
          {exercise.map(renderExercise)}
        </Box>
      ) : typeof exercise === 'object' ? (
        <Box className="flex justify-center w-full p-4">
          {renderExercise(exercise, 0)}
        </Box>
      ) : null}
    </>
  );
};

export default ExerciseCardComponent;
