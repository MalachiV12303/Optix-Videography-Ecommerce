import React from 'react'
import { useFilters } from '@/app/lib/searchParams'
import { filtermap } from '@/app/lib/utils'
import { PriceSlider } from './PriceSlider'
import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from '@nextui-org/react'

export function Filters({ it }: { it: string }) {
    return it === 'cam' ? <CameraFilters /> :
        it === 'len' ? <LenseFilters /> :
            it === 'aer' ? <AerialFilters /> :
                <div>no filters found</div>;
}

const accordionClassNames = { content: 'py-4 px-4', indicator: 'text-foreground', trigger: "w-full flex items-center justify-between cursor-pointer px-4 font-sans uppercase text-lg tracking-wide border-b-1 border-foreground", };

function CameraFilters() {
    const [{ type, brand, res, shutter, mgp }] = useFilters()
    return (
        <Accordion className="px-0" itemClasses={accordionClassNames} selectionMode="multiple" showDivider={false} fullWidth isCompact={true} defaultExpandedKeys={['price', 'type', 'brand', 'res', 'shutter', 'megapixels']} >
            <AccordionItem key="price" aria-label="price" title={'price'}>
                <PriceSlider />
            </AccordionItem>
            <AccordionItem key="type" aria-label="type" title={'type ' + (type.length != 0 ? type.length : '')}>
                <FilterSet filters={filtermap.get('cameratypes')} param={type} p={'type'} />
            </AccordionItem>
            <AccordionItem key="brand" aria-label="brand" title={'brand ' + (brand.length != 0 ? brand.length : '')}>
                <FilterSet filters={filtermap.get('camerabrands')} param={brand} p={'brand'} />
            </AccordionItem>
            <AccordionItem key="res" aria-label="res" title={'res ' + (res.length != 0 ? res.length : '')}>
                <FilterSet filters={filtermap.get('resolutions')} param={res} p={'res'} text={'p'} />
            </AccordionItem>
            <AccordionItem key="shutter" aria-label="shutter" title={'shutter ' + (shutter.length != 0 ? shutter.length : '')}>
                <FilterSet filters={filtermap.get('shutterspeeds')} param={shutter} p={'shutter'} />
            </AccordionItem>
            <AccordionItem key="megapixels" aria-label="eff. mgp" title={'eff. mgp ' + (mgp.length != 0 ? mgp.length : '')}>
                <FilterSet filters={filtermap.get('megapixels')} param={mgp} p={'mgp'} text={' megapixels'} />
            </AccordionItem>
        </Accordion>
    )
}

function LenseFilters() {
    const [{ type, brand, minfl, maxfl, maxap, mount }] = useFilters()
    return (
        <Accordion className="px-0" itemClasses={accordionClassNames} selectionMode="multiple" showDivider={false} fullWidth isCompact={true} defaultExpandedKeys={['price', "type", "brand", "maxap", "minfl", "maxfl", "mount"]} >
            <AccordionItem key="price" aria-label="price" title="price">
                <PriceSlider />
            </AccordionItem>
            <AccordionItem key="type" aria-label="type" title={'type ' + (type.length != 0 ? type.length : '')}>
                <FilterSet filters={filtermap.get('lensetypes')} param={type} p={'type'} />
            </AccordionItem>
            <AccordionItem key="brand" aria-label="brand" title={'brand ' + (brand.length != 0 ? brand.length : '')}>
                <FilterSet containerClassname={'grid grid-cols-2 overflow-hidden'} filters={filtermap.get('lensebrands')} param={brand} p={'brand'} />
            </AccordionItem>
            <AccordionItem key="maxap" aria-label="maxap" title={'maxap ' + (maxap.length != 0 ? maxap.length : '')}>
                <FilterSet containerClassname={'grid grid-cols-2 overflow-hidden'} filters={filtermap.get('apertures')} param={maxap} p={'maxap'} />
            </AccordionItem>
            <AccordionItem key="minfl" aria-label="minfl" title={'minfl ' + (minfl.length != 0 ? minfl.length : '')}>
                <FilterSet containerClassname={'grid grid-cols-2 overflow-hidden'} text={'mm'} textClassname={'text-xs'} filters={filtermap.get('focallengths')} param={minfl} p={'minfl'} />
            </AccordionItem>
            <AccordionItem key="maxfl" aria-label="maxfl" title={'maxfl ' + (maxfl.length != 0 ? maxfl.length : '')}>
                <FilterSet containerClassname={'grid grid-cols-2 overflow-hidden'} text={'mm'} textClassname={'text-xs'} filters={filtermap.get('focallengths')} param={maxfl} p={'maxfl'} />
            </AccordionItem>
            <AccordionItem key="mount" aria-label="mount" title={'mount ' + (mount.length != 0 ? mount.length : '')}>
                <FilterSet containerClassname={'grid grid-cols-2 overflow-hidden'} filters={filtermap.get('mount')} param={mount} p={'mount'} />
            </AccordionItem>
        </Accordion>
    )
}

function AerialFilters() {
    const [{ type, brand }] = useFilters()
    return (
        <Accordion showDivider={false} className="px-0" fullWidth itemClasses={{ content: 'py-4 px-4', title: 'text-background', indicator: 'text-background', trigger: 'my-1 bg-foreground text-background px-4' }} isCompact={true} selectionMode="multiple">
            <AccordionItem key="price" aria-label="price" title="price">
                <PriceSlider />
            </AccordionItem>
            <AccordionItem key="type" aria-label="type" title="type">
                <FilterSet filters={filtermap.get('aerialtypes')} param={type} p={'type'} />
            </AccordionItem>
            <AccordionItem key="brand" aria-label="brand" title="brand">
                <FilterSet filters={filtermap.get('aerialbrands')} param={brand} p={'brand'} />
            </AccordionItem>
        </Accordion>
    )
}

function FilterSet({ filters, param, p, text, textClassname, containerClassname }: { filters: string[] | undefined, param: string[], p: string, text?: string, textClassname?: string, containerClassname?: string }) {
    const [, setFilters] = useFilters()
    return (
        <CheckboxGroup
            aria-label={p}
            size="sm"
            classNames={{ wrapper: `${containerClassname} text-background text-base`, }}
            color="primary"
            value={param}
            onValueChange={(e) => setFilters({ [p]: e })}
        >
            {filters?.map((fil) => (
                <Checkbox
                    classNames={{
                        wrapper: 'mt-[3px] before:rounded-none before:border-foreground before:border before:rounded-sm after:bg-transparent overflow-visible',
                    }}
                    className='min-w-full text-foreground' key={fil} value={fil}>{fil}<span className={`${textClassname}`}>{text}</span></Checkbox>
            ))}
        </CheckboxGroup>
    )
}