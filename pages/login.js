import React, { useState } from "react";
import {
  Container,
  Stack,
  Heading,
  HStack,
  Text,
  Button,
  Box,
  FormControl,
  FormLabel,
  Input,
  useBreakpointValue,
  FormHelperText,
} from "@chakra-ui/react";
import Link from "next/link";
import * as yup from "yup";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // dont want page to reload until we capture email and pw
    event.preventDefault();

    // validate form
    try {
      await loginSchema.validate(
        {
          email,
          password,
        },
        {
          // get all errors at once
          abortEarly: false,
        }
      );
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach(({ path, message }) => {
          validationErrors[path] = message;
        });
      }
      setError(validationErrors);
      return;
    }

    //   call login function
    //   clear the state

    const result = await signIn("credentials", {
      email: email,
      password: password,
      callbackUrl: "/",
      redirect: true,
    });

    if (result.error) {
      setError(result.error);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spcing="6" textAlign="center">
          <Heading>Log In</Heading>
        </Stack>
        <HStack>
          <Text>Don&apos;t have an account?</Text>
          <Link href="/signup" passHref>
            <Button variant="link" colorScheme={"pink"}>
              Sign Up
            </Button>
          </Link>
        </HStack>
      </Stack>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
        boxShadow="md"
        p="6"
        rounded="md"
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing="6">
            <Stack spacing="5">
              <FormControl>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <Input
                  value={email}
                  id="email"
                  type="email"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                ></Input>
                <FormHelperText id="email-helper-text" color="red">
                  {error.email}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  value={password}
                  id="password"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                ></Input>
                <FormHelperText id="password-helper-text" color="red">
                  {error.password}
                </FormHelperText>
              </FormControl>
            </Stack>
            <HStack justify="space-between">
              <Button variant="link" colorScheme="pink" size="sm">
                Forgot Password
              </Button>
            </HStack>
            <Button colorScheme="pink" type="submit">
              Sign In
            </Button>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
