import StoreButton from "@ui/store/StoreButton";
import FiltersPanel from "@ui/store/filters/FiltersPanel";
import { searchParamsCache } from "@lib/searchParams";
import { fetchCameras, fetchLenses, fetchAerial } from "@lib/db/queries";
import { ItemsPanel } from "@ui/store/catalogue/ItemsPanel";
import { FilterChips } from "@ui/store/filters/FilterChips";
import { normalizeStoreFilters } from "@lib/filters/normalize";

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
        <div className="grid grid-cols-9">
          <div className="col-span-9 sticky top-0 z-40 bg-background border-b border-foreground">
            <div className="grid grid-cols-9 items-center py-2">
              <div className="col-span-9 lg:col-span-2 pl-4 py-2">
                <span className="text-xl text-nowrap">
                  {count === 0 ? "0 found..." : `${count} items found`}
                </span>
              </div>
              <div className="hidden lg:flex lg:pl-4 col-span-7 items-center">
                <FilterChips sz="md" />
              </div>
              <div className="ml-auto flex lg:hidden pr-4">
                <FiltersPanel
                  contentClassname="w-[65dvw]"
                  itemtype={filters.category}
                  type="mobile"
                />
              </div>
            </div>
          </div>
          <div className="hidden lg:block col-span-2 border-r border-foreground">
            <div className="sticky top-[60px]">
              <FiltersPanel itemtype={filters.category} type="desktop" />
            </div>
          </div>
          <div className="col-span-9 lg:col-span-7">
            <ItemsPanel items={items} />
          </div>
        </div>
      </section>
    </div>
  );
};