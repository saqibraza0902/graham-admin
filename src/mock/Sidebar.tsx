import { logoutAction } from '@/redux/slices/auth';
import {
  CashIcon,
  Categories,
  Dashboard,
  LogoutIcon,
  Persons,
  ProductIcon,
} from '@/ui/icons/all-icons';
import { Person } from '@/ui/icons/all-icons/Person';
import { URLS } from '@/utils/URLS';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

export const SidebarContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const SidebarData = [
    {
      icon: <Dashboard />,
      title: 'Dashboard',
      prefix: URLS.HOME,
      pathname: URLS.HOME,
    },
    {
      icon: <Persons />,
      title: 'Seller',
      prefix: 'seller',
      pathname: URLS.SELLER,
    },
    {
      icon: <Person />,
      title: 'Buyer',
      prefix: 'buyer',
      pathname: URLS.BUYER,
    },
    {
      icon: <Categories />,
      title: 'Categories',
      prefix: 'categories',
      pathname: URLS.CATEGORIES,
    },
    {
      icon: <ProductIcon />,
      title: 'Post Ads',
      prefix: 'post-ads',
      pathname: URLS.POST_ADS,
    },
    {
      icon: <Persons />,
      title: 'Brands',
      prefix: 'brand',
      pathname: URLS.BRAND,
    },
    {
      icon: <Persons />,
      title: 'Orders',
      prefix: URLS.ORDERS,
      pathname: URLS.ORDERS,
    },
    {
      icon: <CashIcon />,
      title: 'Payouts',
      prefix: 'payout-requests',
      pathname: URLS.PAYOUT_REQUESTS_PENDING,
    },
    {
      icon: <CashIcon />,
      title: 'Payment Orders',
      prefix: URLS.PAYMENT_ORDERS,
      pathname: URLS.PAYMENT_ORDERS,
    },
    {
      icon: <CashIcon />,
      title: 'Payment Plans',
      prefix: URLS.PAYMENT_PLANS,
      pathname: URLS.PAYMENT_PLANS,
    },
    {
      icon: <Persons />,
      title: 'Taxes',
      prefix: 'taxes',
      pathname: URLS.TAXES,
    },
    {
      icon: <Persons />,
      title: 'Subscription',
      prefix: 'subscription',
      pathname: URLS.SUBSCRIPTION,
    },
    {
      icon: <LogoutIcon />,
      title: 'Logout',
      action: () => {
        dispatch(logoutAction());
        router.push(URLS.HOME);
      },
    },
  ] as {
    icon: React.ReactElement;
    title: string;
    prefix?: string;
    pathname?: string;
    action?: () => void;
  }[];
  return SidebarData;
};
