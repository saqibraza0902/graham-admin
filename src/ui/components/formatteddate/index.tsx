import React from "react";

interface Props {
  date: string | undefined;
  time?: boolean;
}

const formatDate = (inputDate: any, includeTime: boolean) => {
  const date = new Date(inputDate);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const formattedDate = `${
    months[date.getMonth()]
  } ${date.getDate()}, ${date.getFullYear()}`;

  if (includeTime) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${hours % 12}:${minutes
      .toString()
      .padStart(2, "0")} ${ampm}`;

    return `${formattedDate} - ${formattedTime}`;
  }

  return formattedDate;
};

const FormattedDate = ({ date, time = false }: Props) => {
  const formattedOutput = formatDate(date, time);

  return <span>{formattedOutput}</span>;
};

export default FormattedDate;
