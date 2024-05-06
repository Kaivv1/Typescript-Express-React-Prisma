import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import { getCookie } from "./cookie";

export async function login() {
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
export async function update() {
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
