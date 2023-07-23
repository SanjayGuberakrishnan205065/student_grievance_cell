import HashLoader from "react-spinners/HashLoader";

const HashLoaderWithText = ({ text, textClass, size }) => {
  return (
    <div className="mb-6 flex gap-4 items-center">
      <div>
        <HashLoader
          cssOverride={{ display: "block", margin: "0 auto" }}
          color="#ff8f20"
          className="mb-6"
          size={size || 50}
        />
      </div>
      <div className={textClass}>{text}</div>
    </div>
  );
};
export default HashLoaderWithText;
