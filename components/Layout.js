import React from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useBreakpointValue,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import CartIcon from "./CartIcon";
import { useSession, signOut } from "next-auth/react";

const Layout = ({ children }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { data: session, status } = useSession();

  return (
    <div>
      <Head>
        <title>Doodle & Co</title>
      </Head>
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.600")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex flex={{ base: 1 }} justify={{ base: "start", md: "start" }}>
            <Link href={"/"} passHref>
              <Text
                fontFamily={"heading"}
                color={useColorModeValue("gray.800", "white")}
              >
                Logo
              </Text>
            </Link>
            <Stack
              flex={{ base: 1 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={4}
            >
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              <Link href='/cart' passHref>
                <CartIcon />
              </Link>

              <>
                {status === "authenticated" ? (
                  <Button
                    display={"inline-flex"}
                    fontSize={"sm"}
                    fontWeight={600}
                    color={"white"}
                    bg={"pink.500"}
                    href={"/"}
                    _hover={{ bg: "pink.400" }}
                    onClick={() => signOut()}
                  >
                    Sign Out
                  </Button>
                ) : (
                  <>
                    <Button
                      as={"a"}
                      fontSize={"sm"}
                      fontWeight={400}
                      variant={"link"}
                      href={"/login"}
                    >
                      Sign In
                    </Button>

                    <Button
                      as={"a"}
                      display={{ base: "none", md: "inline-flex" }}
                      fontSize={"sm"}
                      fontWeight={600}
                      color={"white"}
                      bg={"pink.500"}
                      href={"/signup"}
                      _hover={{ bg: "pink.400" }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      {children}
      {/* footer */}
      <Box>
        <Flex
          bg={useColorModeValue("white", "gray.600")}
          minH={"60px"}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderTop={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          align={"center"}
        >
          <Flex
            flex={{ base: 1 }}
            justify={{ base: "center" }}
            alignItems={"center"}
          >
            <Text
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
              align={"center"}
            >
              Copyright 2023 <br /> Doodle & Co.
            </Text>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default Layout;
