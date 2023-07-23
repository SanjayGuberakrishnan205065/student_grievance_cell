import { FaInfoCircle } from "react-icons/fa";
import { MdContactMail } from "react-icons/md";
import { AiOutlineTeam } from "react-icons/ai";

const About = () => {
  return (
    <div className="container mx-auto my-3">
      <div className="">
        <div>
          <h1 className="text-3xl font-bold">About Us</h1>
        </div>
        <p className="mt-4">
          MIT Guardian is a Student Grievance Cell which serves as a centralized
          platform that allows students to submit and track grievances in a safe
          and confidential manner. We provide a dashboard for authorities to
          manage grievances, assign them to the appropriate department, and
          track their progress in real-time. This service is available 24/7 to
          provide support and assistance to students and authorities.
        </p>
        <div>
          <h1 className="text-3xl font-bold mt-4">Features</h1>
          <p className="mb-3">
            Students can submit grievances across various categories including
            <ul className="text-gray-500 list-disc list-inside dark:text-gray-400">
              <li>Academics</li>
              <li>Infrastructure</li>
              <li>Library</li>
              <li>Administration</li>
            </ul>
          </p>
          <p className="mb-3">
            Students can track the status of their grievances and staffs will be
            able to respond to them. Students can also submit grievances
            anonymously, if they wish to do.
          </p>
          <p>
            We ensure that all grievances are handled in a confidential manner.
            Only the student and the staffs involved in the grievance will be
            able to view the details regarding a grievance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
