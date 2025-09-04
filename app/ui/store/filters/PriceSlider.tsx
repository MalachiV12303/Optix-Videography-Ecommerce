"use client";
import { useFilters } from "@/app/lib/searchParams";
import { Slider } from "@nextui-org/slider"
import { useDebouncedCallback } from "use-debounce";

export function PriceSlider() {
    const [{price}, setFilters] = useFilters();

    const updatePrice = useDebouncedCallback((term) => {
        setFilters({price: term});
      }, 300); 
      
    return (
        <div className="flex flex-col">
            <Slider
                aria-label="price"
                showTooltip={true}
                tooltipProps={{ color: "primary", className: "text-background rounded-sm" }}
                renderThumb={(props) => (
                    <div
                      {...props}
                      className="group top-1/2 bg-background border-small border-background rounded-full cursor-grab data-[dragging=true]:cursor-grabbing"
                    >
                      <span className="transition-transform bg-foreground shadow-small rounded-full w-2 h-2 block group-data-[dragging=true]:scale-90" />
                    </div>
                  )}
                size="sm"
                color='primary'
                step={50}
                maxValue={3000}
                minValue={0}
                defaultValue={price}
                classNames={{mark: "text-xs"}}
                marks={[
                    {
                        value: 0,
                        label: "0",
                    },
                    {
                        value: 3000,
                        label: "3000",
                    }
                ]}
                onChangeEnd={(e) => {
                    updatePrice(e)
                }}
                className="max-w-md mt-1"
            />
        </div>
    )
}

