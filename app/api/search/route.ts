import { NextResponse } from "next/server";
import { searchAllProducts } from "@/app/lib/db/queries";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const q = searchParams.get("q") || "";
        const results = await searchAllProducts(q);
        return NextResponse.json(results ?? []);
    } catch (err) {
        return NextResponse.json([], { status: 200 });
    }
}