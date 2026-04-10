"use client";
import { useFilters } from "@lib/searchParams";
import { filterMap } from "@lib/utils";
import PriceSlider from "@ui/store/filters/PriceSlider";
import {
  Accordion,
  AccordionItem,
  Checkbox,
  CheckboxGroup,
} from "@heroui/react";

export function Filters({ it }: { it: string }) {
  if (it === "cam") return <CameraFilters />;
  if (it === "len") return <LenseFilters />;
  if (it === "aer") return <AerialFilters />;
  return null;
}

function getFilterValues(category: string, param: string) {
  return filterMap.find(
    (f) => f.category === category && f.param === param
  )?.values;
}

const accordionItemClasses = {
  content: "px-4",
  indicator: "text-foreground",
  trigger:
    "text-start w-full cursor-pointer px-4 font-sans uppercase text-lg tracking-wide border-b border-foreground",
};

function CameraFilters() {
  const [{ type, brand, res, shutter, mgp, mount }] = useFilters();

  return (
    <Accordion className="px-0" itemClasses={accordionItemClasses} selectionMode="multiple" showDivider={false} isCompact defaultExpandedKeys={["price","type","brand","res"]}>
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500} />
      </AccordionItem>

      <AccordionItem key="type" title={`type ${type.length || ""}`}>
        <FilterSet filters={getFilterValues("cam","type")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem key="brand" title={`brand ${brand.length || ""}`}>
        <FilterSet filters={getFilterValues("cam","brand")} param={brand} p="brand" />
      </AccordionItem>

      <AccordionItem key="res" title={`res ${res.length || ""}`}>
        <FilterSet filters={getFilterValues("cam","res")} param={res} p="res" text="p" />
      </AccordionItem>

      <AccordionItem key="shutter" title={`shutter ${shutter.length || ""}`}>
        <FilterSet filters={getFilterValues("cam","shutter")} param={shutter} p="shutter" />
      </AccordionItem>

      <AccordionItem key="megapixels" title={`eff. mgp ${mgp.length || ""}`}>
        <FilterSet filters={getFilterValues("cam","mgp")} param={mgp} p="mgp" />
      </AccordionItem>

      <AccordionItem key="mount" title={`mount ${mount.length || ""}`}>
        <FilterSet filters={getFilterValues("len","mount")} param={mount} p="mount" />
      </AccordionItem>
    </Accordion>
  );
}

function LenseFilters() {
  const [{ type, brand, minfl, maxfl, maxap, mount }] = useFilters();

  return (
    <Accordion className="px-0" itemClasses={accordionItemClasses} selectionMode="multiple" showDivider={false} isCompact defaultExpandedKeys={["price","type","mount"]}>
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500}/>
      </AccordionItem>

      <AccordionItem key="type" title={`type ${type.length || ""}`}>
        <FilterSet filters={getFilterValues("len","type")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem key="brand" title={`brand ${brand.length || ""}`}>
        <FilterSet filters={getFilterValues("len","brand")} param={brand} p="brand" />
      </AccordionItem>

      <AccordionItem key="mount" title={`mount ${mount.length || ""}`}>
        <FilterSet filters={getFilterValues("len","mount")} param={mount} p="mount" />
      </AccordionItem>

      <AccordionItem key="maxap" title={`maxap ${maxap.length || ""}`}>
        <FilterSet wrapperClassname="grid grid-cols-2" filters={getFilterValues("len","maxap")} param={maxap} p="maxap" />
      </AccordionItem>

      <AccordionItem key="minfl" title={`minfl ${minfl.length || ""}`}>
        <FilterSet filters={getFilterValues("len","minfl")} param={minfl} p="minfl" text="mm" textClassname="text-xs" />
      </AccordionItem>

      <AccordionItem key="maxfl" title={`maxfl ${maxfl.length || ""}`}>
        <FilterSet filters={getFilterValues("len","maxfl")} param={maxfl} p="maxfl" text="mm" textClassname="text-xs" />
      </AccordionItem>
    </Accordion>
  );
}

function AerialFilters() {
  const [{ type, brand }] = useFilters();

  return (
    <Accordion className="px-0" itemClasses={accordionItemClasses} selectionMode="multiple" showDivider={false} isCompact defaultExpandedKeys={["price","type","brand"]}>
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500}/>
      </AccordionItem>

      <AccordionItem key="type" title={`type ${type.length || ""}`}>
        <FilterSet filters={getFilterValues("aer","type")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem key="brand" title={`brand ${brand.length || ""}`}>
        <FilterSet containerClassname="grid grid-cols-2" filters={getFilterValues("aer","brand")} param={brand} p="brand" />
      </AccordionItem>
    </Accordion>
  );
}

function FilterSet({
  filters,
  param,
  p,
  text,
  textClassname,
  containerClassname,
  wrapperClassname,
}: {
  filters?: { label: string; value: string }[];
  param: string[];
  p: string;
  text?: string;
  textClassname?: string;
  containerClassname?: string;
  wrapperClassname?: string;
}) {
  const [, setFilters] = useFilters();
  const isBinary = filters?.length === 2;

  function handleChange(values: string[]) {
    if (isBinary && values.length > 1) {
      const lastSelected = values.find(v => !param.includes(v)) ?? values[0];
      setFilters({ [p]: [lastSelected] });
      return;
    }
    setFilters({ [p]: values });
  }

  return (
    <CheckboxGroup
      aria-label={p}
      value={param}
      classNames={{
        base: `pt-2 pb-2 ${containerClassname ?? ""}`,
        wrapper: `${wrapperClassname ?? ""}`,
      }}
      onValueChange={handleChange}
    >
      {filters?.map((fil) => (
        <Checkbox
          classNames={{ wrapper: "before:border before:border-foreground", icon: "text-background" }}
          radius="none"
          key={fil.value}
          value={fil.value}
        >
          {fil.label}
          {text && <span className={textClassname ?? ""}>{text}</span>}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
}