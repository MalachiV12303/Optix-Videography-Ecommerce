"use client";
import { useFilters } from "@lib/searchParams";
import { filtermap } from "@lib/utils";
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
};

const accordionItemClasses = {
  content: "px-4",
  indicator: "text-foreground",
  trigger:
    "text-start w-full cursor-pointer px-4 font-sans uppercase text-lg tracking-wide border-b border-foreground",
};

function CameraFilters() {
  const [{ type, brand, res, shutter, mgp }] = useFilters();

  return (
    <Accordion
      className="px-0"
      itemClasses={accordionItemClasses}
      selectionMode="multiple"
      showDivider={false}
      isCompact
      defaultExpandedKeys={[
        "price",
        "type",
        "brand",
        "res",
        "shutter",
        "megapixels",
      ]}
    >
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500} />
      </AccordionItem>

      <AccordionItem
        key="type"
        title={`type ${type.length || ""}`}
      >
        <FilterSet filters={filtermap.get("cameratypes")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem
        key="brand"
        title={`brand ${brand.length || ""}`}
      >
        <FilterSet filters={filtermap.get("camerabrands")} param={brand} p="brand" />
      </AccordionItem>

      <AccordionItem
        key="res"
        title={`res ${res.length || ""}`}
      >
        <FilterSet
          filters={filtermap.get("resolutions")}
          param={res}
          p="res"
          text="p"
        />
      </AccordionItem>

      <AccordionItem
        key="shutter"
        title={`shutter ${shutter.length || ""}`}
      >
        <FilterSet
          filters={filtermap.get("shutterspeeds")}
          param={shutter}
          p="shutter"
        />
      </AccordionItem>

      <AccordionItem
        key="megapixels"
        title={`eff. mgp ${mgp.length || ""}`}
      >
        <FilterSet
          filters={filtermap.get("megapixels")}
          param={mgp}
          p="mgp"
          text=" megapixels"
        />
      </AccordionItem>
    </Accordion>
  );
};

function LenseFilters() {
  const [{ type, brand, minfl, maxfl, maxap, mount }] = useFilters();

  return (
    <Accordion
      className="px-0"
      itemClasses={accordionItemClasses}
      selectionMode="multiple"
      showDivider={false}
      isCompact
      defaultExpandedKeys={[
        "price",
        "type",
        "brand",
        "maxap",
        "minfl",
        "maxfl",
        "mount",
      ]}
    >
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500}/>
      </AccordionItem>

      <AccordionItem key="type" title={`type ${type.length || ""}`}>
        <FilterSet filters={filtermap.get("lensetypes")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem key="brand" title={`brand ${brand.length || ""}`}>
        <FilterSet
          filters={filtermap.get("lensebrands")}
          param={brand}
          p="brand"
        />
      </AccordionItem>

      <AccordionItem key="mount" title={`mount ${mount.length || ""}`}>
        <FilterSet
          filters={filtermap.get("mount")}
          param={mount}
          p="mount"
        />
      </AccordionItem>

      <AccordionItem key="maxap" title={`maxap ${maxap.length || ""}`}>
        <FilterSet
          wrapperClassname="grid grid-cols-2"
          filters={filtermap.get("apertures")}
          param={maxap}
          p="maxap"
        />
      </AccordionItem>

      <AccordionItem key="minfl" title={`minfl ${minfl.length || ""}`}>
        <FilterSet
          filters={filtermap.get("focallengths")}
          param={minfl}
          p="minfl"
          text="mm"
          textClassname="text-xs"
        />
      </AccordionItem>

      <AccordionItem key="maxfl" title={`maxfl ${maxfl.length || ""}`}>
        <FilterSet
          filters={filtermap.get("focallengths")}
          param={maxfl}
          p="maxfl"
          text="mm"
          textClassname="text-xs"
        />
      </AccordionItem>

    </Accordion>
  );
};

function AerialFilters() {
  const [{ type, brand }] = useFilters();

  return (
    <Accordion
      className="px-0"
      itemClasses={accordionItemClasses}
      selectionMode="multiple"
      showDivider={false}
      isCompact
      defaultExpandedKeys={[
        "price",
        "type",
        "brand",
      ]}
    >
      <AccordionItem key="price" title="price">
        <PriceSlider min={0} max={2500}/>
      </AccordionItem>

      <AccordionItem key="type" title={`type ${type.length || ""}`}>
        <FilterSet filters={filtermap.get("aerialtypes")} param={type} p="type" />
      </AccordionItem>

      <AccordionItem key="brand" title={`brand ${brand.length || ""}`}>
        <FilterSet
          containerClassname="grid grid-cols-2"
          filters={filtermap.get("aerialbrands")}
          param={brand}
          p="brand"
        />
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
  filters?: string[];
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
        <Checkbox classNames={{ wrapper: "before:border before:border-foreground", icon: "text-background" }} radius="none" key={fil} value={fil}>
          {fil}
          {text && <span className={`${textClassname ?? ""}`}>{text}</span>}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};