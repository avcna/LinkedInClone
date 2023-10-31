import React from "react";
import moment from "moment/moment";

export const getCurrentTimestamp = () => {
  return moment().format("LLL");
};
