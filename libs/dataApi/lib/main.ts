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

export const toService = toServiceFromClient(client);

/*
const vanillaChipCompanyId = "a85a932a-e826-424c-966e-6f5831ec47be";
async function test() {
  const dbg1 = toService(
    "onboardingStatus",
    { scope: true },
    {
      // companyId: vanillaChipCompanyId,
      scope: "INVENTORY",
      companyId: vanillaChipCompanyId,
    },
  );
  const dbg1Res = await dbg1(
    { companyId: vanillaChipCompanyId },
    // { scope: true },
  );
  console.log(">>>> dbg1Res: ", dbg1Res);

  // const dbg2 = tto(
  //   client,
  //   "onboardingStatus",
  //   undefined,
  //   { companyId: vanillaChipCompanyId },
  //   // { scope: 1 },
  //   // { companyId: vanillaChipCompanyId, scope: "INVENTORY" },
  // );
  // const dbgRes = await dbg2(
  //   { scope: true, step: true, status: true },
  //   { scope: "INVENTORY" },
  // );
  // console.log("dbg2: ", dbgRes);
}

test();
*/
