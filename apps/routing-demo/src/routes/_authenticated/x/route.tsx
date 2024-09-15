import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/x")({
  component: () => (
    <div>
      <div>Hello /_authenticated/welcome/x!</div>
      <Outlet />
    </div>
  ),
});
