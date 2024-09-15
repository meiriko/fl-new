import { createFileRoute } from "@tanstack/react-router";
import { asTypedParams } from "@fl/routing";

export const Route = createFileRoute("/_authenticated/x/y")({
  component: () => <div>Hello /_authenticated/x/y!</div>,
  validateSearch: asTypedParams<{ miro?: string }>(),
});
