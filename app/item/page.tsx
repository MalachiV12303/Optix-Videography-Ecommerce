import { list } from "@vercel/blob";
import { searchParamsCache } from "@lib/searchParams";
import { fetchCameraById, fetchLenseById } from "@lib/db/queries";
import { CameraPage } from "@ui/item/CameraPage";
import { LensePage } from "@ui/item/LensePage";

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Page({ searchParams }: PageProps) {
  const normalized = searchParamsCache.parse(await searchParams);
  const { id, category } = normalized;
  console.log("category is", category);

  if (!id || !category) {
    return <div className="h-screen">Invalid item</div>;
  }

  const blobs = await list();
  const findImage = (itemId: string) =>
    blobs.blobs.find((b) => b.pathname.includes(itemId)) ?? null;

  if (category === "cam") {
    const cam = await fetchCameraById(id);
    console.log("cam is " + cam)
    if (!cam) return <div className="h-screen flex items-center justify-center">Camera Not found</div>;
    return <CameraPage item={cam} image={findImage(cam.id)} />;
  }
  else if (category === "len") {
    console.log("id is " + id);
    const len = await fetchLenseById(id);
    if (!len) return <div className="h-screen flex items-center justify-center">Lens Not found</div>;
    return <LensePage item={len} image={findImage(len.id)} />;
  }
  return <div className="h-screen">Unsupported item</div>;
};