import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/features/auth/useLogout";
import axios, { AxiosError } from "axios";

const Home = () => {
  const { logout, isLoggingOut } = useLogout();
  async function update() {
    axios
      .patch(
        "http://localhost:4000/user/update",
        {
          email: "ne@gmail.com",
        },
        {
          withCredentials: true,
        },
      )
      .catch((err: AxiosError) => console.log(err.response?.data));
  }

  return (
    <div>
      <Button onClick={update}>update</Button>
      <Button onClick={async () => {}}>send mail</Button>
      <Button onClick={() => logout()}>
        {isLoggingOut ? <Loader size="sm" /> : "logout"}
      </Button>
    </div>
  );
};

export default Home;
