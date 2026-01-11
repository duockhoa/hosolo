import Image from "next/image";
import UserCard from "../user-card/user-card";
import Notification from "../notification/notification";
import Search from "../search/search";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-2 bg-white px-4 border-b border-gray-200 h-[60px]">
      <div className="flex items-center gap-2">
        <Image
          src={"/dkpharmalogo.png"}
          alt="Logo"
          width={140}
          height={60}
          className="p-4"
          onClick={() => {}}
        />

        <h1 className="text-xl ">HỒ SƠ LÔ</h1>
      </div>

      <div className="flex items-center gap-4">
        <Search />
        <Notification
          content={[
            {
              id: "1",
              title: "New Message",
              message: "You have received a new message.",
              from: "System",
              to: "User",
              link: "/messages/1",
              read: false,
              createdAt: new Date(),
            },
          ]}
        />

        <UserCard user={{}} />
      </div>
    </header>
  );
}
