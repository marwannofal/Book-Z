import Link from "next/link";
import GeneralButton from "../buttons/generalButton";

const AddBookCard = () => {
  return (
    <div className="bg-blue-1 w-full flex items-center justify-center">
      <div className="flex flex-col lg:flex-row lg:max-w-screen-dt w-full items-center">
        <div className="flex justify-center">
          <p className="text-white p-3">
            Want to exchange or share your books? Join our community!
          </p>
        </div>
        <div className="hidden lg:flex flex-1"></div>
        <div className="flex justify-center">
          <Link href={"/add"}>
            <GeneralButton
              title="List your books with us"
              classes="bg-white py-2 px-4 rounded m-3 text-sm font-semibold"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddBookCard;
