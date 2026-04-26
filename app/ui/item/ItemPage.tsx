"use client";
import Image from 'next/image';
import { CanonLogo, Checkmark, NikonLogo, PanasonicLogo, SonyLogo } from '@ui/SvgLibrary';
import { useAddToCartModal } from '@/app/context/AddToCartModalContext';
import { createCartItem } from '@lib/cart/createCartItem';
import { Camera, Lense, Aerial } from '@lib/db/schema';

type ItemProps = {
    item: Camera | Lense | Aerial;
    category: "cam" | "len" | "aer";
    image: { url: string } | null;
};

export default function ItemPage({ item, category, image }: ItemProps) {
    const { open } = useAddToCartModal();

    const brand = item.brand;
    const name = item.name;
    const price = item.price ?? 0;
    const id = item.id;

    const cartItem = createCartItem({
        id,
        itemtype: category,
        brand,
        name,
        price,
        imageUrl: image?.url ?? null,
        protection: null,
        protectionPrice: 0,
    });

    const isCamera = category === "cam";
    const isLens = category === "len";
    const isAerial = category === "aer";


    return (
        <section className="flex flex-col">
            {/* <div className="py-4 container">Home / {(item as any).brand} {(item as any).name}</div> */}
            <div className="container flex flex-col sm:flex-row gap-8 items-start mb-16 mt-8">
                <div className="sm:flex-1 border border-foreground w-full h-[35vh] sm:h-[50vh] md:h-[70vh] flex items-center justify-center p-8 lg:p-32">
                    {image ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={image.url}
                                alt={`Image of ${(item as any).brand} ${(item as any).name}`}
                                fill
                                className="object-contain"
                            />
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full">No Image</div>
                    )}
                </div>

                <div className="w-full sm:w-[45%] lg:w-[35%] sticky top-24">
                    <div className="border border-foreground p-6 flex flex-col gap-4">
                        {isCamera && (() => {
                            switch ((item as Camera).brand) {
                                case 'Nikon': return <NikonLogo width={35} height={35} />;
                                case 'Canon': return <CanonLogo width={90} height={35} />;
                                case 'Panasonic': return <PanasonicLogo width={100} height={35} />;
                                case 'Sony': return <SonyLogo width={100} height={35} />;
                                default: return null;
                            }
                        })()}
                        <span className="text-2xl font-semibold">{(item as any).brand} {(item as any).name}</span>
                        <p className="text-foreground-muted text-sm">ID#: {(item as any).id}</p>
                        <div className="text-sm flex flex-wrap gap-2 my-2">
                            <span className="px-4 py-1 border border-foreground rounded-full">
                                In Stock
                                <Checkmark className="ml-2 inline-block" width={12} height={12} />
                            </span>
                        </div>
                        <div className="flex flex-col gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
                            <p className="text-3xl font-semibold">${(item as any).price}</p>
                            <button
                                onClick={() => open(cartItem)}
                                className="bg-primary hover:bg-primary-muted text-background px-5 py-2 transition-colors"
                            >
                                Add To Cart
                            </button>
                        </div>
                        <div className="text-sm border-t border-foreground pt-4">{(item as any).description}</div>
                    </div>
                </div>
            </div>

            <div className="border-t border-foreground">
                <div className="sticky top-0 z-40 bg-background border-b border-foreground backdrop-blur">
                    <div className="container flex flex-wrap items-center gap-8 py-4 text-lg">
                        <a href="#overview" className="hover:underline">Overview</a>
                        <a href="#specs" className="hover:underline">Specifications</a>
                        {/* <a href="#compatibility" className="hover:underline">Compatibility</a> */}
                        <a href="#reviews" className="hover:underline">Reviews</a>
                        <a href="#support" className="hover:underline">Support</a>
                    </div>
                </div>

                <section id="overview" className="container py-16">
                    <h2 className="text-3xl font-semibold mb-6">Overview</h2>
                    <div className="grid md:grid-cols-2 gap-12 items-start">
                        <div className="space-y-4 text-foreground-muted leading-relaxed">
                            {category === "cam" && (
                                <>
                                    <p>
                                        The <span className="font-semibold text-foreground">{item.brand} {item.name}</span> is a professional-grade {item.type === "DSLR" ? "DSLR" : "mirrorless"} camera designed for photographers and creators who demand speed, reliability, and stunning image quality.
                                    </p>
                                    <p>
                                        Equipped with a powerful <span className="font-semibold text-foreground">{(item as Camera).megapixels}MP</span> sensor and crisp <span className="font-semibold text-foreground">{(item as Camera).res}p</span> resolution, it delivers incredible detail for photography and video production.
                                    </p>
                                    <p>
                                        Built with premium materials, an ergonomic grip, and weatherproof design, it is ideal for long shooting sessions in any environment.
                                    </p>
                                </>
                            )}
                            {category === "len" && (
                                <>
                                    <p>
                                        The <span className="font-semibold text-foreground">{item.brand} {item.name}</span> is a high-performance lens engineered for precision and clarity. Perfect for professional photographers looking to capture sharp and vibrant images.
                                    </p>
                                    <p>
                                        With a focal range of <span className="font-semibold text-foreground">{(item as Lense).minfl}-{(item as Lense).maxfl}mm</span> and a max aperture of <span className="font-semibold text-foreground">{(item as Lense).maxap}</span>, it excels in both low-light and fast-action situations.
                                    </p>
                                    <p>
                                        Durable and weather-sealed, this lens provides reliability in any shooting environment.
                                    </p>
                                </>
                            )}
                            {category === "aer" && (
                                <>
                                    <p>
                                        The <span className="font-semibold text-foreground">{item.brand} {item.name}</span> aerial device offers exceptional aerial performance, combining stability, range, and high-resolution imaging for both photography and surveying.
                                    </p>
                                    <p>
                                        Featuring flight time up to <span className="font-semibold text-foreground">{(item as Aerial).time}</span> and a max altitude of <span className="font-semibold text-foreground">{(item as Aerial).altitude}</span>, it delivers reliable results for professional applications.
                                    </p>
                                    <p>
                                        Built with durable materials and weather-resistant components, it is suitable for a variety of environments.
                                    </p>
                                </>
                            )}
                        </div>

                        <div className="bg-background border border-foreground p-6 space-y-4">
                            <h3 className="font-semibold text-lg">Key Highlights</h3>
                            <ul className="space-y-2">
                                {category === "cam" && (
                                    <>
                                        <li>• High-resolution {(item as Camera).megapixels}MP image sensor</li>
                                        <li>• {item.type === "DSLR" ? "Optical" : "Electronic"} viewfinder system</li>
                                        <li>• Professional video up to {(item as Camera).res}p</li>
                                        <li>• Interchangeable lens system</li>
                                        <li>• Durable weather-sealed body</li>
                                    </>
                                )}
                                {category === "len" && (
                                    <>
                                        <li>• Precision-engineered lens optics</li>
                                        <li>• Focal range {(item as Lense).minfl}-{(item as Lense).maxfl}mm</li>
                                        <li>• Max aperture {(item as Lense).maxap}</li>
                                        <li>• Compatible with multiple mounts: {(item as Lense).mount.join(", ")}</li>
                                        <li>• Durable and weather-resistant design</li>
                                    </>
                                )}
                                {category === "aer" && (
                                    <>
                                        <li>• Long flight time: {(item as Aerial).time}</li>
                                        <li>• High-resolution imaging: {(item as Aerial).res}p</li>
                                        <li>• Maximum altitude: {(item as Aerial).altitude}</li>
                                        <li>• Maximum distance: {(item as Aerial).distance}</li>
                                        <li>• Weatherproof and rugged build</li>
                                    </>
                                )}
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="specs" className="container py-16 border-t border-foreground">
                    <h2 className="text-3xl font-semibold mb-10">Specifications</h2>
                    <div className="grid md:grid-cols-2 gap-x-16 gap-y-8 text-sm">
                        <Spec label="Brand" value={(item as any).brand} />
                        <Spec label="Model" value={(item as any).name} />
                        {isCamera && <>
                            <Spec label="Camera Type" value={(item as Camera).type} />
                            <Spec label="Sensor Resolution" value={`${(item as Camera).megapixels} Megapixels`} />
                            <Spec label="Max Video Resolution" value={`${(item as Camera).res}p`} />
                            <Spec label="Shutter Speed" value={(item as Camera).shutter ?? "1/8000 – 30s"} />
                            <Spec label="Lens Mount" value={(item as Camera).mount?.join(", ") ?? "—"} />
                            <Spec label="Storage Support" value={(item as Camera).storage?.join(", ") ?? "—"} />
                        </>}
                        {isLens && <>
                            <Spec label="Lens Type" value={(item as Lense).type} />
                            <Spec label="Mounts" value={(item as Lense).mount?.join(", ") ?? "—"} />
                            <Spec label="Max Aperture" value={(item as Lense).maxap} />
                            <Spec label="Focal Length" value={`${(item as Lense).minfl}-${(item as Lense).maxfl}mm`} />
                        </>}
                        {isAerial && <>
                            <Spec label="Max Flight Time" value={(item as Aerial).time} />
                            <Spec label="Resolution" value={`${(item as Aerial).res}p`} />
                            <Spec label="Max Distance" value={(item as Aerial).distance} />
                            <Spec label="Max Altitude" value={(item as Aerial).altitude} />
                            <Spec label="Types" value={(item as Aerial).type?.join(", ") ?? "—"} />
                        </>}
                    </div>
                </section>

                <section id="reviews" className="container py-16 border-t border-foreground">
                    <h2 className="text-3xl font-semibold mb-10">Customer Reviews</h2>
                    <div className="grid grid-cols-2 gap-8">
                        <Review name="Skai W." rating={5} text="Excellent product quality and performance." />
                        <Review name="Jordan R." rating={4} text="Very solid and reliable. Minor improvements possible." />
                        <Review name="Alice F." rating={5} text="Professional results and easy to use." />
                        <Review name="Taylor K." rating={5} text="Exactly what I wanted." />
                    </div>
                </section>

                <section id="support" className="container py-16 border-t border-foreground mb-24">
                    <h2 className="text-3xl font-semibold mb-10">Support</h2>
                    <div className="grid md:grid-cols-3 gap-8 text-sm">
                        <SupportCard title="Warranty" text="Standard 1-year manufacturer warranty." />
                        <SupportCard title="Manuals & Downloads" text="Access setup guides, manuals, and firmware updates." />
                        <SupportCard title="Service & Repairs" text="Professional maintenance and repair services available." />
                    </div>
                </section>
            </div>
        </section>
    );
};

function Spec({ label, value }: { label: string; value: string | number }) {
    return (
        <div className="flex justify-between border-b border-foreground py-3">
            <span className="text-foreground-muted">{label}</span>
            <span className="font-medium text-right">{value}</span>
        </div>
    );
};

function Review({ name, rating, text }: { name: string; rating: number; text: string }) {
    return (
        <div className="border border-foreground p-6 space-y-3 group">
            <div className="flex justify-between items-center">
                <span className="font-semibold">{name}</span>
                <span className="text-sm">{"★".repeat(rating)}{"☆".repeat(5 - rating)}</span>
            </div>
            <p className="text-foreground-muted group-hover:text-foreground transition-colors">{text}</p>
        </div>
    );
};

function SupportCard({ title, text }: { title: string; text: string }) {
    return (
        <div className="border border-foreground p-6 space-y-2">
            <h3 className="font-semibold hover:underline cursor-pointer">{title}</h3>
            <p className="text-foreground-muted">{text}</p>
        </div>
    );
};