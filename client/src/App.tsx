import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { getCookie, removeCookie } from "./utils/cookie";
function App() {
  // const csrfToken = Cookies.get("csrf_auth");
  // console.log(csrfToken);
  async function login() {
    await axios
      .post(
        "http://localhost:4000/user/login",
        {
          email: "newuser@gmail.com",
          password: "asd1234",
        },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        const { token } = res.data.data;
        Cookies.set("csrf_auth", token);
      })
      .catch((err: AxiosError) => console.log(err.response?.data));
  }
  async function update() {
    try {
      const token = await getCookie("csrf_auth");
      console.log(token);
      await axios.patch(
        "http://localhost:4000/user/update",
        {
          email: "ne@gmail.com",
        },
        {
          withCredentials: true,
          headers: {
            "x-csrf-token": token,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button onClick={login}>login</button>
      <button onClick={update}>update</button>
      <button onClick={() => removeCookie("csrf_auth")}>remove cookie</button>
    </>
  );
}

export default App;
