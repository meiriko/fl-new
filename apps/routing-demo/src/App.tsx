import { Link, Outlet } from "@tanstack/react-router";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { FLLink } from "@fl/routing-components";
import { theme } from "@fl/theme";
// import { useEffect, useState } from "react";

function CustomLink<TTo extends string | undefined>(
  props: React.ComponentProps<typeof FLLink<TTo>>,
) {
  return (
    <FLLink<TTo>
      px={1}
      paddingInlineEnd={2}
      whiteSpace="nowrap"
      _activeLink={{ fontWeight: "bold", color: "yellow.300" }}
      borderInlineEnd="1px solid red"
      {...props}
    />
  );
}

function App() {
  // console.log(">>>>> boooomzzz >>>>>");
  // const [dbg, setDbg] = useState("loading");
  // useEffect(() => {
  //   fetch("https://get.geojs.io/v1/ip/country.json")
  //     .then((v) => v.json())
  //     .then((v) => {
  //       console.log(">>> fetch: ", v);
  //       setDbg(JSON.stringify(v));
  //     });
  // }, []);
  return (
    <ChakraProvider theme={theme}>
      <Box w="full" h="full" p={6}>
        {/* <Box>dbg: {dbg}</Box> */}
        <Box>
          <CustomLink to="/welcome">auth</CustomLink>
          <CustomLink to="/x">x</CustomLink>
          <CustomLink to="/x/y">x/y</CustomLink>
          <CustomLink to="/x/y" search={{ miro: "was" }}>
            x/y?miro=was
          </CustomLink>
          <Link
            style={{ margin: 20, border: "1px solid red" }}
            to="/miro/$miroId/$tabId/$segId"
            params={{ miroId: "xx", tabId: "here", segId: "segment2" }}
          >
            masked -- Miro/xx/tab:here/segment:segment2
          </Link>
          <FLLink to="/">Home</FLLink>
          <CustomLink
            to="/miro/$miroId/$tabId/$segId"
            params={{ miroId: "xx", tabId: "here", segId: "segment2" }}
          >
            Miro/xx/tab:here/segment:segment2
          </CustomLink>
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
            miro/xx/tab:here
          </CustomLink>
          <CustomLink to="/miro/$miroId" params={{ miroId: "xxxx" }}>
            miro/xxxx
          </CustomLink>
          <CustomLink to="/miro/$miroId" params={{ miroId: "yyy" }}>
            miro/yyy
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "yyy", tabId: "was" }}
          >
            miro/yyy/tab:was
          </CustomLink>
          <CustomLink
            to="/miro/$miroId/$tabId"
            params={{ miroId: "yyy", tabId: "here" }}
          >
            Miro yyy/tab:here
          </CustomLink>
        </Box>
        <Outlet />
      </Box>
    </ChakraProvider>
  );
}

export default App;
