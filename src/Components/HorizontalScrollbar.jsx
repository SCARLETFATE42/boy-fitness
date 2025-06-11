"use client";
import React, { useRef, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import ExerciseCard from "./exerciseCard";

const HorizontalScrollbar = ({ bodyPart, setBodyPart, data = [], isBodyParts, renderItem }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [visibleCards, setVisibleCards] = useState(3);

  // Dynamically set number of visible cards based on screen size
  const updateVisibleCards = () => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCards(1);
    else if (width < 1024) setVisibleCards(2);
    else setVisibleCards(3);
  };

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScrollability();
  }, [data]);

  const CARD_WIDTH = 200;
  const GAP = 16;
  const scrollAmount = (CARD_WIDTH + GAP) * visibleCards;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollability, 300);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      setTimeout(checkScrollability, 300);
    }
  };

  return (
    <Box className="!relative !w-full !px-2 sm:!px-4">
      <Box
        className="!flex !overflow-x-auto !scroll-smooth !py-4 !no-scrollbar"
        ref={carouselRef}
        onScroll={checkScrollability}
        style={{ scrollbarWidth: "none" }}
      >
        <Box className="!flex !gap-4 !min-w-full">
          {Array.isArray(data) &&
            data.map((item, idx) => (
              <Box key={item.id || idx} className="!shrink-0 !w-[200px]">
                {typeof renderItem === "function" ? (
                  renderItem(item, idx)
                ) : isBodyParts ? (
                  <Box
                    className="!flex !items-center !justify-center !bg-white !rounded-lg !shadow !p-4 !h-[140px] !cursor-pointer !transition-all !duration-200 hover:!border-t-[4px] hover:!border-t-[#ff2625]"
                    style={{ borderTop: "4px solid transparent" }}
                    onClick={() =>
                      typeof setBodyPart === "function" && setBodyPart(item)
                    }
                  >
                    <Text className="!text-black !text-center !font-semibold !capitalize !text-lg">
                      {item.name || item}
                    </Text>
                  </Box>
                ) : (
                  <ExerciseCard exercise={item} />
                )}
              </Box>
            ))}
        </Box>
      </Box>

      {/* Arrows */}
      <Box className="!absolute !top-1/2 !left-0 !-translate-y-1/2 !z-10">
        <button
          className="flex h-10 w-10 items-center justify-center bg-white rounded-full shadow disabled:opacity-30"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="h-6 w-6 text-red-600" />
        </button>
      </Box>
      <Box className="!absolute !top-1/2 !right-0 !-translate-y-1/2 !z-10">
        <button
          className="flex h-10 w-10 items-center justify-center bg-white rounded-full shadow disabled:opacity-30"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="h-6 w-6 text-red-600" />
        </button>
      </Box>
    </Box>
  );
};

export default HorizontalScrollbar;
