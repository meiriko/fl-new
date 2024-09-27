import { createClient } from "./services/GraphQL/__generated__";
import { toServiceFromClient } from "./utils.ts";

export const client = createClient({
  url: import.meta.env.VITE_FINALOOP_GQL || "https://gql.finaloop.com",
  batch: false,
  headers: async () => {
    return {
      Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    };
    // const logRockerURL = getLogrocketSessionURL();
    // const correlationId = ulid();
    //
    // const headers: Record<string, string> = {
    //   "x-correlation-id": correlationId,
    //   "X-Amzn-Trace-Id": correlationId,
    //   "x-request-initiator": "customers-app",
    //   ...(logRockerURL && { "x-logrocket-url": logRockerURL }),
    // };
    //
    // if (withAuthToken) headers.Authorization = `Bearer ${await getAuthToken()}`;
    // return headers;
  },
});

// const vanillaChipCompnyId = "a85a932a-e826-424c-966e-6f5831ec47be";

export const toService = toServiceFromClient(client);

/*
async function test() {
  const dbg1 = toService("onboardingStatus", undefined, {
    // companyId: vanillaChipCompnyId,
    scope: "INVENTORY",
    companyId: vanillaChipCompnyId,
  });
  const dbg1Res = await dbg1(
    { scope: true },
    { companyId: vanillaChipCompnyId },
  );
  console.log(">>>> dbg1Res: ", dbg1Res);

  const dbg2 = tto(
    client,
    "onboardingStatus",
    undefined,
    { companyId: vanillaChipCompnyId },
    // { scope: 1 },
    // { companyId: vanillaChipCompnyId, scope: "INVENTORY" },
  );
  const dbgRes = await dbg2(
    { scope: true, step: true, status: true },
    { scope: "INVENTORY" },
  );
  console.log("dbg2: ", dbgRes);
}

test();
*/
