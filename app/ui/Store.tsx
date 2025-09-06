import FiltersPanel from "./store/filters/FiltersPanel";
import { searchParamsCache } from "@/app/lib/searchParams";
import { fetchCameras, fetchLenses } from "../lib/db/queries";
import { ItemsPanel } from "./store/catalogue/ItemsPanel";
import { FilterChips } from "./store/filters/FilterChips";
import { getAllImages } from "../lib/utils";
import StoreButton from "./store/StoreButton";

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

export async function Store({ searchParams }: PageProps) {
  const { category } = searchParamsCache.parse(searchParams);
  async function fetchItems(type: string) {
    switch (type) {
      case "cam":
        return fetchCameras();
      case "len":
        return fetchLenses();
      default:
        return [];
    }
  }
  const items = await fetchItems(category);
  const count = items.length;

  return (
    <div className="container">
      <section className="w-full flex flex-col sm:flex-row py-12 gap-8">
        <StoreButton buttonText="cameras" category="cam" imgSrc="/cameraButton.jpg" />
        <StoreButton buttonText="lenses" category="len" imgSrc="/lenseButton.jpg"/>
        <StoreButton buttonText="aerial" category="aer" imgSrc="/droneButton.jpg"/>
      </section>

      <section
        id="storeContent"
        className="scroll-mt-24 min-h-[90dvh] relative w-full flex flex-col mx-auto scrollbar items-center"
      >
        <div
          id="topLayer"
          className="bg-background sticky sm:relative top-0 w-full flex gap-4 py-2 px-4 justify-between border-b border-foreground"
        >
          <p className="text-nowrap text-xl">
            {count === 0 ? "0 found..." : `${count} items found`}
          </p>
          <div className="hidden md:flex w-full overflow-auto no-scrollbar">
            <FilterChips sz="sm" />
          </div>
          <div className="flex md:hidden items-center">
            <FiltersPanel contentClassname="w-[65dvw]" itemtype={category} type="mobile" />
          </div>
        </div>

        <div
          id="filtersAndItems"
          className="w-full h-fit relative sm:flex-none overflow-auto no-scrollbar flex flex-row"
        >
          <div className="relative hidden md:inline-block w-1/3 md:w-1/4 h-fit">
            <FiltersPanel itemtype={category} type="desktop" />
          </div>
          <ItemsPanel items={items} images={await getAllImages()} />
        </div>
      </section>
    </div>
  );
}
