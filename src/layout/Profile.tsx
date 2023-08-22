import ImageWithFallback from "@/ui/components/ImgComponent";
import FormattedDate from "@/ui/components/formatteddate";
import Button from "@/ui/form/Button";
import { HandSet, LocationBlack, Mail } from "@/ui/icons";
import { ProfileProps } from "@/utils/types";
import React from "react";

const Profile = ({ prof }: ProfileProps) => {
  const OTHERDETAILS = [
    {
      title: "Country",
      detail: prof?.country,
    },
    {
      title: "State",
      detail: prof?.state,
    },
    {
      title: "City",
      detail: prof?.city,
    },
    {
      title: "Zip Code",
      detail: prof?.zip_code,
    },
    {
      title: "Status",
      detail: prof?.varified ? "Active" : "Deactivated",
    },
    {
      title: "Type",
      detail: "Seller",
    },
    {
      title: "Created At",
      detail: <FormattedDate date={prof?.createdAt} />,
    },
  ];
  return (
    <div className="space-y-4">
      {prof && (
        <div className="bg-white rounded-xl flex flex-col gap-10 p-6 w-full">
          <div className="flex flex-col gap-3 items-center justify-center w-full">
            <ImageWithFallback
              src={prof.profile_image}
              fallbackSrc="/assets/images/alt-prof.jpg"
              className="w-[75px] h-[75px]"
              alt="Profile"
            />
            <span className="text-xl font-bold text-center font-Montserrat">
              {prof?.fullName}
            </span>
          </div>
          <div className=" flex flex-col gap-5 text-xs font-Montserrat font-medium">
            <div className="flex gap-4 items-start">
              <Mail />
              <span>{prof?.email ? prof?.email : "NaN"}</span>
            </div>
            <div className="flex gap-4 items-start">
              <HandSet />
              <span>{prof?.phoneNumber ? prof?.phoneNumber : "NaN"}</span>
            </div>
            <div className="flex gap-4 items-start">
              <LocationBlack />
              <span>{!prof?.address && "NAN"}</span>
            </div>
          </div>
          <Button>Contact Me</Button>
        </div>
      )}
      {prof && (
        <div className="space-y-4">
          <h2 className="text-xl font-Montserrat  font-semibold">
            Other Details
          </h2>
          <div className="bg-white rounded-xl flex flex-col gap-10 p-6 w-full">
            <div className=" grid grid-cols-3 gap-2 text-xs font-Montserrat font-medium">
              {OTHERDETAILS.map((el, index) => (
                <div key={index} className="flex flex-col gap-y-1">
                  <span className="text-brand_grey-400 font-medium">
                    {el.title}
                  </span>
                  <span className="font-semibold">
                    {el.detail ? el.detail : "NaN"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
