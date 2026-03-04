import React, { useEffect } from "react";
import { Box, Text, Pagination } from "@mantine/core";
import { ExpandableCardDemo } from "./ExpandableCardDemo";
// import { PaginationComponent } from "./utils/PaginationComponent";

const Exercises = ({ exercises = [], loading = false, currentPage = 1, onPageChange }) => {
  // Ensure exercises is always an array
  const safeExercises = Array.isArray(exercises) ? exercises : [];

  const ITEMS_PER_PAGE = 10;

  const totalPages = Math.max(1, Math.ceil(safeExercises.length / ITEMS_PER_PAGE));

  // If the result set changes and current page is out of range, reset to page 1
  useEffect(() => {
    if (onPageChange && currentPage > totalPages) {
      onPageChange(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeExercises.length, totalPages]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedExercises = safeExercises.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <Text className="!mb-[46px] !text-3xl !font-medium">Showing Results</Text>
      {/* Use ExpandableCardDemo with BentoGrid styling */}
      <div className="max-w-5xl w-full mx-auto md:auto-rows-[25rem] cursor-pointer gap-8">
        <ExpandableCardDemo exercises={paginatedExercises} />
      </div>
      {safeExercises.length > 0 && (
        <Box className="!flex !flex-col !items-center !mt-12">
          <Pagination
            total={totalPages}
            siblings={1}
            value={currentPage}
            onChange={(page) => onPageChange && onPageChange(page)}
            color="red"
            size="lg"
            radius="md"
            className="!mb-8 mt-4"
            withEdges
            classNames={{
              control:
                "!border !border-gray-200 !bg-white !text-black !font-medium !rounded-lg transition-all duration-200 hover:!bg-red-50 hover:!text-red-600 hover:!border-red-300 data-[active]:!bg-red-600 data-[active]:!text-white data-[active]:!border-red-600 data-[disabled]:!opacity-50 data-[disabled]:!cursor-not-allowed",
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
