import React from "react";

const First = ({ setFormPage, data, handleChange }) => {
  const { organizationName, organizationCategory, organizationDescription } =
    data;
  const categories = [
    "Entertainment",
    "Company",
    "University",
    "School",
    "Agency",
  ];

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="font-bold text-4xl text-center mb-10">
          Tell us about your Organization!
        </h1>
      </div>
      <div className="flex gap-x-5 mb-5">
        <div className="w-1/2 h-[95%] my-auto">
          <img
            src="https://img.freepik.com/free-vector/employees-meeting-office-kitchen-drinking-coffee_74855-5237.jpg?w=900&t=st=1680948764~exp=1680949364~hmac=b505765c0dfecb93300b18c4dc6f586d4b36ead094a810a0985d6f7f07b0f61b"
            className="w-full h-full object-contain"
          />
        </div>
        <form className="flex flex-col gap-y-5 w-1/2">
          <input
            type="text"
            placeholder="Organization Name"
            className="px-4 py-2 rounded-full outline-none text-white placeholder:text-white"
            name="organizationName"
            value={organizationName}
            onChange={handleChange}
          />
          <select
            className="px-3 py-2 rounded-full text-white placeholder:text-white outline-none"
            name="organizationCategory"
            value={organizationCategory}
            onChange={handleChange}
          >
            <option value={""} className="px-4 py-2 rounded-full">
              Category
            </option>
            {categories.map((category) => (
              <option
                key={category}
                value={category}
                className="px-4 py-2 rounded-full"
              >
                {category}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Description (optional)"
            className="px-4 py-2 rounded-xl resize-none text-white placeholder:text-white outline-none placeholder:italic h-full"
            name="organizationDescription"
            value={organizationDescription}
            onChange={handleChange}
          ></textarea>
        </form>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-blackShade text-white cursor-pointer px-5 py-3 rounded-md disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={() => setFormPage((prev) => prev + 1)}
          disabled={
            organizationName &&
            organizationCategory 
              ? false
              : true
          }
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default First;
