import { Box } from "@chakra-ui/react";
import { createFileRoute } from "@tanstack/react-router";
import { FLLinkTabs } from "@fl/routing-components";
import { addTabProps } from "@fl/routing";

const segments = ["seg1", "segment2", "s3"] as const;

export const Route = createFileRoute("/miro/$miroId/$tabId/$segId")(
  addTabProps(
    {
      component: SegDisplay,
    },
    "segId",
    segments
  )
);

function SegDisplay() {
  const params = Route.useParams();
  return (
    <Box>
      <Box>inside seg</Box>
      <Box>{JSON.stringify(params, null, 2)}</Box>
      <FLLinkTabs tabs={segments} tabKey="segId" h={10} w="full" />
    </Box>
  );
}
