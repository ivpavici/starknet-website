"use client";

import { Box, Flex } from "@chakra-ui/react";

import { useMemo } from "react";
import algoliasearch from "src/libs/algoliasearch/lite";
import {
  InstantSearch,
  Configure,
} from "src/libs/react-instantsearch-hooks-web";
import { useHits } from "react-instantsearch-hooks";

import { ListCard } from "@ui/ListCards/ListCard";

export interface AutoProps {
  readonly params: {
    readonly locale: string;
  };
}

export interface Props extends AutoProps {
  readonly env: {
    readonly ALGOLIA_APP_ID: string;
    readonly ALGOLIA_SEARCH_API_KEY: string;
  };
}
export function BlockCommunityEventsList({
  params,
  env,
}: Props): JSX.Element | null {
  const searchClient = useMemo(() => {
    return algoliasearch(env.ALGOLIA_APP_ID, env.ALGOLIA_SEARCH_API_KEY);
  }, [env.ALGOLIA_APP_ID, env.ALGOLIA_SEARCH_API_KEY]);
  return (
    <InstantSearch searchClient={searchClient} indexName="web_events_dev">
      <Configure
        hitsPerPage={40}
        facetsRefinements={{ locale: [params.locale] }}
      />
      <Box>
        <CustomHits />
      </Box>
    </InstantSearch>
  );
}

type HitProps = {
  readonly hits: readonly {
    readonly start_date: string;
    readonly name: string;
    readonly image: string;
    readonly description: string;
    readonly tags: string[];
  }[];
};
function CustomHits() {
  const { hits }: HitProps = useHits();
  console.log("hits", hits);

  return (
    <>
      <Flex gap={4} direction="column" flex={1}>
        {hits.map((hit) => {
          return (
            <ListCard
              rounded
              key={hit?.name}
              startDateTime={hit?.start_date}
              image={hit.image}
              title={hit.name}
              description={hit.description}
              type={hit.tags}
            />
          );
        })}
      </Flex>
    </>
  );
}
