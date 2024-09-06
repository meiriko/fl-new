import { Outlet } from "@tanstack/react-router";
import { ChakraProvider } from "@chakra-ui/react";
import { DemoButton } from "@fl/components";
import { FLLink } from "@fl/routing-components";
function CustomLink<TTo extends string | undefined>(
  props: React.ComponentProps<typeof FLLink<TTo>>
) {
  return (
    <FLLink<TTo>
      paddingInlineEnd={2}
      whiteSpace="nowrap"
      _activeLink={{ fontWeight: "bold", color: "yellow.300" }}
      {...props}
    />
  );
}

function App() {
  return (
    <ChakraProvider>
      <div>
        <DemoButton />
        <div style={{ display: "flex", gap: "1rem", padding: 20 }}>
          <FLLink to="/">Home</FLLink>
          <CustomLink
            to="/miro"
            _activeLink={{ fontWeight: "bold", color: "red.300" }}
          >
            Miro
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "xx", tabId: "xx" }}
          >
            miro/xxx/xxx
          </CustomLink>
          <CustomLink to="/miro/$miroId" params={{ miroId: "xxxx" }}>
            Miro xxx
          </CustomLink>
          <CustomLink to="/miro/$miroId" params={{ miroId: "yyy" }}>
            Miro yyy
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "yyy", tabId: "overview" }}
          >
            Miro yyy/overview
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "yyy", tabId: "settings" }}
          >
            Miro yyy/settings
          </CustomLink>
        </div>
        <div>root (App)</div>
        <Outlet />
      </div>
    </ChakraProvider>
  );
}

export default App;
