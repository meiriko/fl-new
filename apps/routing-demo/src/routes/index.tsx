import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: () => (
    <div>
      <div>Hello /!</div>
      <Outlet />
    </div>
  ),
});
