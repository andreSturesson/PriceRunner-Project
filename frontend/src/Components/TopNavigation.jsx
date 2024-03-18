import { Avatar, Button, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { login, registerUser } from "../Helpers/APIManager";
import { useState } from "react";

function TopNavigation() {
  const [opened, { open, close }] = useDisclosure(false);
  const [registered, setRegistered] = useState(true);
  const [loginPayload, setLoginPayload] = useState({
    email: "",
    password: "",
  });
  const [registerPayload, setRegisterPayload] = useState({
    email: "",
    password: "",
    username: "",
    firstName: "",
    lastName: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if registering or logging in
    if (registered === true) {
      login(loginPayload);
      setLoginPayload({ email: "", password: "" });
    } else if (registered === false) {
      registerUser(registerPayload);
      setRegisterPayload({
        email: "",
        password: "",
        username: "",
        firstName: "",
        lastName: "",
      });
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (registered === true) {
      if (event.target.id === "emailInput")
        setLoginPayload({ ...loginPayload, email: value });
      else if (event.target.id === "passwordInput")
        setLoginPayload({ ...loginPayload, password: value });
    } else if (registered === false) {
      if (event.target.id === "usernameInput")
        setRegisterPayload({ ...registerPayload, username: value });
      else if (event.target.id === "emailInput")
        setRegisterPayload({ ...registerPayload, email: value });
      else if (event.target.id === "passwordInput")
        setRegisterPayload({ ...registerPayload, password: value });
      else if (event.target.id === "firstNameInput")
        setRegisterPayload({ ...registerPayload, firstName: value });
      else if (event.target.id === "lastNameInput")
        setRegisterPayload({ ...registerPayload, lastName: value });
    }
  };

  const changeRegisteredStatus = () => {
    setRegistered(!registered);
  };

  return (
    <>
      <div className="headerBox">
        <Drawer opened={opened} onClose={close} title="Login">
          {registered ? (
            <>
              <form className="loginForm" onSubmit={handleSubmit}>
                <label htmlFor="emailInput">Email:</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="emailInput"
                  value={loginPayload.email}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <label htmlFor="passwordInput">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="passwordInput"
                  value={loginPayload.password}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <Button type="submit">Login</Button>
              </form>
              Don&apos;t have an account?
              <Button size="xs" onClick={changeRegisteredStatus}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <form className="registerForm" onSubmit={handleSubmit}>
                <label htmlFor="usernameInput">Username:</label>
                <input
                  type="text"
                  placeholder="Username"
                  id="usernameInput"
                  value={registerPayload.username}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <label htmlFor="passwordInput">Password:</label>
                <input
                  type="password"
                  placeholder="Password"
                  id="passwordInput"
                  value={registerPayload.password}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <label htmlFor="emailInput">Email:</label>
                <input
                  type="text"
                  placeholder="Email"
                  id="emailInput"
                  value={registerPayload.email}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <label htmlFor="firstNameInput">Firstname:</label>
                <input
                  type="text"
                  placeholder="First name"
                  id="firstNameInput"
                  value={registerPayload.firstName}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <label htmlFor="lasttNameInput">Lastname:</label>
                <input
                  type="text"
                  placeholder="Last name"
                  id="lastNameInput"
                  value={registerPayload.lastName}
                  onChange={handleChange}
                  required
                ></input>
                <br />
                <Button type="submit">Register</Button>
              </form>
              Already have an account?
              <Button size="xs" onClick={changeRegisteredStatus}>
                Log In
              </Button>
            </>
          )}
        </Drawer>
        <Avatar radius="xl" onClick={open} />
      </div>
    </>
  );
}

export default TopNavigation;
