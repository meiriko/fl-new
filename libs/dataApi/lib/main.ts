import { createClient } from "./services/GraphQL/__generated__";
import { toMutationFromClient, toQueryFromClient } from "./utils.ts";
import { useCallback, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import type {
  QueryKey,
  QuerySelectionByKey,
  QueryInputByKey,
  QueryArgs,
} from "./utils.ts";

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

export const toService = toQueryFromClient(client);
export const toMutation = toMutationFromClient(client);

export function useSvcQuery<
  K extends QueryKey,
  S extends QuerySelectionByKey<K>,
  const I extends Partial<QueryInputByKey<K>> | undefined,
  A extends QueryArgs<K, S, I> = QueryArgs<K, S, I>,
  Q extends A[0] = A[0],
>(qKey: K, key: string, selection: S, input: I, q?: Q) {
  const queryFn = useMemo(() => {
    const baseSvc = toService(qKey, selection, input);
    return ({ queryKey: [_key, q] }: { queryKey: [string, Q?] }) =>
      baseSvc(...([q] as unknown as A));
  }, [qKey, selection, input]);

  return useQuery({
    queryKey: [key, q],
    queryFn,
  });
}

export function useQueryFromSvc<Q, R>(
  key: string,
  svc: (p: Q) => Promise<R>,
  q: Q,
) {
  const queryFn = useCallback(
    ({ queryKey: [_key, q] }: { queryKey: [string, Q] }) => svc(q),
    [svc],
  );
  return useQuery({
    queryKey: [key, q],
    queryFn,
  });
}

/*
const vanillaChipCompanyId = "a85a932a-e826-424c-966e-6f5831ec47be";
async function test() {
  const dbg1 = toService(
    "onboardingStatus",
    // { scope: true },
    undefined,
    {
      // companyId: vanillaChipCompanyId,
      // scope: "INVENTORY",
      companyId: vanillaChipCompanyId,
    },
  );
  const dbg1Res = await dbg1(
    {
      scope: "INVENTORY",
      // companyId: vanillaChipCompanyId,
    },
    // { scope: true },
    undefined,
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
