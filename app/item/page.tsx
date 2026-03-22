import { searchParamsCache } from "@lib/searchParams";
import { fetchCameraById, fetchLenseById, fetchAerialById } from "@lib/db/queries";
import ItemPage from "@ui/item/ItemPage";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const normalized = searchParamsCache.parse(await searchParams);
  const { id, category } = normalized;

  if (!id || !category) {
    return <div className="h-screen flex items-center justify-center">Invalid item</div>;
  }

  const image = {
    url: `${process.env.NEXT_PUBLIC_BLOB_BASE_URL}/items/${id}.webp`
  };
  console.log("Image URL:", image.url);

  if (category === "cam") {
    const item = await fetchCameraById(id);
    if (!item) return <div className="h-screen flex items-center justify-center">Camera Not Found</div>;
    return <ItemPage item={item} category="cam" image={image} />;
  }

  if (category === "len") {
    const item = await fetchLenseById(id);
    if (!item) return <div className="h-screen flex items-center justify-center">Lens Not Found</div>;
    return <ItemPage item={item} category="len" image={image} />;
  }

  if (category === "aer") {
    const item = await fetchAerialById(id);
    if (!item) return <div className="h-screen flex items-center justify-center">Aerial Not Found</div>;
    return <ItemPage item={item} category="aer" image={image} />;
  }

  return <div className="h-screen flex items-center justify-center">Unsupported Item</div>;
};