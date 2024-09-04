import { redirect } from "@tanstack/react-router";
import _ from "lodash";

type TabConfig = {
  value: string;
  label?: string;
  component: JSX.ElementType;
};

type TabEntry =
  | JSX.ElementType
  | { label?: string; component: JSX.ElementType };

type TabsConfig = Record<string, TabEntry> | readonly TabConfig[];

// function firstPropOrDefaultGetter(propNames: string[], defaultValue: unknown) {
//   return (item: unknown) =>
//     _.get(
//       item,
//       _.find(propNames, (propName) => _.get(item, propName)) as string,
//       defaultValue
//     );
// }

function getPropOrKey(propNames: string | string[]) {
  return (item: unknown, key: string) => {
    const relevantKey = _.isArray(propNames)
      ? _.find(propNames, (propName) => _.get(item, propName))
      : propNames;
    return _.get(item, relevantKey as string, _.isObject(item) ? key : item);
  };
}

function getPropOrValue(propNames: string | string[]) {
  return (item: unknown) => {
    const relevantKey = _.isArray(propNames)
      ? _.find(propNames, (propName) => _.get(item, propName))
      : propNames;
    return _.get(item, relevantKey as string, item);
  };
}

function getWithKey(getter: (item: unknown, key: string) => unknown) {
  return (item: unknown, key: string) => [key, getter(item, key)];
}

type ConfigKeyType<T extends TabsConfig> =
  T extends Record<string, TabEntry>
    ? keyof T
    : (T & TabConfig[])[number]["value"];

export function toTabs<T extends TabsConfig>(tabs: T): ConfigKeyType<T>[] {
  return _.map(tabs, getPropOrKey("value")) as ConfigKeyType<T>[];
}

export function toTabNames(tabs: TabsConfig) {
  return _.map(tabs, getPropOrKey(["label", "value"])) as string[];
}

const labelValueKeys = [["label", "value"], ["value"]];

function toLabelValue(
  getter: (
    props: string | string[]
  ) => (item: unknown, key: string | never) => unknown
) {
  const mappers = _.map(labelValueKeys, getter);
  return (item: unknown, key: string) => _.map(mappers, (f) => f(item, key));
}

export function toTabLabels(
  tabs: TabsConfig
): { label: string; value: string }[] {
  return _.map(
    _.map(
      tabs,
      toLabelValue(_.isArray(tabs) ? getPropOrValue : getPropOrKey)
    ) as [string, string][],
    ([label, value]) => ({
      label,
      value,
    })
  );
}

export function toTabComponents(tabs: TabsConfig) {
  const getter = getPropOrValue("component");
  return _.fromPairs(_.map(tabs, getWithKey(getter)));
}

function asTabsParams<K extends string, TABS extends readonly string[]>() {
  return {
    parse: ((v) => v) as (v: unknown) => Record<K, TABS[number]>,
    stringify: (params: Record<string, string>) => params,
  };
}

function validateTab<K extends string, T extends readonly string[]>(
  tabKey: K,
  tabs: T
) {
  return ({
    params,
    search,
  }: {
    params: Record<K, string>;
    search: Record<string, unknown>;
  }) => {
    if (!tabs.includes(params[tabKey] as T[number])) {
      throw redirect({
        params: { [tabKey]: tabs[0] } as Parameters<
          typeof redirect
        >[0]["params"],
        search,
      });
    }
  };
}

export function toTabsProps<K extends string, T extends readonly string[]>(
  tabKey: K,
  tabs: T
) {
  return {
    beforeLoad: validateTab(tabKey, tabs),
    params: asTabsParams<K, T>(),
  };
}

export function addTabProps<P, K extends string, T extends readonly string[]>(
  props: P,
  tabKey: K,
  tabs: T
) {
  return {
    ...props,
    ...toTabsProps(tabKey, tabs),
  };
}

function navigateToDefaultTab(tabKey: string, defaultTab = "default") {
  return (config: {
    params: Record<string, string>;
    search: Record<string, unknown>;
    location: { pathname: string };
  }) => {
    if (defaultTab && !config.params[tabKey]) {
      throw redirect({
        to: `${config.location.pathname}/$${tabKey}`,
        params: { [tabKey]: defaultTab },
        search: config.search,
      });
    }
  };
}

export function toDefaultTabProps<T>(tabKey: string, defaultTab?: string) {
  return {
    beforeLoad: navigateToDefaultTab(tabKey, defaultTab),
    params: {
      parse: (v: T): T => v,
      stringify: (v: T) => v,
    },
  };
}

export function addDefaultTabProps<P, T>(
  props: P,
  tabKey: string,
  defaultTab?: string
) {
  return {
    ...props,
    ...toDefaultTabProps<T>(tabKey, defaultTab),
  };
}
