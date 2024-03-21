import { AppShell, Avatar, Drawer, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LoginModel from "./Login/LoginModel";
import { useMantineColorScheme } from "@mantine/core";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { isLoggedInAtom, userAtom } from "../State/auth.state";
import { useAtom } from "jotai";
import { Link } from "react-router-dom";
function TopNavigation() {
  const [opened, { open, close }] = useDisclosure(false);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();
  const [isLoggedIn] = useAtom(isLoggedInAtom);
  const [user] = useAtom(userAtom);

  return (
    <>
      <Drawer opened={opened} onClose={close} title="Login">
        <LoginModel close={close} />
      </Drawer>
      <AppShell.Header>
        <Group h="100%" justify="space-between" px="md">
          <Group align="center">
            <Text size="xl" weight={700}>
              Wishlist Wizard
            </Text>
          </Group>
          <Group justify="flex-end">
            <Avatar onClick={() => toggleColorScheme()}>
              {colorScheme === "dark" ? <MdDarkMode /> : <CiDark />}
            </Avatar>
            {isLoggedIn ? (
              <Link to={`/profile/${user.id}`}>
                <Avatar radius="xl"></Avatar>
              </Link>
            ) : (
              <Avatar radius="xl" onClick={open}></Avatar>
            )}
          </Group>
        </Group>
      </AppShell.Header>
    </>
  );
}

export default TopNavigation;
