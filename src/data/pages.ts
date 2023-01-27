import { PageHeaderBlock } from "./../blocks/PageHeaderBlock";
import { AccordionItem } from "./../blocks/AccordionBlock";
import { defaultLocale } from "./i18n/config";
import { getFirst, getJSON } from "./utils";

export interface MarkdownBlock {
  readonly type: "markdown";
  readonly body: string;
}

export interface CommunityEventsBlock {
  readonly type: "community_events";
}
export interface DappsBlock {
  readonly type: "dapps";
  readonly no_of_items: number;
}

export interface BlockExplorersBlock {
  readonly type: "block_explorers";
  readonly no_of_items: number;
}
export interface BridgesBlock {
  readonly type: "bridges";
  readonly no_of_items: number;
}
export interface OnRampsBlock {
  readonly type: "on_ramps";
  readonly no_of_items: number;
}
export interface WalletsBlock {
  readonly type: "wallets";
  readonly no_of_items: number;
}
export interface BasicCardBlock {
  readonly type: "basic_card";
  readonly title: string;
  readonly link_label: string;
  readonly link_href: string;
  readonly size?: "sm" | "md";
}
export interface IconLinkCardBlock {
  readonly type: "icon_link_card";
  readonly title: string;

  readonly link_label: string;
  readonly link_href: string;
  readonly icon: string;
  readonly color?: "orange" | "blue" | "green" | "yellow";
}
export interface ImageIconLinkCardBlock {
  readonly type: "image_icon_link_card";
  readonly title: string;
  readonly link_label: string;
  readonly link_href: string;
  readonly icon: string;
  readonly description: string;
  readonly color?: "orange" | "blue" | "green" | "yellow";
}
export interface GetInvolvedBlock {
  readonly type: "get_involved_card";
  readonly title: string;
  readonly description: string;
  readonly link_label: string;
  readonly link_href: string;
}

export interface LargeCardBlock {
  readonly type: "large_card";
  readonly title: string;
  readonly link_label: string;
  readonly link_href: string;
  readonly size?: "sm" | "md";
  readonly description: string;
  readonly image: string;
  readonly orientation?: "left" | "right";
}
export interface LinkListItem {
  readonly type: "link_list_item";
  readonly label?: string;
  readonly href?: string;
  readonly sub_label?: string;
  readonly is_external?: boolean;
}

export interface AccordionItem {
  readonly type: "accordion_item";
  readonly title: string;
  readonly body: MarkdownBlock;
}
export interface OrderedItem {
  readonly type: "ordered_item";
  readonly title: string;
  readonly body: MarkdownBlock;
}
export interface PageHeaderBlock {
  readonly type: "page_header";
  readonly title: string;
  readonly description: string;
}

export interface HeroBlock {
  readonly type: "hero";
  readonly title: string;
  readonly description: string;
  readonly variant?:
    | "wallets"
    | "block_explorers"
    | "bridges"
    | "dapps"
    | "learn"
    | "build"
    | "community";
}

export type Block =
  | MarkdownBlock
  | CommunityEventsBlock
  | DappsBlock
  | BlockExplorersBlock
  | BridgesBlock
  | OnRampsBlock
  | WalletsBlock
  | BasicCardBlock
  | LargeCardBlock
  | IconLinkCardBlock
  | ImageIconLinkCardBlock
  | GetInvolvedBlock
  | HeroBlock
  | LinkListItem
  | AccordionItem
  | OrderedItem
  | PageHeaderBlock;

export interface Container {
  readonly type: "container";
  readonly max_width: number;
  readonly blocks: readonly Block[];
}
export interface FlexLayoutBlock {
  readonly type: "flex_layout";
  readonly base?: number;
  readonly md?: number;
  readonly lg?: number;
  readonly xl?: number;
  readonly heading?: string;
  readonly heading_variant?: "sm" | "md" | "lg";
  readonly blocks: readonly Block[];
}
export interface GroupBlock {
  readonly type: "group";
  readonly blocks: readonly Block[];
}
export interface LinkListBlock {
  readonly type: "link_list";
  readonly heading?: string;
  readonly blocks: readonly Block[];
}
export interface AccordionBlock {
  readonly type: "accordion";
  readonly heading?: string;
  readonly blocks: readonly Block[];
}
export interface OrderedBlock {
  readonly type: "ordered_block";
  readonly blocks: readonly Block[];
}

export type TopLevelBlock =
  | Block
  | FlexLayoutBlock
  | GroupBlock
  | Container
  | LinkListBlock
  | AccordionBlock
  | OrderedBlock;

export interface Page {
  readonly id: string;
  readonly slug: string;
  readonly title: string;
  readonly template: "landing" | "content";
  readonly breadcrumbs: boolean;
  readonly pageLastUpdated: boolean;
  readonly blocks: readonly TopLevelBlock[];
}

export async function getPageBySlug(
  slug: string,
  locale: string
): Promise<Page> {
  try {
    return (await getFirst(
      () => getJSON(`_dynamic/pages/${locale}/${slug}.json`),
      () => getJSON(`_dynamic/pages/${defaultLocale}/${slug}.json`)
    )) as Page;
  } catch (cause) {
    throw new Error(`Page not found! ${slug}`, {
      cause,
    });
  }
}
