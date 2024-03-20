import {
  Button,
  Group,
  PasswordInput,
  TextInput,
  Paper,
  Center,
  Text,
  Divider,
  Stack,
  Anchor,
  Badge,
} from "@mantine/core";
import { login, registerUser } from "../../Helpers/APIManager.js";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../../State/auth.state.js";
import { useState } from "react";
import PropTypes from "prop-types";
import { useToggle } from "@mantine/hooks";
import { useForm } from "@mantine/form";

function LoginModel({ close }) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const [type, toggle] = useToggle(["Login", "Register"]);
  const [error, setError] = useState("");

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      profilePicture: "",
      email: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(
          value
        )
          ? null
          : "Password should have 8 characters, 1 capital letter, 1 special character, and 1 numeral",
    },
    validateInputOnChange: true,
  });

  async function handleRegister() {
    console.log("Registering...");
    try {
      const submit = {
        email: form.values.email,
        password: form.values.password,
        firstName: form.values.firstName,
        lastName: form.values.lastName,
        profilePicture: form.values.profilePicture,
      };

      const response = await registerUser(submit);
      if (response.status === 200) {
        await login({
          email: form.values.email,
          password: form.values.password,
        });
        const registeredUser = JSON.parse(localStorage.getItem("user"));
        setUser(registeredUser);
        setIsLoggedIn(true);
        close();
      } else {
        const { message } = response;
        setError(message);
        return;
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  }

  async function handleLogin() {
    try {
      const response = await login(form.values);
      console.log("Response:", response);
      if (response.status === 200) {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        setUser(loggedInUser);
        setIsLoggedIn(true);
        close();
      } else {
        const { message } = response;
        setError(message);
        console.log("Error:", message);
        return;
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }

  async function handleSubmit() {
    form.validate();
    if (type === "Register") {
      console.log("Registering...");
      await handleRegister();
    }
    if (type === "Login") {
      console.log("Logging in...");
      await handleLogin();
    }
    return;
  }

  return (
    <Paper radius="md" p="xl">
      <Divider
        label="Please supply your information."
        labelPosition="center"
        my="lg"
      />

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          {type === "Register" && (
            <>
              <TextInput
                required
                label="First Name"
                placeholder="Your first name"
                {...form.getInputProps("firstName")}
                radius="md"
              />
              <TextInput
                required
                label="Last Name"
                placeholder="Your last name"
                {...form.getInputProps("lastName")}
                radius="md"
              />
              <TextInput
                required
                label="Profile Picture"
                placeholder="URL to a profile picture"
                {...form.getInputProps("profilePicture")}
                radius="md"
              />
            </>
          )}

          <TextInput
            required
            label="Email"
            placeholder="example@domain.com"
            {...form.getInputProps("email")}
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            {...form.getInputProps("password")}
            error={
              form.errors.password &&
              "Password should have 8 characters, 1 capital letter, 1 special character, and 1 numeral"
            }
            radius="md"
          />
        </Stack>

        {error && (
          <Center mt={15}>
            <Badge color="red">{error}</Badge>
          </Center>
        )}
        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" disabled={form.isSubmitting || form.hasErrors}>
            {type}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}

export default LoginModel;
LoginModel.propTypes = {
  close: PropTypes.func.isRequired,
};
