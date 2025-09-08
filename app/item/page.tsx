import React from 'react';
import { list } from '@vercel/blob';
import { CameraPage } from '@/app/ui/item/CameraPage';
import { searchParamsCache } from '@lib/searchParams';
import { SearchParams } from 'nuqs/server';
import { fetchCameras, fetchLenses } from '@lib/db/queries';
import { LensePage } from '@ui/item/LensePage';
import { Camera, Lense } from '@lib/db/schema';
import { isCamera, isLense } from '@lib/utils';

type PageProps = {
    searchParams: Promise<SearchParams>
}

export default async function Page({ searchParams }: PageProps) {
    const id = searchParamsCache.parse(await searchParams).id;
    const category = searchParamsCache.parse(await searchParams).category;
    const [items] = await fetchItems(category)
    async function allImages() {
        const blobs = await list();
        return blobs
    }
    const images = await allImages()
    function findImage(searchTerm: string) {
        const matchingImageBlobs = images.blobs.filter(blob =>
            blob.pathname.includes(searchTerm)
        )
        return matchingImageBlobs.length > 0 ? matchingImageBlobs[0] : null
    }

    const matchingIdItem = items.find((i) => i.id === id)
    function fetchItems(type: string) {
        switch (type) {
            case 'cam':
                return Promise.all([fetchCameras()])
            case 'len':
                return Promise.all([fetchLenses()])
            default:
                return []
        }
    }

    async function displayItem(item: Camera | Lense) {
        if (isCamera(item))
            return <CameraPage cam={item} image={findImage(item.id)} />
        else if (isLense(item))
            return <LensePage len={item} image={findImage(item.id)} />
        else
            return <div className="h-screen bg-pink-400">unknown item error</div>;
    }

    return (
        <>
            {matchingIdItem ? displayItem(matchingIdItem) : undefined}
        </>
    )
}

