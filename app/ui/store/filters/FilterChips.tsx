"use client";
import { useQueryState } from "nuqs";
import { searchParams, useFilters } from "@/app/lib/searchParams";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Size = "sm" | "md" | "lg";

export function FilterChips({ sz = "sm" }: { sz?: Size }) {
  const [{ type, brand, res, shutter, mgp, maxap, minfl, maxfl }, setFilters] =
    useFilters();
  const [search, setSearch] = useQueryState(
    "search",
    searchParams.search.withOptions({ shallow: false })
  );
  const filterValues = [type, brand, res, shutter, mgp, maxap, minfl, maxfl];
  const filterKeys = [
    "type",
    "brand",
    "res",
    "shutter",
    "mgp",
    "maxap",
    "minfl",
    "maxfl",
  ];
  const handleClose = (key: string, value: string, index: number) => {
    setFilters({
      [key]: filterValues[index].filter((item) => item !== value),
    });
  };
  const sizeStyles = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };
  const chipBase ="group flex items-center gap-1 bg-primary text-foreground rounded-full cursor-pointer";

  return (
    <motion.div
      layout
      className="flex flex-wrap lowercase gap-2 my-auto"
    >
      <AnimatePresence>
        {search && (
          <motion.button
            key="search-chip"
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            type="button"
            onClick={() => setSearch(null)}
            className={`${chipBase} ${sizeStyles[sz]}`}
          >
            <span>search: {search}</span>
            <X
              size={14}
              className="transition-transform duration-200 group-hover:scale-125"
            />
          </motion.button>
        )}
        {filterValues.map((values, index) =>
          values.map((value) => (
            <motion.button
              key={filterKeys[index] + value}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              type="button"
              onClick={() =>
                handleClose(filterKeys[index], value, index)
              }
              className={`${chipBase} ${sizeStyles[sz]}`}
            >
              <span>{value}</span>
              <X
                size={14}
                className="transition-transform duration-200 group-hover:scale-125"
              />
            </motion.button>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};