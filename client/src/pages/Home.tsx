import Header from "@/components/Header";
import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import filedrive from "../assets/file-drive.svg";
import Footer from "@/components/Footer";
const Home = () => {
  // const { logout, isLoggingOut } = useLogout();
  // async function update() {
  //   axios
  //     .patch(
  //       "http://localhost:4000/user/update",
  //       {
  //         email: "ne@gmail.com",
  //       },
  //       {
  //         withCredentials: true,
  //       },
  //     )
  //     .catch((err: AxiosError) => console.log(err.response?.data));
  // }

  return (
    // <div>
    //   {/* <Button onClick={update}>update</Button>
    //   <Button onClick={async () => {}}>send mail</Button>
    //   <Button onClick={() => logout()}>
    //     {isLoggingOut ? <Loader size="sm" /> : "logout"}
    //   </Button> */}
    // </div>
    <div className="grid grid-rows-[auto_1fr_auto] gap-20 p-2">
      <Header />
      <div className="mx-auto max-w-2xl space-y-14">
        <img src={filedrive} alt="" className="mx-auto w-full max-w-[23rem]" />
        <Card className="text-center">
          <CardHeader>
            <CardTitle>
              <Heading>
                Personal file storage to save and keep track of your files
              </Heading>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Paragraph variant="lg">
              It's easy, just create an account and start managing your files in
              seconds. All for free!
            </Paragraph>
          </CardContent>
          <CardFooter className="mt-10 flex items-center justify-center gap-x-2 md:gap-x-4 lg:gap-x-6">
            <Link to="files" className="block">
              <Button className="w-fit" size="sm">
                Get started
              </Button>
            </Link>
            <Link to="">
              <Button variant="link" className="gap-1" size="sm">
                Learn more <MoveRight className="h5 w-5" />
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
