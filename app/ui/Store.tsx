import StoreButton from "./store/StoreButton";
import FiltersPanel from "./store/filters/FiltersPanel";
import { searchParamsCache } from "@/app/lib/searchParams";
import { fetchCameras, fetchLenses, fetchAerial } from "../lib/db/queries";
import { ItemsPanel } from "./store/catalogue/ItemsPanel";
import { FilterChips } from "./store/filters/FilterChips";
import { getAllImages } from "../lib/utils";
import { normalizeStoreFilters } from "../lib/filters/normalize";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function Store({ searchParams }: PageProps) {
  const params = await searchParams;
  const raw = searchParamsCache.parse(params);
  const filters = normalizeStoreFilters(raw);

  const items =
    filters.category === "cam"
      ? await fetchCameras(filters)
      : filters.category === "len"
        ? await fetchLenses(filters)
        : await fetchAerial(filters);

  const count = items.length;

  return (
    <div className="w-full min-h-screen mb-24">
      <section className="w-full flex flex-col md:flex-row py-12 gap-4 lg:gap-8">
        <StoreButton buttonText="cameras" category="cam" imgSrc="/cameraButton.jpg" />
        <StoreButton buttonText="lenses" category="len" imgSrc="/lenseButton.jpg" />
        <StoreButton buttonText="aerial" category="aer" imgSrc="/droneButton.jpg" />
      </section>

      <section id="storeContent">
        <div className="h-full grid grid-cols-9">
          <div className="col-span-9 lg:col-span-2 flex items-center border-b border-foreground pl-4 py-2 sticky top-0 z-40 bg-background lg:static">
            <span className="text-xl py-2 text-nowrap">
              {count === 0 ? "0 found..." : `${count} items found`}
            </span>
            <div className="ml-auto flex lg:hidden items-center">
              <FiltersPanel
                contentClassname="w-[65dvw]"
                itemtype={filters.category}
                type="mobile"
              />
            </div>
          </div>

          <div className="hidden lg:block col-span-7 border-b border-foreground py-2 pl-4">
            <div className="flex h-full items-center">
              <FilterChips sz="md" />
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 h-min border-r border-foreground lg:block hidden">
            <FiltersPanel itemtype={filters.category} type="desktop" />
          </div>
          <div className="col-span-9 lg:col-span-7">
            <ItemsPanel items={items} images={await getAllImages()} />
          </div>
        </div>
      </section>
    </div>
  );
};