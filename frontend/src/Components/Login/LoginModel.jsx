import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { login, registerUser } from "../../Helpers/APIManager.js";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../../State/auth.state.js";
import { useState } from "react";
import PropTypes from "prop-types";

import { useForm } from "@mantine/form";

function LoginModel({ close }) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const [registered, setRegistered] = useState(true);

  const form = useForm({
    initialvalues: {
      email: "",
      password: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    validateInputOnChange: true,
  });

  const registerForm = useForm({
    initialvalues: {
      email: "",
      password: "",
      username: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
    validateInputOnChange: true,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if registering or logging in
    if (registered === true) {
      form.validate();
      try {
        const response = await login({
          email: form.values.email,
          password: form.values.password,
        });
        console.log(response);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
        setIsLoggedIn(true);
        close();
      } catch (error) {
        console.error(error);
      }
    } else if (registered === false) {
      registerForm.validate();
      try {
        const response = await registerUser({
          email: registerForm.values.email,
          password: registerForm.values.password,
          userName: registerForm.values.username,
          firstName: registerForm.values.firstName,
          lastName: registerForm.values.lastName,
        });
        console.log(response);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
        setIsLoggedIn(true);
        close();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const changeRegisteredStatus = () => {
    setRegistered(!registered);
  };

  return (
    <>
      {registered ? (
        <>
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              value={form.values.email}
              {...form.getInputProps("email")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              value={form.values.password}
              {...form.getInputProps("password")}
            />
            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                disabled={Object.keys(form.errors).length > 1}
              >
                Login
              </Button>
            </Group>
          </form>
          Don&apos;t have an account? &ensp;
          <Button size="xs" onClick={changeRegisteredStatus}>
            Sign Up
          </Button>
        </>
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <TextInput
              withAsterisk
              label="Email"
              placeholder="your@email.com"
              value={registerForm.values.email}
              {...form.getInputProps("email")}
            />
            <TextInput
              withAsterisk
              label="Username"
              placeholder="username"
              value={registerForm.values.username}
              {...form.getInputProps("username")}
            />
            <PasswordInput
              withAsterisk
              label="Password"
              placeholder="password"
              value={registerForm.values.password}
              {...form.getInputProps("password")}
            />
            <TextInput
              withAsterisk
              label="First name"
              placeholder="first name"
              value={registerForm.values.firstName}
              {...form.getInputProps("firstName")}
            />
            <TextInput
              withAsterisk
              label="Last name"
              placeholder="last name"
              value={registerForm.values.lastName}
              {...form.getInputProps("lastName")}
            />
            <Group justify="flex-end" mt="md">
              <Button
                type="submit"
                disabled={Object.keys(form.errors).length > 1}
              >
                Register
              </Button>
            </Group>
          </form>
          Already have an account?&ensp;
          <Button size="xs" onClick={changeRegisteredStatus}>
            Log In
          </Button>
        </>
      )}
    </>
  );
}

export default LoginModel;
LoginModel.propTypes = {
  close: PropTypes.func.isRequired,
};
