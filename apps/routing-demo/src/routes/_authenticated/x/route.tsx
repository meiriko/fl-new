import { createFileRoute, Outlet } from "@tanstack/react-router";
import { toService } from "@fl/dataApi";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
// import _ from "lodash";

export const Route = createFileRoute("/_authenticated/x")({
  component: XDisplay,
});

const vanillaChipCompanyId = "a85a932a-e826-424c-966e-6f5831ec47be";

const svcBase = toService(
  "onboardingStatus",
  { status: true, scope: true, step: true },
  { scope: "INVENTORY", companyId: vanillaChipCompanyId },
);

// const svc = _.ary(svcBase, 0);
const svc = ({ queryKey }: { queryKey: string[] }) => {
  const [_key, step] = queryKey;
  console.log("fetch step: ", step);
  return svcBase({ step });
};

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
  const dbg = useQuery({
    queryKey: ["dbg", step],
    queryFn: svc,
  });
  useEffect(() => {
    console.log(">>> dbg >>>>> : ", JSON.parse(JSON.stringify(dbg)));
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
