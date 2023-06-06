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

const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    // dont want page to reload until we capture email and pw
    e.preventDefault();

    try {
      await signUpSchema.validate(
        { name, email, password },
        { abortEarly: false }
      );
    } catch (err) {
      const validationErrors = {};
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
      }
      setError(validationErrors);
      return;
    }

    // if user creation was successful
    // call sign in method from nextAuth to create session for user
    fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("user created successfully");
          signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/",
            redirect: true,
          })
            .then((result) => {
              console.log(result);
            })
            .catch((error) => {
              setError({ api: error.toString() });
            });
        } else {
          console.log("user creation failed");
          setError({ api: "Could not create an account. Please try again" });
        }
      })
      .catch((error) => console.log("Sign Up API Error:", error));

    //   clear the state
    setEmail("");
    setPassword("");
  };

  return (
    <Container
      maxW='lg'
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing='8'>
        <Stack spcing='6' textAlign='center'>
          <Heading>Create an Account</Heading>
        </Stack>
        <HStack>
          <Text>Already have an account?</Text>
          <Link href='/login' passHref>
            <Button variant='link' colorScheme={"pink"}>
              Log In
            </Button>
          </Link>
        </HStack>
      </Stack>
      <Box
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={useBreakpointValue({ base: "transparent", sm: "bg-surface" })}
        boxShadow='md'
        p='6'
        rounded='md'
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <form onSubmit={handleSubmit}>
          <Stack spacing='6'>
            <Stack spacing='5'>
              <FormControl>
                <FormLabel htmlFor='name'>Name</FormLabel>
                <Input
                  value={name}
                  id='name'
                  type='name'
                  placeholder='Name'
                  onChange={(event) => setName(event.target.value)}
                ></Input>
                <FormHelperText id='name-helper-text' color='red'>
                  {error.name}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='email'>Email Address</FormLabel>
                <Input
                  value={email}
                  id='email'
                  type='email'
                  placeholder='Email'
                  onChange={(event) => setEmail(event.target.value)}
                ></Input>
                <FormHelperText id='email-helper-text' color='red'>
                  {error.email}
                </FormHelperText>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor='password'>Password</FormLabel>
                <Input
                  value={password}
                  id='password'
                  type='password'
                  placeholder='Password must be 8 characters'
                  onChange={(event) => setPassword(event.target.value)}
                ></Input>
                <FormHelperText id='password-helper-text' color='red'>
                  {error.password}
                </FormHelperText>
              </FormControl>
            </Stack>
            <Stack pt='5'>
              <Button colorScheme='pink' type='submit'>
                Sign Up
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default SignUpPage;
