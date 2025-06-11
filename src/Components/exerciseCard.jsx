import React, { useState, useId, useRef, useEffect } from 'react';
import { Box, Text } from '@mantine/core';
import { AnimatePresence, motion } from "motion/react";
import ExerciseDetail from './ExerciseDetail'; // Adjust path as needed


const CARD_STYLE = {
  width: 300,
  height: 450,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  // border: '1px solid #e0e0e0',
  borderTop: '4px solid #ff2625',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  cursor: 'pointer',
  borderRadius: 12,
  background: '#fff',
  // margin: 'auto',
  overflow: 'hidden',
  padding: 16,
};

const ExerciseCardComponent = ({ exercise }) => {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);

  // Escape key and body scroll lock
  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // Outside click to close
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setActive(null);
    }
    if (active) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [active]);

  // Render a single exercise card
  const renderExercise = (item, idx) => (
    <motion.div
      key={idx}
      layoutId={`card-${item.id}-${id}`}
      onClick={() => setActive(item)}
      className="!cursor-pointer"
      style={CARD_STYLE}
      whileHover={{ scale: 1.03 }}
    >
      {item.gifUrl && (
        <img
          src={item.gifUrl}
          alt={item.name}
          style={{ width: '100%',  objectFit: 'cover', borderRadius: 8, margin: '12px 0' }}
          loading="lazy"
        />
      )}
      <Text className='!mt-10 !font-medium !text-lg'>{item.name || `Exercise ${idx + 1}`}</Text>
      {item.bodyPart && <Text className='!mt-1'>Body Part: {item.bodyPart}</Text>}
    </motion.div>
  );

  // Modal for expanded card
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
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.div
              ref={ref}
              layoutId={`card-${active.id}-${id}`}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <button
                className="flex absolute top-2 right-2 items-center justify-center bg-white rounded-full h-6 w-6 z-10"
                onClick={() => setActive(null)}
              >
                <span style={{ fontWeight: "bold", fontSize: 18 }}>×</span>
              </button>
              {/* Render ExerciseDetail here */}
              <ExerciseDetail exercise={active} />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  if (Array.isArray(exercise)) {
    return (
      <>
        <ExpandedModal />
        <Box style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          justifyItems: 'center'
        }}>
          {exercise.map(renderExercise)}
        </Box>
      </>
    );
  }

  if (typeof exercise === 'object') {
    return (
      <>
        <ExpandedModal />
        <Box style={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          {renderExercise(exercise, 0)}
        </Box>
      </>
    );
  }

  return null;
};

export default ExerciseCardComponent;
