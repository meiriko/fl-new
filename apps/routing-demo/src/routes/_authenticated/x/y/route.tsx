import { createFileRoute } from "@tanstack/react-router";
import { asTypedParams } from "@fl/routing";
// import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/_authenticated/x/y")({
  component: YDisplay,
  validateSearch: asTypedParams<{ miro?: string }>(),
});

function YDisplay() {
  // const dbg = useQuery({
  //   queryKey: ["dbg", { x: 11, y: 12 }],
  //   queryFn: async ({ queryKey, ...rest }) => {
  //     console.log(">>>>> queryKey: ", queryKey, rest);
  //     return new Promise((resolve) => setTimeout(resolve, 500, "miro"));
  //   },
  // });
  // console.log(">>> dbg: ", JSON.parse(JSON.stringify(dbg)));

  return <div>Hello /_authenticated/x/y!</div>;
}
