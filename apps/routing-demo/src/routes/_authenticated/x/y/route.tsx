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
  //   queryFn: async function ({ queryKey, ...rest }): Promise<{ age: number }> {
  //     console.log(">>>>> queryKey: ", queryKey, rest);
  //     return new Promise((resolve) => setTimeout(resolve, 500, { age: 55 }));
  //   },
  // });
  // // console.log(">>> dbg: ", JSON.parse(JSON.stringify(dbg)));
  //
  // console.log(">>. ", dbg.data?.age);
  return <div>Hello /_authenticated/x/y!</div>;
}
