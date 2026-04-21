"use client";
import { useMemo } from "react";
import { useFilters } from "@lib/searchParams";
import { filterMap } from "@lib/utils";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Size = "sm" | "md" | "lg";

const isStringArrayOrString = (
  val: unknown
): val is string | string[] | null | undefined => {
  return (
    val == null ||
    typeof val === "string" ||
    (Array.isArray(val) && typeof val[0] === "string")
  );
};

export function FilterChips({ sz = "sm" }: { sz?: Size }) {
  const [filters, setFilters] = useFilters();

  const excluded = new Set(["category", "price", "search", "id"]);

  const normalize = (
    val: string | string[] | null | undefined
  ): string[] => {
    if (!val) return [];
    return Array.isArray(val) ? val : [val];
  };

  const lookup = useMemo(() => {
    const map = new Map<string, string>();
    filterMap.forEach((f) => {
      f.values.forEach((v) => {
        map.set(`${f.param}:${v.value}`, v.label);
      });
    });
    return map;
  }, []);

  const getLabel = (param: string, value: string) => {
    return lookup.get(`${param}:${value}`) ?? value;
  };

  const handleClose = (param: string, value: string) => {
    const raw = filters[param as keyof typeof filters];

    if (Array.isArray(raw)) {
      setFilters({
        [param]: raw.filter((v) => v !== value),
      });
      return;
    }

    setFilters({ [param]: null });
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
        {Object.entries(filters)
          .filter(([param]) => !excluded.has(param))
          .flatMap(([param, raw]) => {
            if (!isStringArrayOrString(raw)) return [];

            return normalize(raw).map((value) => (
              <motion.button
                key={param + value}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                type="button"
                onClick={() => handleClose(param, value)}
                className={`${chipBase} ${sizeStyles[sz]}`}
              >
                <span>{getLabel(param, value)}</span>
                <X size={14} className="group-hover:scale-125 transition-transform duration-200" />
              </motion.button>
            ));
          })}
      </AnimatePresence>
    </motion.div>
  );
};