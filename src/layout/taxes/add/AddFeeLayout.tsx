import api from '@/instance/api';
import { OPTIONS } from '@/mock/Options';
import Button from '@/ui/form/Button';
import CustomSelect from '@/ui/form/CustomSelect';
import Input from '@/ui/form/Input';
import { URLS } from '@/utils/URLS';
import { handleApiError } from '@/utils/hanldeApiError';
import { FeeDataState, OptionType } from '@/utils/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddFeeLayout = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const initialData = {
    name: '',
    percentage: '',
    draft: true,
  };
  const [feeData, setFeeData] = useState<FeeDataState>(initialData);
  const params = useSearchParams();
  const id = params.get('id');
  useEffect(() => {
    const getTax = async () => {
      try {
        const { data } = await api.get(`/tax/single/tax/${id}`);
        setFeeData(data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      }
    };
    if (id) {
      getTax();
    }
  }, [id]);

  const handleAddfee = async () => {
    if ((feeData.name, feeData.percentage)) {
      try {
        setloading(true);
        const { data } = await api.post('/tax/create', feeData);
        if (data) {
          setFeeData(initialData);
          toast.success('Tax added Successfully');
          setloading(false);
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error('Please fill the fields');
    }
  };
  const handleUpdateFee = async () => {
    if ((feeData.name, feeData.percentage)) {
      try {
        setloading(true);
        const { data } = await api.patch(`/tax/update/${id}`, feeData);
        if (data) {
          setFeeData(initialData);
          toast.success('Tax updated Successfully');
          setloading(false);
          router.back();
        }
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      } finally {
        setloading(false);
      }
    } else {
      toast.error('Please fill the fields');
    }
  };
  return (
    <div className="h-screen my-5">
      <div className="w-full lg:px-0 px-5 bg-white gap-5 flex flex-col  rounded-xl py-10">
        <div className="h-full flex flex-col lg:px-20 gap-4  lg:flex-row lg:gap-8 justify-center">
          <div className="w-full">
            <Input
              labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
              label="Name"
              value={feeData.name}
              onChange={(e) => setFeeData({ ...feeData, name: e.target.value })}
              showIcon={false}
              placeholder="Enter Name"
              wrapperClassName="w-full xl:w-60"
              className="border-[1px] px-0 w-full font-medium font-Montserrat text-brand_black-500 text-sm h-10 rounded-lg border-black"
            />
          </div>
          <div className="w-full">
            <Input
              labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
              label="Percentage"
              type="number"
              value={feeData.percentage}
              onChange={(e) =>
                setFeeData({ ...feeData, percentage: Number(e.target.value) })
              }
              showIcon={false}
              placeholder="Enter Percentage"
              wrapperClassName="w-full  xl:w-60"
              className="border-[1px] px-0 w-full font-medium font-Montserrat text-brand_black-500 text-sm h-10 rounded-lg border-black"
            />
          </div>
          <div className="w-full">
            <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
              Status
            </label>

            <CustomSelect
              className="w-full xl:w-60 "
              options={OPTIONS}
              value={
                feeData.draft || feeData.draft === false
                  ? OPTIONS.find((el) => el.value === feeData.draft.toString())
                  : { label: 'Draft', value: 'true' }
              }
              onChange={(e: OptionType) =>
                setFeeData({ ...feeData, draft: e.value })
              }
              placeholder="Status"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            disabled={loading}
            onClick={() => {
              if (id) {
                handleUpdateFee();
              } else {
                handleAddfee();
              }
            }}
            className="bg-brand_yellow-500 h-10 py-0 border-none w-full lg:w-1/3 "
          >
            {id ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddFeeLayout;
