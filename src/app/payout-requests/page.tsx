'use client';
import CommonLayout from '@/layout/CommonLayout';
import PayoutLayout from '@/layout/payouts/PayoutLayout';
import PayoutTable from '@/layout/payouts/PayoutTable';
import React from 'react';

const PayoutRequests = () => {
  return (
    <CommonLayout>
      <PayoutLayout>
        <PayoutTable orders={[]} />
      </PayoutLayout>
    </CommonLayout>
  );
};

export default PayoutRequests;
