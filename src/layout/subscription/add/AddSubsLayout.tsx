import api from '@/instance/api';
import { OPTIONS } from '@/mock/Options';
import { DURATION, PLANS } from '@/mock/SubsOptions';
import Button from '@/ui/form/Button';
import CustomSelect from '@/ui/form/CustomSelect';
import Input from '@/ui/form/Input';
import { URLS } from '@/utils/URLS';
import { handleApiError } from '@/utils/hanldeApiError';
import { OptionType, SubsDataState } from '@/utils/types';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const AddSubsLayout = () => {
  const params = useSearchParams();
  const router = useRouter();
  const id = params.get('id');
  const initialState: SubsDataState = {
    name: '',
    duration_in_days: '',
    draft: true,
    amount: '',
  };
  const [statevalues, setStateValues] = useState(initialState);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getSubscription = async () => {
      try {
        const { data } = await api.get(`/subscription/${id}`);
        setStateValues(data);
      } catch (error) {
        const err = handleApiError(error);
        toast.error(err);
      }
    };
    if (id) {
      getSubscription();
    }
  }, [id]);

  const handleAddSubs = async () => {
    if ((statevalues.name, statevalues.duration_in_days, statevalues.amount)) {
      const newdata = {
        name: statevalues.name,
        duration_in_days: statevalues.duration_in_days,
        draft: statevalues.draft,
        amount: statevalues.amount,
      };
      try {
        setloading(true);
        const { data } = await api.post('/subscription/create', newdata);
        if (data) {
          setStateValues(initialState);
          toast.success('Plan Added successfully');
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

  const handleUpdateSubs = async () => {
    if ((statevalues.name, statevalues.duration_in_days, statevalues.amount)) {
      const newdata = {
        name: statevalues.name,
        duration_in_days: statevalues.duration_in_days,
        draft: statevalues.draft,
        amount: statevalues.amount,
      };
      try {
        setloading(true);
        const { data } = await api.patch(`/subscription/update/${id}`, newdata);
        if (data) {
          setStateValues(initialState);
          toast.success('Plan updated successfully');
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
            <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
              Name
            </label>
            <CustomSelect
              className="w-full xl:w-60 "
              options={PLANS}
              value={
                statevalues.name && statevalues.name !== null
                  ? PLANS.map((el) => {
                      if (String(el.value) === String(statevalues.name)) {
                        return el;
                      }
                    })
                  : statevalues.name
              }
              onChange={(e: OptionType) =>
                setStateValues({ ...statevalues, name: e.value })
              }
              placeholder="Name"
            />
          </div>
          <div className="w-full">
            <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
              Duration
            </label>

            <CustomSelect
              className="w-full xl:w-60 "
              options={DURATION}
              value={
                statevalues.duration_in_days &&
                statevalues.duration_in_days !== null
                  ? DURATION.map((el) => {
                      if (
                        Number(el.value) ===
                        Number(statevalues.duration_in_days)
                      ) {
                        return el;
                      }
                    })
                  : statevalues.name
              }
              onChange={(e: OptionType) =>
                setStateValues({
                  ...statevalues,
                  duration_in_days: Number(e.value),
                })
              }
              placeholder="Duration"
            />
          </div>
          <div className="w-full">
            <label className="font-Montserrat font-medium text-sm text-brand_grey-500">
              Status
            </label>

            <CustomSelect
              className="w-full xl:w-60 "
              value={
                statevalues.draft || statevalues.draft === false
                  ? OPTIONS.find(
                      (el) => el.value === statevalues.draft.toString()
                    )
                  : { label: 'Draft', value: 'true' }
              }
              onChange={(e: OptionType) =>
                setStateValues({ ...statevalues, draft: e.value })
              }
              options={OPTIONS}
              placeholder="Status"
            />
          </div>
        </div>
        <div className="h-full flex flex-col lg:px-20 gap-4  lg:flex-row lg:gap-8 justify-center">
          <div className="w-full">
            <Input
              labelClassName="font-Montserrat font-medium text-sm text-brand_grey-500"
              label="Amount"
              showIcon={false}
              type="number"
              value={statevalues.amount}
              onChange={(e) =>
                setStateValues({ ...statevalues, amount: e.target.value })
              }
              placeholder="Enter Amount"
              wrapperClassName="w-full  xl:w-60"
              className="border-[1px] px-0 w-full font-medium font-Montserrat text-brand_black-500 text-sm h-10 rounded-lg border-black"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button
            disabled={loading}
            onClick={() => {
              if (id) {
                handleUpdateSubs();
              } else {
                handleAddSubs();
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

export default AddSubsLayout;
