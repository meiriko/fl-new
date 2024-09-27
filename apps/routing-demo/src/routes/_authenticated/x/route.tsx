import { createFileRoute, Outlet } from "@tanstack/react-router";
import { toService } from "@fl/dataApi";
import { useCallback, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
// import _ from "lodash";

export const Route = createFileRoute("/_authenticated/x")({
  component: XDisplay,
});

const vanillaChipCompanyId = "a85a932a-e826-424c-966e-6f5831ec47be";
if (!vanillaChipCompanyId) {
  console.log("missing companyId");
}

const onboardingStatusSvc = toService(
  "onboardingStatus",
  { status: true, scope: true, step: true },
  {
    scope: "DASHBOARD",
    companyId: vanillaChipCompanyId,
  },
);

onboardingStatusSvc(
  {
    scope: "INVENTORY",
  },
  { status: true },
).then(console.log);

function useSvcQuery<Q, R>(key: string, svc: (p: Q) => Promise<R>, q: Q) {
  const queryFn = useCallback(
    ({ queryKey: [_key, q] }: { queryKey: [string, Q] }) => {
      console.log(`fetch ${JSON.stringify(q, null, 2)}`);
      return svc(q);
    },
    [svc],
  );
  return useQuery({
    queryKey: [key, q],
    queryFn,
  });
}

// const svc = _.ary(onboardingStatusSvc, 0);
// const svc = ({ queryKey }: { queryKey: string[] }) => {
//   const [_key, step] = queryKey;
//   console.log("fetch step: ", step);
//   return onboardingStatusSvc({ step });
// };

// function useSvcQuery<Q>(
//   key: string,
//   svc: (p: { queryKey: [string, Q] }) => Promise<any>,
//   q: Q,
// ) {
//   return useQuery({
//     queryKey: [key, q],
//     queryFn: svc,
//   });
// }

const steps = [
  "purchase",
  "intro",
  "setup",
  "vendor-balance",
  "recipes",
  "review",
  "unit-based-tracking-welcome",
  "balance",
  "warehouse-transfer",
];

function XDisplay() {
  const [step, setStep] = useState(steps[0]);
  const dbg = useSvcQuery("dbg2", onboardingStatusSvc, {
    step,
    // scope: "INVENTORY",
  });

  useEffect(() => {
    if (dbg.data?.[0]) {
      console.log(">>>> data >>>>> ", dbg.data[0].step, dbg.data[0].status);
    }
  }, [dbg]);

  return (
    <div>
      <div>Hello /_authenticated/welcome/x!</div>
      <div style={{ margin: "20px 5px" }}>
        <div style={{ marginBottom: 10 }}>step: {step}</div>
        <label>
          steps:
          <select onChange={(e) => setStep(e.target.value)}>
            {steps.map((step) => (
              <option value={step} key={step}>
                {step}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Outlet />
    </div>
  );
}
