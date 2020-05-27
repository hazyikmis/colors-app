import React from "react";

import "./Page.css";

/*
export const Page = (props) => {
  return <section className="page">{props.children}</section>;
};
*/

export const Page = ({ children }) => {
  return <section className="page">{children}</section>;
};
