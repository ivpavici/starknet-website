"use client";
import { Box, Stack, Divider, Text, Container } from "src/libs/chakra-ui";
import { Heading } from "@ui/Typography/Heading";

import React from "react";

type Props = {
  title: string | undefined;
  description: string | undefined;
  size?: "sm" | "lg";
};

export const SectionHeader = ({ size = "sm", title, description }: Props) => {
  return (
    <Box
      as="section"
      // pt={{ base: "4", md: "8" }} pb={{ base: "12", md: "12" }}
    >
      <Stack spacing="3" pb={6}>
        <Box>
          <Heading
            as="h2"
            variant="h2"
            fontSize={size === "sm" ? "3rem" : "5xl"}
            pb={size === "sm" ? 2 : 6}
            fontWeight="extrabold"
            color="heading-navy-fg"
          >
            {title}
          </Heading>
          <Text color="muted" fontSize="md" pb={8}>
            {description}
          </Text>
        </Box>
        <Divider variant="primary" />
      </Stack>
    </Box>
  );
};
