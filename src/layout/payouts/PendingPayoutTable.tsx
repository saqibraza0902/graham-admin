import ImageWithFallback from '@/ui/components/ImgComponent';
import FormattedDate from '@/ui/components/formatteddate';
import NotFound from '@/ui/components/notfound';
import { MoreIcon } from '@/ui/icons';
import { URLS } from '@/utils/URLS';
import { formatCurrency } from '@/utils/currencyFormat';
import IdComponent from '@/utils/formatId';
import { IProduct, Order } from '@/utils/orderTypes';
import React, { useCallback, useState } from 'react';
import Menu from '../Menu';
import Button from '@/ui/form/Button';
import { IPayoutRequest } from '@/utils/types';
import { Chip, Dialog, DialogActions, DialogTitle } from '@mui/material';
import { handleApiError } from '@/utils/hanldeApiError';
import { toast } from 'react-toastify';
import { confirm_payout_request_api, reject_payout_request_api } from '@/services/payout_request.services';
import Link from 'next/link';
import { useAppDispatch } from '@/redux/hooks';
import { setSellerID } from '@/redux/slices/sellerslice';
import { PAYOUT_TYPE_ENUM } from '@/utils/enum';
import { buyerId } from '@/redux/slices/buyerslice';
import { useRouter } from 'next/navigation';

interface PendingPayoutTableProps {
  data: IPayoutRequest[]
  removeItem?: (id: string) => void
}
const PendingPayoutTable = ({ data, removeItem = () => { } }: PendingPayoutTableProps) => {
  return (
    <div className="!w-full mb-8 !overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className=" text-sm text-white bg-brand_yellow-500 whitespace-nowrap uppercase">
              <th className="px-4 py-3 font-medium text-center rounded-l-xl">Payout ID</th>
              <th className="px-4 py-3 font-medium text-center">User ID</th>
              <th className="px-4 py-3 font-medium text-center">Oder ID</th>
              <th className="px-4 py-3 font-medium text-center">Payout Amount</th>
              <th className="px-4 py-3 font-medium text-center">Payout type</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 rounded-r-xl font-medium text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="space-y-6">
            {
              data.map((payout, index) => (
                <TableRow removeItem={removeItem} data={payout} key={index} />
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingPayoutTable;
const TableRow = ({ data, removeItem = () => { } }: { data: IPayoutRequest, removeItem?: (id: string) => void }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const [loading, setloading] = useState(false)
  const [showRejectDialog, setshowRejectDialog] = useState(false)
  const [showDialog, setshowDialog] = useState(false)
  const handlePayout = async () => {
    try {
      setloading(true)
      await confirm_payout_request_api(data._id)
      toast.success('Payout success.')
      setshowDialog(false)
      removeItem(data._id)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }
  const handleRejectPayout = async () => {
    try {
      setloading(true)
      await reject_payout_request_api(data._id)
      setshowRejectDialog(false)
      toast.success("Payout rejected successfully.")
      removeItem(data._id)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }
  return (
    <>
      <Dialog  fullWidth maxWidth='xs' open={showDialog}>
        <div className='p-5 space-y-10 rounded-2xl mt-5'>
          <div>
            <h1 className='text-center font-bold text-xl'>Confirm payout request</h1>
          </div>
          <DialogActions>
            <Button disabled={loading} onClick={handlePayout} className='bg-green-500 border-none'>
              Confirm
            </Button>
            <Button disabled={loading} className='border-none' onClick={() => {
              setshowDialog(false)
            }}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <Dialog fullWidth maxWidth='xs' open={showRejectDialog}>
        <div className='p-5 space-y-10 mt-5'>
          <div className='p-5'>
            <h1 className='text-center font-bold text-xl'>Reject payout request</h1>
          </div>
          <DialogActions>
            <Button disabled={loading} onClick={handleRejectPayout} className='bg-red-500 border-none'>
              Reject
            </Button>
            <Button disabled={loading} className='border-none' onClick={() => {
              setshowRejectDialog(false)
            }}>
              Cancel
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <tr className="h-6" />
      <tr className="bg-white  text-brand_black-500 font-Montserrat whitespace-nowrap text-sm font-semibold">
        <td className="px-4 py-3 text-center rounded-l-lg">
          <IdComponent text={data._id} />
        </td>
        <td className="px-4 py-3 text-center">
          <IdComponent text={data.user} />
          <div className='cursor-pointer' onClick={() => {
            if (data.payout_type === PAYOUT_TYPE_ENUM.ORDER_AMOUNT) {
              dispatch(setSellerID(data.user))
              router.push(URLS.SELLER_PROFILE)
            } else {
              dispatch(buyerId(data.user))
              router.push(URLS.BUYER_PROFILE)
            }
          }}>
            <Chip label="USER DETAIL" color='info' className='cursor-pointer' variant='filled' size='small' />
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <IdComponent text={data.order_id} />
          <Link href={`${URLS.PAYMENT_INVOICE}?id=${data.order_id}`}>
            <Chip label="INVOICE DETAIL" color='info' className='cursor-pointer' variant='filled' size='small' />
          </Link>
        </td>
        <td className="px-4 py-3 text-center ">{formatCurrency(data.payout_amount)}</td>
        <td className="px-4 py-3 text-center">
          {data.payout_type.replaceAll("_", " ")}
        </td>
        <td className="px-4 py-3 text-center">
          {data.payment_status.replaceAll("_", " ")}
        </td>

        <td className="px-4 py-3 rounded-r-lg self-center space-x-3 text-center cursor-pointer relative">
          <Button disabled={loading} onClick={() => {
            setshowDialog(true)
          }} className="w-24 bg-brand_green-400 border-none">
            Approve
          </Button>
          <Button onClick={() => {
            setshowRejectDialog(true)
          }} disabled={loading} className="bg-red-600 w-24 px-4 border-none">Reject</Button>
        </td>
      </tr>
    </>
  );
};
