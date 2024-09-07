import { Outlet } from "@tanstack/react-router";
import {
  Box,
  Button,
  ChakraProvider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { FLLink } from "@fl/routing-components";
import { theme } from "@fl/theme";

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
  if (!Math.random()) {
    return (
      <ChakraProvider theme={theme}>
        <Box w="100vw" h="100vh" p={10} bg="white">
          <Tabs variant="finaloopLine">
            <TabList>
              <Tab>One</Tab>
              <Tab>Two</Tab>
              <Tab>Three</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <p>one!</p>
              </TabPanel>
              <TabPanel>
                <p>two!</p>
              </TabPanel>
              <TabPanel>
                <p>three!</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </ChakraProvider>
    );
  }
  if (!Math.random()) {
    return (
      <ChakraProvider theme={theme}>
        <Box w="100vw" h="100vh" p={10}>
          <Button>red</Button>
          <Button variant="outline">outline</Button>
          <Button variant="primary">primary</Button>
          <Button variant="ghost">ghost</Button>
          <Button variant="link" fontSize="sm">
            link
          </Button>
          <Button variant="miro">miro</Button>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Tabs variant="finaloopLine" size={{ sm: "sm", md: "md", lg: "lg" }}>
          <TabList>
            <Tab>One</Tab>
            <Tab>Two</Tab>
            <Tab>Three</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
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
            params={{ miroId: "xx", tabId: "here" }}
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
            params={{ miroId: "yyy", tabId: "was" }}
          >
            Miro yyy/was
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "yyy", tabId: "here" }}
          >
            Miro yyy/here
          </CustomLink>
        </div>
        <div>root (App)</div>
        <Outlet />
      </Box>
    </ChakraProvider>
  );
}

export default App;
