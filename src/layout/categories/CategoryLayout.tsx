import Pagination from "@/ui/components/pagination";
import Button from "@/ui/form/Button";
import { URLS } from "@/utils/URLS";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  breadcrump?: string;
  isShow?: boolean;
  children: React.ReactNode;
  len?: number | undefined;
  title?: string;
}
const CategoryLayout = ({
  breadcrump,
  isShow,
  len = 0,
  children,
  title = "Category",
}: Props) => {
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const totalPages: number | undefined = len && Math.ceil(len / 5);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold font-Nunito">
        {title} <span className="text-brand_grey-300"> {breadcrump}</span>
      </h2>
      {isShow && (
        <div className="flex flex-col gap-5 lg:gap-0 lg:flex-row my-5 lg:items-center justify-end">
          <Button
            onClick={() => router.push(URLS.ADD_CATEGORY)}
            className="font-Montserrat font-medium w-max px-8 h-10 py-0 bg-brand_yellow-500 border-none"
          >
            Add Category / Sub Category
          </Button>
        </div>
      )}
      <div>{children}</div>
      {len > 0 ? (
        <div>
          <Pagination
            currentPage={Number(page)}
            onPageChange={handlePageChange}
            totalPages={Number(totalPages)}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default CategoryLayout;
