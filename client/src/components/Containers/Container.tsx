import React from "react";

function Container({ children }: React.PropsWithChildren) {
  return <div className="w-11/12 mx-auto relative ">{children}</div>;
}

export default Container;
