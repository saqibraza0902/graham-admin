import React, { CSSProperties } from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  color?: string;
  loading?: boolean;
}
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
const Loader = ({ color, loading }: Props) => {
  return (
    <div className="h-screen flex justify-center items-start">
      <ClipLoader
        color={color}
        loading={true}
        cssOverride={override}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
