import api from '@/instance/api';
import { OPTIONS } from '@/mock/Options';
import { DURATION, PLANS } from '@/mock/SubsOptions';
import NotFound from '@/ui/components/notfound';
import StatusSelect from '@/ui/form/CustomSelect/StatusSelect';
import { EditIcon } from '@/ui/icons';
import { TrashIcon } from '@/ui/icons/all-icons/TrashIcon';
import { URLS } from '@/utils/URLS';
import { handleApiError } from '@/utils/hanldeApiError';
import {
  OptionType,
  SubsItemProps,
  SubsRowProps,
  SubsTableProp,
} from '@/utils/types';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from '../Modal';

const SubsTable = ({ subs, page, del }: SubsTableProp) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-center font-Montserrat  text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 rounded-l-xl font-medium">No.</th>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 text-center font-medium">Duration</th>
              <th className="px-4 py-3 text-center font-medium">Amount</th>
              <th className="px-4 py-3 text-center font-medium">Status</th>
              <th className="px-4 py-3 text-center font-medium rounded-r-xl">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {subs.length > 0 && subs !== undefined ? (
              <>
                {subs.map((item: SubsItemProps, index) =>
                  item && del ? (
                    <TableRow
                      del={async () => del(item._id)}
                      item={item}
                      index={index}
                      page={page}
                      key={index}
                    />
                  ) : null
                )}
              </>
            ) : (
              <NotFound text="No subscription plan found" />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubsTable;

const TableRow = ({ item, index, del, page }: SubsRowProps) => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const [selectedStatus, setSelectedStatus] = useState<OptionType>(
    item.draft
      ? { label: 'Draft', value: 'true' }
      : { label: 'Active', value: 'false' }
  );

  const handleStatusChange = async (e: SubsItemProps, a: OptionType) => {
    setSelectedStatus(a);
    const draftVal = a.value === 'true';
    const newdata = {
      draft: draftVal,
      duration_in_days: e.duration_in_days,
      name: e.name,
      amount: e.amount,
    };
    try {
      setloading(true);
      const { data } = await api.patch(
        `/subscription/update/${item._id}`,
        newdata
      );
      if (data) {
        setloading(false);
        toast.success('Status updated successfully');
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
          {page && index + 1 + (page - 1) * 5}
        </td>
        <td className="px-4 py-3 flex justify-center">
          {PLANS.map((el) => {
            if (el.value === item.name) {
              return el.label;
            }
          })}
        </td>
        <td className="px-4 py-3">
          {DURATION.map((el) => {
            if (el.value === item.duration_in_days) {
              return el.label;
            }
          })}
        </td>
        <td className="px-4 py-3">${item.amount}</td>
        <td className="px-4 text-center">
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
            onClick={openModal}
            className="bg-brand_red-300 cursor-pointer h-10 flex items-center justify-center w-10 rounded-full"
          >
            <TrashIcon />
          </div>
          <Modal
            handleClose={closeModal}
            open={showModal}
            handleDel={() => del(item._id)}
          />

          <div
            onClick={() =>
              router.push(`${URLS.ADD_SUBSCRIPTION}?id=${item._id}`)
            }
            className="bg-brand_yellow-500 cursor-pointer h-10 flex items-center justify-center w-10 rounded-full"
          >
            <EditIcon />
          </div>
        </td>
      </tr>
    </>
  );
};
