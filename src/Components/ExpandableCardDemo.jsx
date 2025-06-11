"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "../Components/use-outside-click";
import ExerciseDetail from "./ExerciseDetail"; // Adjust path as needed
import { useNavigate } from "react-router-dom";

export function ExpandableCardDemo({ exercises }) {
  const [active, setActive] = useState(null);
  const id = useId();
  const ref = useRef(null);
  const navigate = useNavigate(); // <-- Add this

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }
    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.name || active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              
            </motion.button>
            <motion.div
              layoutId={`card-${active.id || active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex flex-col items-start w-full p-8 bg-white border-t-4 border-red-600">
                {active.gifUrl || active.src ? (
                  <img
                    src={active.gifUrl || active.src}
                    alt={active.name || active.title}
                    className="w-full h-[400px] object-cover object-top rounded-lg mb-4"
                  />
                ) : null}
                <h3 className="font-medium text-center items-center justify-center flex text-4xl capitalize">
                  {active.name || active.title}
                </h3>
                {/* Visit Button */}
                <button
                  className="bg-red-600 hover:bg-red-800 text-white font-semibold py-2 px-6 rounded mt-4 transition"
                  value="Visit"
                  onClick={() => {
                    // Navigate to the detail page, e.g. /exercise/123
                    navigate(`/exercise/${active.id}`);
                  }}
                >
                  Visit
                </button>
                {/* You can add more details here if needed */}
                <ExerciseDetail exercise={active} />
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      {/* Full width, bg-white, text-white, p-4, image above writeups */}
      <div className="w-full  p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {(exercises || []).map((exercise, index) => (
          <motion.div
            layoutId={`card-${exercise.id || exercise.title}-${id}`}
            key={exercise.id || exercise.title}
            onClick={() => setActive(exercise)}
            className="flex flex-col items-center rounded-xl cursor-pointer bg-white text-black p-4 shadow transition-all duration-200 border-t-[1.5px] border-t-transparent hover:shadow-xl hover:border-t-red-600 hover:border-t-[4px]"
          >
            {/* Image above writeups - only show if not expanded */}
            {(!active || active.id !== exercise.id) && (
              <motion.div layoutId={`image-${exercise.id || exercise.title}-${id}`}>
                <img
                  width={180}
                  height={180}
                  src={exercise.gifUrl || exercise.src}
                  alt={exercise.name || exercise.title}
                  className="w-full h-48 object-cover object-top rounded-lg mb-2"
                />
              </motion.div>
            )}
            <div className="flex flex-col items-center w-full">
              <motion.h3
                layoutId={`title-${exercise.id || exercise.title}-${id}`}
                className="font-medium text-black text-center text-base"
              >
                {exercise.name || exercise.title}
              </motion.h3>
              <motion.p
                layoutId={`description-${exercise.id || exercise.title}-${id}`}
                className="text-black text-start text-base mt-3"
              >
                {exercise.description}
              </motion.p>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{
      opacity: 0,
      transition: { duration: 0.05 },
    }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-4 w-4 text-black"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);