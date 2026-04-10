"use client";
import { useQueryState } from "nuqs";
import { searchParams, useFilters } from "@lib/searchParams";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
type Size = "sm" | "md" | "lg";

export function FilterChips({ sz = "sm" }: { sz?: Size }) {
  const [{ type, brand, res, shutter, mgp, maxap, minfl, maxfl, mount }, setFilters] =
    useFilters();

  const [search, setSearch] = useQueryState(
    "search",
    searchParams.search.withOptions({ shallow: false })
  );

  const normalize = (val: string | string[] | null | undefined) => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  const filterValues = [
    normalize(type),
    normalize(brand),
    normalize(res),
    normalize(shutter),
    normalize(mgp),
    normalize(maxap),
    normalize(minfl),
    normalize(maxfl),
    normalize(mount),
  ];

  const filterKeys = [
    "type",
    "brand",
    "res",
    "shutter",
    "mgp",
    "maxap",
    "minfl",
    "maxfl",
    "mount",
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

  const chipBase =
    "group flex items-center gap-1 bg-primary hover:bg-primary-muted text-background cursor-pointer transition-colors";

  return (
    <motion.div layout className="flex flex-wrap lowercase gap-2 my-auto">
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
            <X size={14} className="group-hover:scale-125 transition-transform duration-200" />
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
              onClick={() => handleClose(filterKeys[index], value, index)}
              className={`${chipBase} ${sizeStyles[sz]}`}
            >
              <span>{value}</span>
              <X size={14} className="group-hover:scale-125 transition-transform duration-200" />
            </motion.button>
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );
};