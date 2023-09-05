
import { formatCurrency } from '@/utils/currencyFormat';
import IdComponent from '@/utils/formatId';
import React from 'react';
import { IPayoutRequest } from '@/utils/types';
import { Chip } from '@mui/material';
import { PAYOUT_PAYMENT_STATUS_ENUM, PAYOUT_TYPE_ENUM } from '@/utils/enum';
import Link from 'next/link';
import { URLS } from '@/utils/URLS';
import { setSellerID } from '@/redux/slices/sellerslice';
import { buyerId } from '@/redux/slices/buyerslice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';

interface PayoutHistoryTableProps {
    data: IPayoutRequest[]
}
const PayoutHistoryTable = ({ data }: PayoutHistoryTableProps) => {

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
                        </tr>
                    </thead>
                    <tbody className="space-y-6">
                        {
                            data.map((payout, index) => (
                                <TableRow data={payout} key={index} />
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PayoutHistoryTable;
const TableRow = ({ data }: { data: IPayoutRequest }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    return (
        <>
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
                    <Chip
                        label={data.payment_status.replaceAll("_", " ")}
                        variant='filled'
                        color={
                            data.payment_status === PAYOUT_PAYMENT_STATUS_ENUM.PAID ? 'success' : 'error'
                        }
                    />
                </td>
            </tr>
        </>
    );
};
