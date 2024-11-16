import React from "react";
import { supportlist, supportlistHeader } from "../utils/supportlist";

const Support = ({ purpose }) => {
  return (
    <div className="text-white min-h-screen">
      <div className="sm:w-full md:w-1/2  md:ms-auto md:me-auto  p-5 bg-slate-900 border-2">
        <p className="text-center text-2xl ">{supportlistHeader[purpose]}</p>
        <div className="mt-4">
          {supportlist[purpose].map((supportpurpose, index) => (
            <div className="my-2" key={index}>
              <p className="text-lg font-semibold underline">
                {supportpurpose.heading}
              </p>
              <p className="text-lg font-light">
                {supportpurpose.content.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    <br />
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;
