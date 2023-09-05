import api from '@/instance/api';
import { OPTIONS } from '@/mock/Options';
import Button from '@/ui/form/Button';
import CustomSelect from '@/ui/form/CustomSelect';
import Input from '@/ui/form/Input';
import { URLS } from '@/utils/URLS';
import { handleApiError } from '@/utils/hanldeApiError';
import { BrandDataState, OptionType } from '@/utils/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddBrandLayout = () => {
  const [loading, setloading] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');
  const initialData = {
    name: '',
    draft: true,
  };
  const [stateValues, setStateValues] = useState<BrandDataState>(initialData);

  useEffect(() => {
    const getBrand = async () => {
      try {
        const { data } = await api.get(`/brand/${id}`);
        setStateValues({ draft: data.draft, name: data.name });
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      }
    };
    if (id) {
      getBrand();
    }
  }, [id]);
  const handleAddBrand = async () => {
    if (stateValues.name) {
      try {
        setloading(true);
        const { data } = await api.post('/brand/create', stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialData);
          toast.success('Brand added Successfully');
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
  const handleUpdateBrand = async () => {
    if (stateValues.name) {
      try {
        setloading(true);
        const { data } = await api.patch(`/brand/update/${id}`, stateValues);
        if (data) {
          setloading(false);
          setStateValues(initialData);
          router.back();
          toast.success('Brand updated Successfully');
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
        <div className="h-full flex flex-col gap-4 justify-center lg:flex-row lg:gap-8">
          <div>
            <Input
              label="Name"
              value={stateValues.name}
              onChange={(e) =>
                setStateValues({ ...stateValues, name: e.target.value })
              }
              labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
              placeholder="Enter Name"
              showIcon={false}
              wrapperClassName="w-full  xl:w-60"
              className="border-[1px] px-0 w-full font-medium font-Montserrat text-brand_black-500 text-sm h-10 rounded-lg border-black"
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
                  : { label: 'Draft', value: 'true' }
              }
              onChange={(e: OptionType) =>
                setStateValues({ ...stateValues, draft: e.value })
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
                handleUpdateBrand();
              } else {
                handleAddBrand();
              }
            }}
            className="bg-brand_yellow-500 border-none w-full h-10 py-0 lg:w-1/3 "
          >
            {id ? 'Update' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddBrandLayout;
