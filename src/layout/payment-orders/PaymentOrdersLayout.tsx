import { limit } from "@/instance/limit";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setClear, setEndDate, setStartDate } from "@/redux/slices/dateslice";
import Pagination from "@/ui/components/pagination";
import Button from "@/ui/form/Button";
import DateInput from "@/ui/form/DatePicker";
import Input from "@/ui/form/Input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
  isShown?: boolean;
  len?: number;
  page?: number;
}
const PaymentOrdersLayout = ({
  isShown = true,
  len = 0,
  page,
  children,
}: Props) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const s_date = useAppSelector((state) => state.date.start_date);
  const e_date = useAppSelector((state) => state.date.end_date);
  const [dates, setDates] = useState({
    start_date: "",
    end_date: "",
  });
  const totalPages: number | undefined = len && Math.ceil(len / limit);
  const handlePageChange = (page: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("page", String(page));
    router.push(`?${searchParams.toString()}`);
  };

  const handleSubmit = () => {
    console.log(s_date, dates.start_date, e_date, dates.end_date);
    if (dates.start_date && dates.end_date) {
      dispatch(setStartDate(dates.start_date));
      dispatch(setEndDate(dates.end_date));
    } else {
      toast.error("Please select both dates");
    }
  };

  return (
    <div>
      {isShown && (
        <div className="flex flex-col gap-2 lg:flex-row lg:gap-5 lg:items-center ">
          <div className="flex w-full flex-col md:flex-row items-center gap-2">
            <DateInput
              onChange={(e) =>
                setDates({ ...dates, start_date: e.target.value })
              }
              value={dates.start_date ? dates.start_date : dates.start_date}
              className="w-full"
              InputType="date"
            />
            <DateInput
              onChange={(e) => setDates({ ...dates, end_date: e.target.value })}
              className="w-full"
              InputType="date"
              value={dates.end_date ? dates.end_date : dates.end_date}
            />
          </div>
          <div className="flex w-full flex-col md:flex-row items-center lg:justify-end gap-2">
            <Button
              onClick={() => dispatch(setClear())}
              className="w-full md:w-auto px-10 h-10 py-0"
            >
              Clear
            </Button>
            <Button
              onClick={() => handleSubmit()}
              className="w-full md:w-auto px-10 h-10 py-0 bg-brand_yellow-500 border-none"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      <div className="mt-5">{children}</div>
      <div>
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
    </div>
  );
};

export default PaymentOrdersLayout;
