/* eslint-disable @next/next/no-img-element */
import api from "@/instance/api";
import { OPTIONS } from "@/mock/Options";
import ImageWithFallback from "@/ui/components/ImgComponent";
import NotFound from "@/ui/components/notfound";
import Button from "@/ui/form/Button";
import StatusSelect from "@/ui/form/CustomSelect/StatusSelect";
import { EditIcon } from "@/ui/icons";
import { TrashIcon } from "@/ui/icons/all-icons/TrashIcon";
import { URLS } from "@/utils/URLS";
import { handleApiError } from "@/utils/hanldeApiError";
import { CategoryItemProps, CategoryRowProp, OptionType } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
interface Prop {
  categories: CategoryItemProps[];
  page?: number;
  del: (id: string) => Promise<void>;
}
const CategoryTable = ({ categories, del, page }: Prop) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-center font-Montserrat  text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 rounded-l-xl font-medium">No.</th>
              <th className="px-4 py-3 font-medium">Icon</th>
              <th className="px-4 py-3 text-center font-medium">
                Category Name
              </th>
              <th className="px-4 py-3 text-center font-medium">
                Total Sub Category
              </th>

              <th className="px-10 py-3 text-center font-medium"></th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium rounded-r-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {categories.length > 0 && categories !== undefined ? (
              <>
                {categories?.map((item: CategoryItemProps, index: number) =>
                  item && del ? (
                    <TableRow
                      del={() => del(item._id)}
                      index={index}
                      page={page}
                      key={index}
                      item={item}
                    />
                  ) : null
                )}
              </>
            ) : (
              <NotFound text="Categories not found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTable;

const TableRow = ({ item, del, index, page }: CategoryRowProp) => {
  const router = useRouter();
  const [loading, setloading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<OptionType>(
    item.draft
      ? { label: "Draft", value: "true" }
      : { label: "Active", value: "false" }
  );

  const handleStatusChange = async (e: CategoryItemProps, a: OptionType) => {
    setSelectedStatus(a);
    const draftVal = a.value === "true";
    const newdata = {
      draft: draftVal,
      name: e.name,
      icon: e.icon,
    };
    try {
      setloading(true);
      const { data } = await api.patch(`/category/${item._id}`, newdata);
      if (data) {
        setloading(false);
        toast.success("Status updated successfully");
      }
    } catch (error) {
      const err = handleApiError(error);
      toast.error(err);
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white text-center text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 rounded-l-lg">
          {" "}
          {page && index + 1 + (page - 1) * 5}
        </td>
        <td className="px-4 py-3 flex justify-center">
          <ImageWithFallback
            alt="Icon"
            src={item.icon}
            fallbackSrc="/assets/images/icon-alt.png"
            className="h-5 w-5 object-contain"
          />
        </td>
        <td className="px-4 py-3">{item.name}</td>
        <td className="px-4 py-3">{item.subCategories}</td>
        <td className="px-4 py-3">
          <Button
            onClick={() =>
              router.push(`${URLS.SUB_CATEGORY}?page=1&id=${item._id}`)
            }
            className="bg-brand_yellow-500 border-none h-10 py-0 font-medium"
          >
            View Sub Category
          </Button>
        </td>
        <td className="px-4 text-center ">
          <div className="flex items-center justify-center">
            <span className=" flex justify-evenly h-10 items-center w-min py-3 rounded-lg bg-brand_white-300">
              <StatusSelect
                prefixClassname="status-select-container"
                className="w-32 border-none status-select"
                options={OPTIONS}
                loading={loading}
                value={selectedStatus}
                onChange={(data: OptionType) => handleStatusChange(item, data)}
                placeholder="Active"
              />
            </span>
          </div>
        </td>
        <td className="py-3 h-full flex justify-center items-center gap-4">
          <div
            onClick={() => del(item._id)}
            className="bg-brand_red-300 cursor-pointer h-10 flex items-center justify-center w-10 rounded-full"
          >
            <TrashIcon />
          </div>
          <div
            onClick={() => router.push(`${URLS.ADD_CATEGORY}?id=${item._id}`)}
            className="bg-brand_yellow-500 cursor-pointer h-10 flex items-center justify-center w-10 rounded-full"
          >
            <EditIcon />
          </div>
        </td>
      </tr>
    </>
  );
};
