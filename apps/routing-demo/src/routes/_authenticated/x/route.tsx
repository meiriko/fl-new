import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useSvcQuery } from "@fl/dataApi";
import { useState, useEffect } from "react";

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

const selection = { status: true, scope: true, step: true };
const input = {
  scope: "INVENTORY",
  companyId: vanillaChipCompanyId,
} as const;

function XDisplay() {
  const [step, setStep] = useState(steps[0]);

  const dbg = useSvcQuery("onboardingStatus", "dbg4", selection, input, {
    step,
    // scope: "INVENTORY",
  });

  useEffect(() => {
    if (dbg.data?.length) {
      console.log(
        ">>>> data >>>>> ",
        dbg.data?.length,
        dbg.data?.find(({ step: currStep }) => currStep === step),
      );
    } else {
      console.log("** wtf ** ", dbg.data);
    }
  }, [dbg, step]);

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
