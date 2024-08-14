import AddIcon from "@/icons/layout/add.svg";
import HomeIcon from "@/icons/layout/home.svg";
import PostsIcon from "@/icons/layout/posts.svg";
import ProfileIcon from "@/icons/layout/profile.svg";
import SearchIcon from "@/icons/layout/search.svg";
import Image from "next/image";
import { useRouter } from "next/router";

interface BottomBarProps {
  className?: string;
}

const BottomBar: React.FC<BottomBarProps> = (props: BottomBarProps) => {
  const router = useRouter();

  const buttons = [
    { icon: HomeIcon, title: "home", path: `/` },
    { icon: SearchIcon, title: "search", path: "/books" },
    { icon: AddIcon, title: "add", path: "/add" },
    { icon: PostsIcon, title: "posts", path: "/books" },
    { icon: ProfileIcon, title: "profile", path: "/profile" },
  ];
  return (
    <div className={`${props.className}`}>
      <div className="flex flex-row">
        {buttons.map((_b, _i) => (
          <div
            className={`flex flex-1 flex-col justify-center items-center gap-1.5 text-black-2 ${
              _b.path == router.pathname ? "font-bold" : "font-normal"
            }`}
            key={_i}
            onClick={() => router.push(_b.path)}
          >
            <Image
              src={_b.icon}
              alt={`${_b.title} Icon`}
              color={_b.path == router.pathname ? "black" : "black-2"}
            />
            {_b.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BottomBar;
