import { Auth0Error, WebAuth } from "auth0-js";
import { FormEvent, useCallback, useState } from "react";
import {
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Input,
  Button,
  Box,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useBoolean,
} from "@chakra-ui/react";
import { toInputFieldSetter } from "../../utils";

export function Auth0Login({
  resume,
  redirectPath = "/welcome",
}: {
  resume?: string;
  redirectPath?: string;
}) {
  const [
    { email, invalidEmail, emailError, password, passwordError },
    setValues,
  ] = useState({
    email: "",
    emailError: "",
    invalidEmail: false,
    password: "",
    passwordError: "",
  });
  const [formError, setFormError] = useState<string>();
  const [isLoading, setIsLoading] = useBoolean(false);

  const doLogin = useCallback(
    async (email: string, password: string) => {
      setIsLoading.on();
      setFormError(undefined);
      const auth = new WebAuth({
        domain: import.meta.env.VITE_AUTH0_DOMAIN,
        clientID: import.meta.env.VITE_AUTH0_CLIENT_ID,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        redirectUri: [
          window.location.origin,
          redirectPath,
          resume ? `?resume=${resume}` : "",
        ].join(""),
        scope:
          "openid profile email read:current_user update:current_user_metadata offline_access",
      });
      auth.login(
        {
          email,
          password,
          responseType: "code",
        },
        (error: Auth0Error | null) => {
          setFormError(error?.description);
          setIsLoading.off();
        }
      );
    },
    [resume, redirectPath, setIsLoading]
  );

  const onSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      setValues((prev) => ({
        ...prev,
        emailError: !prev.email
          ? "Email is required"
          : prev.invalidEmail
            ? "Invalid Email"
            : "",
        passwordError: prev.password ? "" : "Password is required",
      }));
      if (email && !invalidEmail && password) {
        doLogin(email, password);
      }
    },
    [email, invalidEmail, password, doLogin]
  );

  return (
    <VStack
      as="form"
      w="sm"
      align="start"
      noValidate
      my={10}
      onSubmit={onSubmit}
    >
      <Heading size="sm">Auth0 Login</Heading>
      <Box>
        resume: {resume}, {resume && atob(resume)}
      </Box>
      <FormControl isInvalid={Boolean(emailError)}>
        <FormLabel>Email</FormLabel>
        <Input
          type="email"
          value={email}
          onChange={toInputFieldSetter(setValues, "email", "invalidEmail")}
        />
        <FormErrorMessage>{emailError}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={Boolean(passwordError)}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={toInputFieldSetter(setValues, "password")}
        />
        <FormErrorMessage>{passwordError}</FormErrorMessage>
      </FormControl>
      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>
      {formError ? (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>Login failed</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}
    </VStack>
  );
}
