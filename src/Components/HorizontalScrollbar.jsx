"use client";
import React, { useRef, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import ExerciseCard from "./exerciseCard";

const CARD_WIDTH = 200;
const CARD_MARGIN = 56;
const CARDS_VISIBLE = 5;
const GAP = 50; // gap-[50px] in Tailwind

const HorizontalScrollbar = ({ bodyPart, setBodyPart, data = [], isBodyParts, renderItem }) => {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
    // eslint-disable-next-line
  }, [data]);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  // Scroll by the width of 3 cards + 2 gaps (since 3 cards = 2 gaps between them)
  const SCROLL_AMOUNT = (CARD_WIDTH + CARD_MARGIN) * CARDS_VISIBLE;

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
      setTimeout(checkScrollability, 350);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
      setTimeout(checkScrollability, 350);
    }
  };

  // Set the container width to fit exactly 3 cards + 2 gaps
  const containerWidth = (CARD_WIDTH * CARDS_VISIBLE) + (GAP * (CARDS_VISIBLE - 1));

  return (
    <Box className="!relative !mx-auto" style={{ width: containerWidth }}>
      <Box
        className="!flex !overflow-x-scroll !scroll-smooth !py-4 !no-scrollbar"
        ref={carouselRef}
        onScroll={checkScrollability}
        style={{ scrollbarWidth: "none" }}
      >
        <Box className="!flex !flex-row !gap-[10px]">
          {Array.isArray(data) &&
            data.map((item, idx) => (
              <Box key={item.id || idx}>
                {typeof renderItem === "function"
                  ? renderItem(item, idx)
                  : isBodyParts
                    // Show only the body part text, no image, with hover effect
                    ? (
                        <Box
                          className="!flex !items-center !justify-center !bg-white !rounded-lg !shadow !p-4 !w-[200px] !h-[140px] !cursor-pointer !transition-all !duration-200 !hover:border-t-[4px] !hover:border-t-[#ff2625]"
                          style={{ borderTop: "4px solid transparent" }}
                          onClick={() => typeof setBodyPart === "function" && setBodyPart(item)}
                        >
                          <Text className="!text-black !text-center !font-semibold !capitalize !text-lg">
                            {item.name || item}
                          </Text>
                        </Box>
                      )
                    : <ExerciseCard exercise={item} />
                }
              </Box>
            ))}
        </Box>
      </Box>
      <Box className="!absolute !top-1/2 !left-0 !-translate-y-1/2 !z-10">
        <button
          className="!flex !h-10 !w-10 !items-center !justify-center !disabled:opacity-50"
          onClick={scrollLeft}
          disabled={!canScrollLeft}
        >
          <IconArrowNarrowLeft className="!h-6 !w-6 !text-red-600" />
        </button>
      </Box>
      <Box className="!absolute !top-1/2 !right-0 !-translate-y-1/2 !z-10">
        <button
          className="!flex !h-10 !w-10 !items-center !justify-center !disabled:opacity-50"
          onClick={scrollRight}
          disabled={!canScrollRight}
        >
          <IconArrowNarrowRight className="!h-6 !w-6 !text-red-600" />
        </button>
      </Box>
    </Box>
  );
};

export default HorizontalScrollbar;
