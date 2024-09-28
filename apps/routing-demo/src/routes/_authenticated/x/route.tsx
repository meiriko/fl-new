import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSvcQuery, toMutation } from "@fl/dataApi";
import { useCallback } from "react";
import { Box, Button, HStack, VStack } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { OnboardingStatus } from "@fl/dataApi/lib/services/GraphQL/__generated__";

export const Route = createFileRoute("/_authenticated/x")({
  component: XDisplay,
});

// const svc = _.ary(onboardingStatusSvc, 0);
// const svc = ({ queryKey }: { queryKey: string[] }) => {
//   const [_key, step] = queryKey;
//   console.log("fetch step: ", step);
//   return onboardingStatusSvc({ step });
// };

const vanillaChipCompanyId = "a85a932a-e826-424c-966e-6f5831ec47be";

const selection = { status: true, scope: true, step: true };
const input = {
  scope: "INVENTORY",
  companyId: vanillaChipCompanyId,
} as const;

const updateStep = toMutation("updateOnboardingStatus", selection, input);

function StepDisplay({
  step,
  queryKey,
}: {
  step: OnboardingStatus;
  queryKey: string[];
}) {
  const client = useQueryClient();
  const invalidate = useCallback(
    () => client.invalidateQueries({ queryKey }),
    [queryKey],
  );

  return (
    <HStack
      w="full"
      color={step.status === "PENDING" ? "red.500" : "green.500"}
      bg={step.status === "PENDING" ? "red.50" : "green.50"}
      gap={4}
      px={2}
      py={4}
      borderBottom="1px"
      borderColor="gray.300"
      _hover={{ bg: step.status === "PENDING" ? "red.100" : "green.100" }}
    >
      <Button
        isDisabled={step.status === "PENDING"}
        onClick={() => {
          updateStep({ step: step.step, status: "PENDING" }).then(invalidate);
        }}
      >
        pending
      </Button>
      <Button
        isDisabled={step.status === "COMPLETED"}
        onClick={() => {
          updateStep({ step: step.step, status: "COMPLETED" }).then(invalidate);
        }}
      >
        completed
      </Button>
      <Button
        variant={step.status === "PENDING" ? "primary" : "secondary"}
        onClick={() => {
          const status = step.status === "PENDING" ? "COMPLETED" : "PENDING";
          updateStep({ step: step.step, status }).then(invalidate);
        }}
      >
        toggle
      </Button>
      <Box>
        {step.step} = {step.status}
      </Box>
    </HStack>
  );
}

function XDisplay() {
  const queryKey = "onboardingStatus";

  const queryResponse = useSvcQuery(
    "onboardingStatus",
    queryKey,
    selection,
    input,
    // {
    //   step,
    //   // scope: "INVENTORY",
    // },
  );

  return (
    <VStack w="full" align="start" mb={10} gap={0}>
      <Box>Hello /_authenticated/welcome/x!</Box>
      {queryResponse.data?.map((step) => (
        <StepDisplay key={step.step} step={step} queryKey={[queryKey]} />
      ))}
      <Box mt={6}>
        <Outlet />
      </Box>
    </VStack>
  );
}
