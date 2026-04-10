"use client";
import { Filters } from "@ui/store/filters/Filters";
import { motion } from "framer-motion";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { FilterIcon, SlidersHorizontal } from "lucide-react";

type Props = {
  itemtype: string;
  type: "desktop" | "mobile";
  contentClassname?: string;
};

export default function FiltersPanel({
  itemtype,
  type,
  contentClassname,
}: Props) {
  if (type === "desktop") {
    // console.log("itemtype is " + itemtype);
    return (
      <>
        <Filters it={itemtype} />
        <motion.div
          className="absolute top-0 right-0 h-full bg-foreground origin-top"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.4 }}
        />
      </>
    );
  }

  return (
    <Popover placement="bottom-end" shouldBlockScroll>
      <PopoverTrigger asChild>
        <Button
          variant="light"
          className="h-8 border border-foreground font-semibold bg-transparent text-foreground"
        >
          <FilterIcon size={22} />
        </Button>
      </PopoverTrigger>

      <PopoverContent
        className={`${contentClassname ?? ""} px-0 min-w-[65dvw] relative max-h-[75dvh] bg-background border border-foreground `}
      >
        {/* <div className="w-full py-4 overflow-auto no-scrollbar">
          <FilterChips sz="lg" />
        </div> */}
        <div className="text-xl w-full overflow-x-hidden">
          <Filters it={itemtype} />
        </div>
      </PopoverContent>
    </Popover>
  );
};