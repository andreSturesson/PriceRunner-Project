import { Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { login, registerUser } from "../../Helpers/APIManager";
import { useAtom } from "jotai";
import { isLoggedInState, userState } from "../../State/auth.state.js";
import { useState } from "react";
import PropTypes from "prop-types";

import { useForm } from "@mantine/form";

function LoginModel({ close }) {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInState);
  const [user, setUser] = useAtom(userState);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if registering or logging in
    if (registered === true) {
      form.validate();
      login({ email: form.values.email, password: form.values.password }).then(
        (response) => {
          console.log(response);
          setUser(response);
          localStorage.setItem("user", JSON.stringify(response));
          setIsLoggedIn(true);
          close();
        }
      );
    } else if (registered === false) {
      registerForm.validate();
      registerUser({
        email: registerForm.values.email,
        password: registerForm.values.password,
        username: registerForm.values.username,
        firstName: registerForm.values.firstName,
        lastName: registerForm.values.lastName,
      }).then((response) => {
        console.log(response);
        setUser(response);
        localStorage.setItem("user", JSON.stringify(response));
        setIsLoggedIn(true);
        close();
      });
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
          Don&apos;t have an account?
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
          Already have an account?
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
