/* eslint-disable @next/next/no-img-element */
import Button from "@/ui/form/Button";
import CustomSelect from "@/ui/form/CustomSelect";
import Input from "@/ui/form/Input";
import { RadioChecked, RadioUnchecked } from "@/ui/icons";
import { cn } from "@/utils/styles";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { fileIntoBase64 } from "@/utils/fileIntoBase64";
import { handleApiError } from "@/utils/hanldeApiError";
import api from "@/instance/api";
import {
  CategoryDataState,
  CategoryRadioButtonProps,
  SubCategoryDataState,
  OptionType,
  SubCategoryOpts,
} from "@/utils/types";
import { OPTIONS } from "@/mock/Options";
import { useRouter, useSearchParams } from "next/navigation";
import { URLS } from "@/utils/URLS";
interface Props {
  parent: null | boolean;
  sub: null | boolean;
}
const AddCatLayout = () => {
  const [checked, setChecked] = useState<null | boolean>(true);
  const initialState: Props = {
    parent: null,
    sub: null,
  };
  const [disabled, setDisabled] = useState(initialState);
  const [data, setData] = useState();
  const param = useSearchParams();
  const id = param.get("id");
  useEffect(() => {
    const getCategory = async () => {
      try {
        const { data } = await api.get(`/category/${id}`);
        setData(data);
        if (!data.parent_category) {
          setChecked(true);
          setDisabled({ parent: true, sub: true });
        } else {
          setChecked(false);
          setDisabled({ parent: true, sub: true });
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      }
    };
    if (id) {
      getCategory();
    }
  }, [id]);
  return (
    <div className="h-screen my-5">
      <div className="w-full lg:px-0 px-5 bg-white gap-5 flex flex-col  rounded-xl py-10">
        <div className="flex flex-col md:flex-row gap-4 justify-center md:gap-10">
          <RadioButton
            checked={checked}
            onChange={() => setChecked(!checked)}
            title="Category"
            disabled={disabled.parent}
          />
          <RadioButton
            checked={!checked}
            onChange={() => setChecked(!checked)}
            title="Sub Category"
            disabled={disabled.sub}
          />
        </div>
        {checked ? (
          <Category data={data} id={id} />
        ) : (
          <SubCategory id={id} data={data && data} />
        )}
      </div>
    </div>
  );
};

export default AddCatLayout;

interface SubCategoryParentProps {
  _id: string;
  draft: boolean;
  name: string;
  icon: string;
}
interface dataProps {
  _id: string;
  draft: boolean;
  parent_category: null | string;
  name: string;
}
interface SubCategoryProps {
  data?: dataProps | null;
  id?: string | null;
}
const SubCategory = ({ data, id }: SubCategoryProps) => {
  const initialState = {
    draft: true,
    name: "",
    parent_category: "",
  };
  const OptsInitial = {
    status: {
      label: "Draft",
      value: "true",
    },
    parent: {
      label: "",
      value: "",
    },
  };
  const [catsArray, setCatsArray] = useState([]);
  const [opts, setOpts] = useState<SubCategoryOpts>(OptsInitial);
  const [loading, setloading] = useState(false);

  const [stateValues, setStateValues] =
    useState<SubCategoryDataState>(initialState);
  useEffect(() => {
    const getCats = async () => {
      try {
        const { data } = await api.get("/category/parent/categories");
        setCatsArray(data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      }
    };
    getCats();
    if (data) {
      setStateValues({
        draft: data.draft,
        name: data.name,
        parent_category: data.parent_category,
      });
      setOpts({
        parent: { label: data.parent_category, value: data.parent_category },
        status: {
          label: data.draft ? "Draft" : "Active",
          value: data.draft.toString(),
        },
      });
    }
  }, [data]);
  const transformedArray = catsArray.map((item: SubCategoryParentProps) => ({
    label: item.name,
    value: item._id,
  }));
  const selectedParent = transformedArray.find(
    (item) => item.value === stateValues.parent_category
  );
  const handleAddSubCategory = async () => {
    if (stateValues.name && stateValues.parent_category) {
      try {
        setloading(true);
        const { data } = await api.post("/category/create", stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialState);
          setOpts(OptsInitial);
          toast.success("Category added Successfully");
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error("Please fill the fields");
    }
  };
  const handleOnChange = (e: OptionType) => {
    const draftVal = e.value === "true";
    setStateValues({ ...stateValues, draft: draftVal });
    setOpts({ ...opts, status: e });
  };
  const handleCategoryChange = (e: OptionType) => {
    setStateValues({ ...stateValues, parent_category: String(e.value) });
    setOpts({ ...opts, parent: e });
  };
  const handleUpdateSubCategory = async () => {
    if (stateValues.name && stateValues.parent_category) {
      try {
        setloading(true);
        const { data } = await api.patch(`/category/${id}`, stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialState);
          setOpts(OptsInitial);
          toast.success("Category updated Successfully");
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error("Please fill the fields");
    }
  };
  return (
    <>
      <div className="h-full flex flex-col lg:px-20 gap-4  lg:flex-row lg:gap-8 justify-center">
        <div className="w-full">
          <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
            Parent Category
          </label>
          <CustomSelect
            className="w-full xl:w-60 "
            options={transformedArray}
            value={selectedParent}
            onChange={(e: OptionType) => handleCategoryChange(e)}
            placeholder="Select Category"
          />
        </div>
        <div className="w-full">
          <Input
            label="Name"
            value={stateValues.name}
            onChange={(e) =>
              setStateValues({ ...stateValues, name: e.target.value })
            }
            showIcon={false}
            labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
            wrapperClassName="w-full  xl:w-60"
            placeholder="Enter Name"
            className="border-[1px] px-0 w-full font-medium font-Montserrat text-brand_black-500 text-sm h-10 rounded-lg border-black"
          />
        </div>
        <div className="w-full">
          <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
            Status
          </label>

          <CustomSelect
            className="w-full lg:w-60 "
            options={OPTIONS}
            value={
              stateValues.draft !== undefined
                ? OPTIONS.find(
                    (el) => el.value === stateValues.draft.toString()
                  )
                : { label: "Draft", value: "true" }
            }
            onChange={(e: OptionType) => handleOnChange(e)}
            placeholder="Status"
          />
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={loading}
          onClick={() => {
            if (id) {
              handleUpdateSubCategory();
            } else {
              handleAddSubCategory();
            }
          }}
          className="bg-brand_yellow-500 border-none w-full h-10 py-0 lg:w-4/12 "
        >
          {id ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

const Category = ({ data, id }: any) => {
  const [val, setVal] = useState<any>({});
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const initialState = { draft: true, name: "", icon: null };
  const [stateValues, setStateValues] =
    useState<CategoryDataState>(initialState);

  useEffect(() => {
    if (data) {
      setStateValues({ draft: data.draft, icon: data.icon, name: data.name });
    }
  }, [data]);

  const handleImageChange = async (data: File) => {
    const base64Image = await fileIntoBase64(data);
    setStateValues({ ...stateValues, icon: base64Image });
    setVal(data);
  };
  const handleOnChange = (e: OptionType) => {
    const draftVal = e.value === "true";
    setStateValues({ ...stateValues, draft: draftVal });
  };
  const AddCategory = async () => {
    if ((stateValues.name, stateValues.icon)) {
      try {
        setloading(true);
        const { data } = await api.post("/category/create", stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialState);
          setVal({});
          toast.success("Category added Successfully");
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error("Please fill the fields");
    }
  };
  const UpdateCategory = async () => {
    if ((stateValues.name, stateValues.icon)) {
      try {
        setloading(true);
        const { data } = await api.patch(`/category/${id}`, stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialState);
          router.push(URLS.CATEGORIES);
          toast.success("Category updated Successfully");
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error("Please fill the fields");
    }
  };
  return (
    <>
      <div className="h-full flex flex-col gap-4 justify-center lg:flex-row lg:gap-8">
        <div>
          <Input
            label="Name"
            value={stateValues.name}
            onChange={(e) =>
              setStateValues({ ...stateValues, name: e.target.value })
            }
            showIcon={false}
            labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
            className="border-[1px] w-full lg:w-60 h-10 px-0 rounded-lg border-black"
          />
        </div>
        <div>
          <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
            Status
          </label>
          <CustomSelect
            className="w-full lg:w-60 "
            options={OPTIONS}
            value={
              stateValues.draft || stateValues.draft === false
                ? OPTIONS.find(
                    (el) => el.value === stateValues.draft.toString()
                  )
                : { label: "Draft", value: "true" }
            }
            onChange={(e: OptionType) => handleOnChange(e)}
            placeholder="Status"
          />
        </div>
      </div>
      <div className="h-full flex flex-col gap-4 justify-center items-center lg:flex-row lg:gap-8">
        <div className="w-full lg:w-60">
          <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
            Upload Icon
          </label>
          <label
            htmlFor="actual-btn"
            className="cursor-pointer bg-brand_white-500 flex justify-start px-3 font-Montserrat text-sm font-semibold items-center h-10 w-full xl:w-60 rounded-lg "
          >
            Browse files
            <input
              onChange={(e) => {
                if (!e.target.files) {
                  return;
                }
                const file = e.target.files[0];
                handleImageChange(file);
                e.target.value = "";
              }}
              type="file"
              id="actual-btn"
              className="hidden"
            />
          </label>
          <input type="file" id="actual-btn" className="hidden" />
        </div>
        <div className="w-full flex gap-3 lg:w-60">
          {data && (
            <img
              src={stateValues.icon ? stateValues.icon : data.icon}
              alt="icon"
            />
          )}
          <label className="">{val?.name}</label>
        </div>
      </div>
      <div className="flex justify-center">
        <Button
          disabled={loading}
          onClick={() => {
            if (id) {
              UpdateCategory();
            } else {
              AddCategory();
            }
          }}
          className="bg-brand_yellow-500 border-none py-0 h-10 w-full lg:w-1/3 "
        >
          {data ? "Update" : "Save"}
        </Button>
      </div>
    </>
  );
};

const RadioButton = ({
  checked,
  onChange,
  title,
  disabled,
}: CategoryRadioButtonProps) => {
  return (
    <div
      onClick={() => {
        if (!disabled) {
          onChange();
        }
      }}
      className={cn(
        "w-full lg:w-52 px-3 py-2 rounded-xl flex items-center gap-x-3 cursor-pointer border",
        {
          "bg-brand_green-500": checked,
          "bg-white": !checked,
        }
      )}
    >
      {checked ? (
        <RadioChecked className="fill-white" />
      ) : (
        <RadioUnchecked className="fill-white" />
      )}
      <h1
        className={cn("font-Roboto text-sm text-black", {
          "text-white": checked,
        })}
      >
        {title}
      </h1>
    </div>
  );
};
