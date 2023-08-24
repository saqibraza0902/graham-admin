import ImageWithFallback from '@/ui/components/ImgComponent';
import FormattedDate from '@/ui/components/formatteddate';
import NotFound from '@/ui/components/notfound';
import { MoreIcon } from '@/ui/icons';
import { URLS } from '@/utils/URLS';
import { formatCurrency } from '@/utils/currencyFormat';
import IdComponent from '@/utils/formatId';
import { IProduct, Order } from '@/utils/orderTypes';
import React, { useState } from 'react';
import Menu from '../Menu';
import Button from '@/ui/form/Button';

interface TableProps {
  orders: Order[];
  page?: number;
}
const PayoutTable = ({ orders, page }: TableProps) => {
  const [openRowIndex, setOpenRowIndex] = useState<number | null>(null);
  const handleRowClick = (index: number) => {
    if (index === openRowIndex) {
      setOpenRowIndex(null);
    } else {
      setOpenRowIndex(index);
    }
  };
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-white bg-brand_yellow-500 whitespace-nowrap">
              <th className="px-4 py-3 font-medium text-center rounded-l-xl">
                Payout ID
              </th>
              <th className="px-4 py-3 font-medium text-center">User ID</th>
              <th className="px-4 py-3 font-medium text-center">Oder ID</th>
              <th className="px-4 py-3 font-medium text-center">
                Payout Amount
              </th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 rounded-r-xl font-medium text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            <TableRow />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayoutTable;
const TableRow = () => {
  return (
    <>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 text-center rounded-l-lg">
          <IdComponent text="8878bshbeuusjuii33" />
        </td>
        <td className="px-4 py-3 text-center">
          <IdComponent text="8878bshbeuusjuii33" />
        </td>
        <td className="px-4 py-3 text-center">
          <IdComponent text="8878bshbeuusjuii33" />
        </td>
        <td className="px-4 py-3 text-center ">100</td>
        <td className="px-4 py-3 text-center">
          <span>Pending</span>
        </td>

        <td className="px-4 py-3 rounded-r-lg self-center space-x-3 text-center cursor-pointer relative">
          <Button className="w-24 bg-brand_green-400 border-none">
            Approve
          </Button>
          <Button className="bg-red-600 w-24 px-4 border-none">Reject</Button>
        </td>
      </tr>
    </>
  );
};
