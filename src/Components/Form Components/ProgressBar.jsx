import { BiBadgeCheck } from "react-icons/bi";

function ProgressBar({ formPage }) {
  return (
    <div
      className={`w-[90%] max-w-[800px] mx-auto mt-5 rounded-full relative bg-progress-bar-track mb-10 flex justify-center items-center h-6`}
    >
      <div
        className={`
              bg-progress-bar-progress
                h-full rounded-full absolute top-0 left-0`}
        style={{ width: `${formPage * 34}%` }}
      ></div>
      <div className="flex justify-between absolute -top-1/2 w-full">
        {formPage + 1 > 1 ? (
          <div className="bg-progress-bar-indicator w-max  rounded-full border-progress-bar-indicator-border">
            <BiBadgeCheck color="green" size={42} />
          </div>
        ) : (
          <div
            className={`bg-progress-bar-indicator w-max border-2 px-4 py-2 rounded-full border-progress-bar-indicator-border `}
          >
            <p>1</p>
          </div>
        )}

        {formPage + 1 > 2 ? (
          <div className="bg-progress-bar-indicator w-max  rounded-full border-progress-bar-indicator-border">
            <BiBadgeCheck color="green" size={42} />
          </div>
        ) : (
          <div
            className={`bg-progress-bar-indicator w-max border-2 px-4 py-2 rounded-full border-progress-bar-indicator-border `}
          >
            <p>2</p>
          </div>
        )}
        {formPage + 1 > 3 ? (
          <div className="bg-progress-bar-indicator w-max rounded-full border-progress-bar-indicator-border">
            <BiBadgeCheck color="green" size={42} />
          </div>
        ) : (
          <div
            className={`bg-progress-bar-indicator w-max border-2 px-4 py-2 rounded-full border-progress-bar-indicator-border `}
          >
            <p>3</p>
          </div>
        )}
        {formPage + 1 >= 4 ? (
          <div className="bg-progress-bar-indicator w-max  rounded-full border-progress-bar-indicator-border">
            <BiBadgeCheck color="green" size={42} />
          </div>
        ) : (
          <div
            className={`bg-progress-bar-indicator w-max border-2 px-4 py-2 rounded-full border-progress-bar-indicator-border `}
          >
            <p>4</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProgressBar;
