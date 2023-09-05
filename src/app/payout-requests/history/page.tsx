'use client';
import CommonLayout from '@/layout/CommonLayout';
import PayoutHistoryTable from '@/layout/payouts/PayoutHistoryTable';
import PayoutLayout from '@/layout/payouts/PayoutLayout';
import PayoutTabs from '@/layout/payouts/PayoutTabs';
import { get_payout_history_api } from '@/services/payout_request.services';
import Loader from '@/ui/components/loader';
import Pagination from '@/ui/components/pagination';
import { handleApiError } from '@/utils/hanldeApiError';
import { cn } from '@/utils/styles';
import { IPayoutRequest } from '@/utils/types';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PayoutRequests = () => {
  const [loading, setloading] = useState(false)
  const [historyPayouts, sethistoryPayouts] = useState<IPayoutRequest[]>([])
  const [totalDocs, settotalDocs] = useState(0)
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(5)
  const GetHistoryPayouts = useCallback(async () => {
    try {
      setloading(true)
      const { data } = await get_payout_history_api(`?page=${page}&limit=${limit}`)
      sethistoryPayouts(data.payout_history)
      settotalDocs(data.totalDocuments)
    } catch (error) {
      const err = handleApiError(error)
      toast.error(err)
    } finally {
      setloading(false)
    }

  }, [limit, page])
  useEffect(() => {
    GetHistoryPayouts()
  }, [GetHistoryPayouts])
  return (
    <CommonLayout>
      <div >
        <PayoutTabs />
      </div>
      {
        loading ?
          <Loader />
          :
          null
      }
      {
        !loading && historyPayouts.length === 0 ?
          <p className={cn("text-center py-10 font-semibold text-xl")}>No payout history available.</p>
          :
          null
      }
      {
        !loading && historyPayouts.length > 0 ?
          <div className='mt-10'>
            <PayoutHistoryTable data={historyPayouts} />
            <Pagination currentPage={page} totalPages={Math.ceil(totalDocs / limit)} onPageChange={(newPage) => {
              setpage(newPage)
            }} />
          </div>
          :
          null
      }
    </CommonLayout>
  );
};

export default PayoutRequests;
