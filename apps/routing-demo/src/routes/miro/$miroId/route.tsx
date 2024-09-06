import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useDefaultTab } from "@fl/routing";

export const Route = createFileRoute("/miro/$miroId")({
  component: MiroDisplay,
});

function MiroDisplay() {
  useDefaultTab(Route, "xyz");
  const params = Route.useParams();
  return (
    <div>
      <div>inside miro</div>
      <div>{JSON.stringify(params, null, 2)}</div>
      <Outlet />
    </div>
  );
}
