import { Tooltip } from "react-tooltip";
const Test = () => {
  return (
    <div>
      <Tooltip id="my-tooltip" />
      <span
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello world!"
        data-tooltip-place="top"
        data-tooltip-variant="info"
      >
        ◕‿‿◕
      </span>
      <span
        data-tooltip-id="my-tooltip"
        data-tooltip-content="Hello to you too!"
      >
        ◕‿‿◕
      </span>
    </div>
  );
};
export default Test;
