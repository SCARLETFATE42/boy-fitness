import React, { useState, useId, useRef, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { AnimatePresence, motion } from "motion/react";
import ExerciseDetail from './ExerciseDetail';

const ExerciseCardComponent = ({ exercise }) => {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

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
                className="absolute top-3 right-3 bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md"
                onClick={() => setActive(null)}
              >
                <span className="text-xl font-bold">×</span>
              </button>
              <ExerciseDetail exercise={active} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <ExpandedModal />
      <Box className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center p-4">
        {Array.isArray(exercise)
          ? exercise.map(renderExercise)
          : typeof exercise === 'object'
          ? renderExercise(exercise, 0)
          : null}
      </Box>
    </>
  );
};

export default ExerciseCardComponent;
