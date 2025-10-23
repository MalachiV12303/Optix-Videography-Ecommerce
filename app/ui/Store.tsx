import FiltersPanel from "./store/filters/FiltersPanel";
import { searchParamsCache } from "@/app/lib/searchParams";
import { fetchCameras, fetchLenses, fetchAerial } from "../lib/db/queries";
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
      case "aer":
        return fetchAerial();
      default:
        return [];
    }
  }
  const items = await fetchItems(category);
  const count = items.length;

  return (
    <div className="w-full min-h-screen mb-24">
      <section className="w-full flex flex-col sm:flex-row py-12 gap-4 lg:gap-8">
        <StoreButton buttonText="cameras" category="cam" imgSrc="/cameraButton.jpg" />
        <StoreButton buttonText="lenses" category="len" imgSrc="/lenseButton.jpg" />
        <StoreButton buttonText="aerial" category="aer" imgSrc="/droneButton.jpg" />
      </section>

      <section id="storeContent" className="scroll-mt-24">
        <div className="h-full grid grid-cols-5">
          <div className="col-span-5 lg:col-span-1 flex items-center border-b-1 border-foreground pl-4">
            <span className="text-xl py-2 text-nowrap">
              {count === 0 ? "0 found..." : `${count} items found`}
            </span>
            <div className="ml-auto flex lg:hidden items-center">
              <FiltersPanel contentClassname="w-[65dvw]" itemtype={category} type="mobile" />
            </div>
          </div>
          <div className="hidden lg:block col-span-4 border-b-1 border-foreground py-2 pl-4">
            <div className="flex h-full items-center">
              <FilterChips sz="md" />
            </div>
          </div>
          <div className="col-span-1 h-min border-r-1 border-foreground lg:block hidden">
              <FiltersPanel itemtype={category} type="desktop" />
          </div>
          <div className="col-span-5 lg:col-span-4">
              <ItemsPanel items={items} images={await getAllImages()} />
          </div>
        </div>
      </section>
    </div>
  );
}
