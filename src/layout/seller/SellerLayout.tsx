import React from "react";
import Tabs from "./Tabs";
import Profile from "../Profile";
import { AdCreatedBy } from "@/utils/types";
import Pagination from "@/ui/components/pagination";
import { useRouter } from "next/navigation";

interface Props {
  children?: React.ReactNode;
  tabTitle?: string;
  isShow?: boolean;
  prof?: AdCreatedBy | undefined;
  len?: number;
  page?: number;
}
const SellerLayout = ({
  tabTitle,
  page,
  isShow = true,
  prof,
  len = 0,
  children,
}: Props) => {
  const router = useRouter();
  const totalPages: number | undefined = len && Math.ceil(len / 3);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div className="w-full">
      {prof && (
        <h2 className="font-Nunito text-brand_black-500 text-xl font-bold">
          Seller / {prof.fullName}
        </h2>
      )}
      <div className="flex flex-col lg:flex-row gap-5 mt-5">
        <div className="lg:w-4/12 flex flex-col gap-y-5">
          <Profile prof={prof} />
        </div>
        {isShow && (
          <div className="lg:w-8/12">
            <div className="flex flex-col gap-5 lg:flex-row lg:gap-0  w-full items-center ">
              <Tabs />
            </div>
            <div>
              <div className="my-5 flex w-full ">
                <h1 className="font-Montserrat w-full text-xl font-semibold">
                  {tabTitle}
                </h1>
              </div>
              <div>{children}</div>
            </div>
            <div>
              {len > 0 ? (
                <Pagination
                  currentPage={Number(page)}
                  onPageChange={handlePageChange}
                  totalPages={Number(totalPages)}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerLayout;
