import {
  Button,
  Avatar,
  Text,
  Group,
  Box,
  rem,
  Anchor,
  Modal,
  TextInput,
} from "@mantine/core";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../State/auth.state";
import { useNavigate } from "react-router-dom";
import classes from "./Profile.module.css";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";

//Todo redesign this page
//Add a nice looking design
export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);
  const [updatedUser, setUpdatedUser] = useState();
  const [opened, { open, close }] = useDisclosure(false);

  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.userName,
    },
    validate: {
      username: (value) =>
        value.length > 20
          ? "username can not be longer than 20 characters"
          : null,
    },
    validateInputOnChange: true,
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    nav("/");
  };
  const handleEdit = (event) => {
    event.preventDefault();
    form.validate();
    setUser({
      ...user,
      firstName: form.values.firstName,
      lastName: form.values.lastName,
      userName: form.values.username,
    });
    close();
  };

  return (
    <>
      {isLoggedIn && (
        <div>
          <Box>
            <p>You are logged in as: {user.userName}</p>
            <Group wrap="nowrap">
              <Avatar src={user.profilePicture} size={94} radius="md" />
              <div>
                <Text fz="xs" tt="uppercase" fw={700} c="dimmed">
                  {user.email}
                </Text>
                <Text fz="lg" fw={500} className={classes.name}>
                  {user.firstName} {user.lastName}{" "}
                </Text>
                <Anchor onClick={open}>Edit</Anchor>
                <Modal opened={opened} onClose={close} title="Edit Account">
                  <form onSubmit={handleEdit}>
                    <TextInput
                      label="Username"
                      placeholder="New username"
                      {...form.getInputProps("username")}
                      radius="md"
                    />
                    <TextInput
                      label="First Name"
                      placeholder="New first name"
                      {...form.getInputProps("firstName")}
                      radius="md"
                    />
                    <TextInput
                      label="Last Name"
                      placeholder="New last name"
                      {...form.getInputProps("lastName")}
                      radius="md"
                    />
                    <br />
                    <Button
                      type="submit"
                      disabled={form.isSubmitting || form.hasErrors}
                    >
                      Update
                    </Button>
                  </form>
                </Modal>
              </div>
            </Group>
            <br />

            <Button onClick={handleLogout}>Logout</Button>
          </Box>
        </div>
      )}
    </>
  );
}
