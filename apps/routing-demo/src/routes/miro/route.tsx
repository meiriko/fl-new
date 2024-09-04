import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/miro")({
  component: () => (
    <div>
      <div>Hello /index/miro!</div>
      <Outlet />
    </div>
  ),
});
