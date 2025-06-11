import React, { useState } from "react";
import { Box, Pagination, Text } from "@mantine/core";
import { exerciseOptions, fetchData } from "./utils/fetchData";
import { ExpandableCardDemo } from "./ExpandableCardDemo";

const ITEMS_PER_PAGE = 10;

const Exercises = ({ exercises = [], setexercises, bodyPart, loading = false }) => {
  // Ensure exercises is always an array
  const safeExercises = Array.isArray(exercises) ? exercises : [];

  // Pagination state
  const [activePage, setActivePage] = useState(1);

  // Calculate paginated items
  const startIdx = (activePage - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const paginatedExercises = loading
    ? Array.from({ length: ITEMS_PER_PAGE })
    : safeExercises.slice(startIdx, endIdx);

  // Calculate total pages
  const totalPages = loading
    ? 1
    : Math.ceil(safeExercises.length / ITEMS_PER_PAGE);

  return (
    <>
      <Text className="!mb-[46px] !text-3xl !font-medium">Showing Results</Text>
      {/* Use ExpandableCardDemo with BentoGrid styling */}
      <div className="!max-w-4xl !w-full !mx-auto !md:auto-rows-[25rem] !cursor-pointer !gap-8">
        <ExpandableCardDemo exercises={paginatedExercises} />
      </div>
      {totalPages > 1 && (
        <Box className="!flex !flex-col !items-center !mt-12">
          <Text className="!text-gray-500 !mb-2 !mt-6">
            Page {activePage} of {totalPages}
          </Text>
          <Pagination
            total={totalPages}
            siblings={2}
            value={activePage}
            onChange={setActivePage}
            color="red"
            size="lg"
            radius="xl"
            className="!mb-2 !gap-4"
            withEdges
            classNames={{
              control:
                "!border-[1.5px] !border-black !p-3 !text-black !font-semibold !rounded-lg !transition-all !duration-150 !hover:bg-red-100 !hover:text-red-600 !hover:border-red-300",
              active:
                "!bg-red-600 !text-white !border-black !p-3 !font-bold",
              previous: "!visible",
              next: "!visible",
            }}
          />
        </Box>
      )}
      {loading && (
        <Box className="!flex !justify-center !items-center !mt-8">
          <Text className="!text-gray-500">Loading...</Text>
        </Box>
      )}
      {!loading && safeExercises.length === 0 && (
        <Box className="!flex !justify-center !items-center !mt-8">
          <Text className="!text-gray-500">No exercises found.</Text>
        </Box>
      )}
    </>
  );
};

export default Exercises;
