'use client';
import CommonLayout from '@/layout/CommonLayout';
import PayoutTabs from '@/layout/payouts/PayoutTabs';
import PendingPayoutTable from '@/layout/payouts/PendingPayoutTable';
import { useAppDispatch } from '@/redux/hooks';
import { get_all_pending_payout_requests_api } from '@/services/payout_request.services';
import Loader from '@/ui/components/loader';
import NotFound from '@/ui/components/notfound';
import Pagination from '@/ui/components/pagination';
import { handleApiError } from '@/utils/hanldeApiError';
import { cn } from '@/utils/styles';
import { IPayoutRequest } from '@/utils/types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PayoutRequests = () => {
  const [loading, setloading] = useState(false)
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(5)
  const [totalDocs, settotalDocs] = useState(0)
  const [pendingPayouts, setpendingPayouts] = useState<IPayoutRequest[]>([])
  const GetPendingPayoutRequests = useCallback(async () => {
    try {
      setloading(true)
      const { data } = await get_all_pending_payout_requests_api({ query: `?page=${page}&&limit=${limit}` })
      setpendingPayouts(data.payout_requests)
      settotalDocs(data.totalDocuments)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }
  }, [limit, page])
  useEffect(() => {
    GetPendingPayoutRequests()
  }, [GetPendingPayoutRequests])
  const RemoveItem = useCallback((payout_id: string) => {
    const filtered_data = pendingPayouts.filter((d) => d._id !== payout_id)
    setpendingPayouts(filtered_data)
  }, [pendingPayouts])
  return (
    <CommonLayout>
      <div >
        <PayoutTabs />
      </div>
      <div className='mt-10'>
        {
          loading ?
            <Loader />
            :
            null
        }
        {
          !loading && pendingPayouts.length === 0 ?
            <p className={cn("text-center py-10 font-semibold text-xl")}>No payout request found</p>
            :
            null
        }
        {
          !loading && pendingPayouts.length > 0 ?
            <>
              <PendingPayoutTable removeItem={RemoveItem} data={pendingPayouts} />
              <Pagination  currentPage={page} totalPages={Math.ceil(totalDocs / limit)} onPageChange={(newPage) => {
                setpage(newPage)
              }} />
            </>
            :
            null
        }
      </div>
    </CommonLayout>
  );
};

export default PayoutRequests;
