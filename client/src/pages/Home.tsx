import Heading from "@/components/Heading";
import Paragraph from "@/components/Paragraph";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { MoveRight } from "lucide-react";
import { Link } from "react-router-dom";
import filedrive from "../assets/file-drive.svg";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const Home = () => {
  return (
    <div className="grid min-h-screen grid-rows-[auto_1fr_auto] gap-2 p-2">
      <Header />
      <main className="mx-auto mt-6 max-w-2xl sm:my-10">
        <motion.div
          className="mx-auto mb-6 h-[16rem] sm:mb-10  sm:h-[22rem]"
          initial={{ opacity: 0, x: 200 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          <img src={filedrive} alt="" className="h-full w-full " />
        </motion.div>

        <Card className="text-center">
          <CardHeader>
            <Reveal>
              <Heading>
                Personal file storage to save and keep track of your files
              </Heading>
            </Reveal>
          </CardHeader>
          <CardContent>
            <Reveal>
              <Paragraph variant="lg">
                It's easy, just create an account and start managing your files
                in seconds. All for free!
              </Paragraph>
            </Reveal>
          </CardContent>
          <CardFooter className="mt-10 flex items-center justify-center gap-x-2 md:gap-x-4 lg:gap-x-6">
            <Link to="/dashboard" className="block">
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
      </main>
      <Footer />
    </div>
  );
};

export default Home;
