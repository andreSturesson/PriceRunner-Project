import { Button } from "@mantine/core";
import { useAtom } from "jotai";
import { isLoggedInAtom, userAtom } from "../State/auth.state";

//Todo redesign this page
//Add a nice looking design
export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useAtom(isLoggedInAtom);
  const [user, setUser] = useAtom(userAtom);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  return (
    <>
      {isLoggedIn && (
        <div>
          <p>You are logged in as: {user.email}</p>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      )}
    </>
  );
}
