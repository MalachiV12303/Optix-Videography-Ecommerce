"use client";
import Image from 'next/image';
import { Camera } from '@/app/lib/db/schema';
import { notFound } from 'next/navigation';
import { ListBlobResultBlob } from '@vercel/blob';
import Link from 'next/link';
import { CanonLogo, Checkmark, NikonLogo, PanasonicLogo, SonyLogo } from '../SvgLibrary';
import { useAddToCartModal } from '@/app/context/AddToCartModalContext';
import { createCartItem } from '@/app/lib/cart/createCartItem';

export function CameraPage({ item, image }: { item: Camera; image: ListBlobResultBlob | null }) {
  const { open } = useAddToCartModal();
  if (!item) return notFound();
  const category = "cam";
  const cartItem = createCartItem({
    id: item.id,
    itemtype: category,
    brand: item.brand,
    name: item.name,
    price: item.price ?? 0,
    imageUrl: image?.url ?? null,
    protection: null,
    protectionPrice: 0,
  });

  return (
    <section className="min-h-[calc(100vh-5rem)] sm:h-[calc(100vh-6rem)] flex flex-col md:flex-row md:items-center">
      <div className="flex md:mr-4 gap-4 flex-1 min-h-48">
        <div className="flex-1 p-8">
          <div className="relative aspect-square">
            {image ? (
              <Image
                fill
                src={image.url}
                alt={`Image of ${item.brand} ${item.name}`}
                className="object-contain sm:p-24"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col p-4 border-1 border-foreground w-full md:w-[50%] lg:w-[40%]">
        {(() => {
          switch (item.brand) {
            case 'Nikon': return <NikonLogo width={35} height={35} />;
            case 'Canon': return <CanonLogo width={90} height={35} />;
            case 'Panasonic': return <PanasonicLogo width={100} height={35} />;
            case 'Sony': return <SonyLogo width={100} height={35} />;
            default: return <></>;
          }
        })()}

        <div className="flex flex-col gap-2 text-nowrap w-full">
          <span className="text-2xl font-semibold text-wrap">
            {item.brand} {item.name} {item.type === "DSLR" ? "Digital Camera" : "Mirrorless Camera"}
          </span>

          <p className="text-foreground-muted">ID#: {item.id}</p>

          <div className="text-sm my-4">
            <span className="px-4 py-1 border-1 border-foreground rounded-full mr-2">
              In Stock: Online<Checkmark className="ml-2 inline-block" width={12} height={12} />
            </span>
            <span className="px-4 py-1 border-1 border-foreground rounded-full">In Store Availability</span>
          </div>

          <div className="flex w-full justify-between items-center">
            <p className="text-3xl font-bold">${item.price}</p>

            <button
              onClick={() => open(cartItem)}
              className="bg-primary hover:bg-primary-muted text-background px-4 py-2 transition-colors"
            >
              Add To Cart
            </button>
          </div>

          <div className="flex flex-col">
            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">Description</span>
            <div className="py-2 px-4 text-sm text-wrap">{item.description}</div>

            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">Details</span>
            <div className="py-2 px-4 text-wrap">
              <span><span className="font-semibold">Shutter speed: </span>{item.shutter}</span><br />
              <span><span className="font-semibold">Resolution: </span>{item.res}p</span>
            </div>

            <span className="font-bold px-4 py-2 text-lg border-b-1 border-foreground">Compatible With</span>
            <div className="py-2 px-4 text-sm text-wrap">
              <div className="flex flex-wrap gap-2">
                <span className="font-semibold">Storage: </span>{item.storage?.map((sdtype, index) => <span key={index}>{sdtype}</span>)}
              </div>
              <div className="flex gap-2">
                <span className="font-semibold">Mount type: </span>
                {item.mount?.map((lentype, index) => {
                  const params = new URLSearchParams();
                  params.set('category', 'len');
                  params.set('mount', lentype);
                  return <Link href={`/store?${params}`} key={index}>{lentype}</Link>;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}