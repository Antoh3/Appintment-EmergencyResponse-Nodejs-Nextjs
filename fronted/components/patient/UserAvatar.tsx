import { Avatar, AvatarFallback, AvatarImage } from "@/components/UI/Avatar";
import { Icons } from "../NavIcons";
import Image from "next/image";

const UserAvatar = ({ ...props }) => {
  return (
    <Avatar {...props}>
      <Image
        alt="logo"
        className="w-8 2xl:w-10"
        height={100}
        priority={false}
        src="/images/dr-powell.png"
        width={100}
      />{" "}
      ? (
      <AvatarImage alt="Picture" src="/images/dr-powell.png" />) : (
      <AvatarFallback>
        <span className="sr-only">Emmanuel</span>
        <Icons.users className="h-4 w-4" />
      </AvatarFallback>
      )
    </Avatar>
  );
};

export default UserAvatar;
