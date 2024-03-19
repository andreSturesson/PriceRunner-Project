import { Avatar, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import LoginModel from "./Login/LoginModel";

function TopNavigation() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div className="headerBox">
        <Drawer opened={opened} onClose={close} title="Login">
          <LoginModel close={close} />
        </Drawer>
        {/* Add conditional rendering for being logged in */}
        <Avatar
          color="whitesmoke"
          radius="xl"
          onClick={open}
          className="profileIcon"
        ></Avatar>
      </div>
    </>
  );
}

export default TopNavigation;
