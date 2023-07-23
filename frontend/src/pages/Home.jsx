import { BsChevronDoubleRight } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [showIcon, setShowIcon] = useState(false);
  return (
    <div>
      <div className="hero-bg-wrap tracking-wide">
        <div className="mx-2 py-5 hero-bg-content bg-no-repeat flex items-center justify-center text-center">
          <div className="text-center my-5">
            <div className="my-10 text-4xl md:text-7xl lg:text-8xl">
              MIT's Student Grievance Cell
            </div>
            <div className="my-10 text-xl md:text-2xl">
              A centralized platform that enables students to raise grievances
              and track their progress easily.
            </div>
            <button
              onMouseEnter={() => setShowIcon(true)}
              onMouseLeave={() => setShowIcon(false)}
              onClick={() => navigate("/about")}
              className="cursor-pointer my-3 dark:bg-slate-600 dark:hover:bg-blue-700 bg-blue-700 hover:px-6 text-white text-lg font-bold p-4 rounded-full"
            >
              Learn more{" "}
              <span className={showIcon ? "" : "hidden"}>
                <BsChevronDoubleRight className="inline" />
              </span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-center my-3">
        <div>
          <div className="text-4xl my-3 text-center font-bold">Features</div>
          <div className="flex text-xl justify-between">
            <div>
              <ul className="list-disc">
                <li>Secure and Confidential</li>
                <li>Real-time tracking</li>
              </ul>
            </div>
            <div>
              <ul className="list-disc">
                <li>Anonymous</li>
                <li>Available 24/7</li>
              </ul>
            </div>
          </div>
          <div className="my-5 text-center text-2xl">
            Let us help you resolve your grievances effectively!
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
