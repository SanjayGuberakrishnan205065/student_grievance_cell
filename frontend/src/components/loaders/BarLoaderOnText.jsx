import BarLoader from "react-spinners/BarLoader";

const BarLoaderOnText = ({ text }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <BarLoader
        cssOverride={{ display: "block", margin: "0 auto" }}
        color="#ff8f20"
        className="mb-6"
      />
      <div className="my-5 text-2xl">{text}</div>
    </div>
  );
};
export default BarLoaderOnText;
