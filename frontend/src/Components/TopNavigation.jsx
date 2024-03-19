import { Avatar, Drawer, Group } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LoginModel from "./Login/LoginModel";
import { useMantineColorScheme } from "@mantine/core";
import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
function TopNavigation() {
  const [opened, { open, close }] = useDisclosure(false);
  const { toggleColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <>
      <div className="headerBox">
        <Drawer opened={opened} onClose={close} title="Login">
          <LoginModel close={close} />
        </Drawer>
        <Group position="right">
          <Avatar onClick={() => toggleColorScheme()}>
            {colorScheme === "dark" ? <MdDarkMode /> : <CiDark />}
          </Avatar>
          <Avatar
            color="whitesmoke"
            radius="xl"
            onClick={open}
            className="profileIcon"
          ></Avatar>
        </Group>
      </div>
    </>
  );
}

export default TopNavigation;
