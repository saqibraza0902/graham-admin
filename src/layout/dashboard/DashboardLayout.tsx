import { CardsArray } from "@/mock/Cards";
import React from "react";
import Cards from "./Cards";
import { formatCurrency } from "@/utils/currencyFormat";
import { CashIconLarge, PersonLarge, PersonsLarge } from "@/ui/icons";

type AccountStats = {
  seller_accounts: number;
  buyer_accounts: number;
  activate_accounts: number;
  deactivate_accounts: number;
  total_products: number;
  published_products: number;
  unpublished_products: number;
  pending_orders: number;
  active_orders: number;
  completed_orders: number;
  cancelled_orders: number;
  total_transactions: number;
  my_earnings: number;
};

interface IProp {
  data: AccountStats;
}
const DashboardLayout = ({ data }: IProp) => {
  const CardsArray = [
    {
      title: "Total Seller",
      desc: data?.seller_accounts,
      color: "#0062FF",
      Icon: PersonsLarge,
    },
    {
      title: "Total Buyers",
      desc: data?.buyer_accounts,
      color: "#FFC10E",
      Icon: PersonLarge,
    },
    {
      title: "Active Accounts",
      desc: data?.activate_accounts,
      color: "#FC5A5A",
      Icon: PersonLarge,
    },
    {
      title: "Deactive Accounts",
      desc: data?.deactivate_accounts,
      color: "#0062FF",
      Icon: PersonsLarge,
    },
    {
      title: "Total Products",
      desc: data.total_products,
      color: "#38E25D",
      Icon: CashIconLarge,
    },
    {
      title: "Published Products",
      desc: data.published_products,
      color: "#38E25D",
      Icon: CashIconLarge,
    },
    {
      title: "Unpublished Products",
      desc: data?.unpublished_products,
      color: "#FC5A5A",
      Icon: PersonLarge,
    },
    {
      title: "Pending Orders",
      desc: data?.pending_orders,
      color: "#FC5A5A",
      Icon: PersonLarge,
    },
    {
      title: "Active Orders",
      desc: data?.active_orders,
      color: "#FFC10E",
      Icon: PersonLarge,
    },
    {
      title: "Completed Orders",
      desc: data?.completed_orders,
      color: "#FC5A5A",
      Icon: PersonLarge,
    },
    {
      title: "Canceled Orders",
      desc: data?.cancelled_orders,
      color: "#FFC10E",
      Icon: PersonLarge,
    },
    {
      title: "Total Transations",
      desc: formatCurrency(data.total_transactions),
      color: "#38E25D",
      Icon: CashIconLarge,
    },
    {
      title: "My Earnings",
      desc: formatCurrency(data.my_earnings),
      color: "#38E25D",
      Icon: CashIconLarge,
    },
    // {
    //   title: "Total Orders",
    //   desc: "160",
    //   color: "#FC5A5A",
    //   Icon: CartIcon,
    // },
    // {
    //   title: "Total Sellers",
    //   desc: "450",
    //   color: "#0062FF",
    //   Icon: PersonsLarge,
    // },
    // {
    //   title: "Total Buyers",
    //   desc: "1000",
    //   color: "#FFC10E",
    //   Icon: PersonLarge,
    // },
    // {
    //   title: "Total Products",
    //   desc: "20,000",
    //   color: "#38E25D",
    //   Icon: CashIconLarge,
    // },
    // {
    //   title: "New Orders",
    //   desc: "160",
    //   color: "#FC5A5A",
    //   Icon: CartIcon,
    // },
    // {
    //   title: "Cancelled Order",
    //   desc: "45",
    //   color: "#0062FF",
    //   Icon: PersonsLarge,
    // },
    // {
    //   title: "Pending Orders",
    //   desc: "1000",
    //   color: "#FFC10E",
    //   Icon: PersonLarge,
    // },
    // {
    //   title: "Total Transactions",
    //   desc: "$20,000",
    //   color: "#38E25D",
    //   Icon: CashIconLarge,
    // },
    // {
    //   title: "New User Registration",
    //   desc: "1600",
    //   color: "#FC5A5A",
    //   Icon: CartIcon,
    // },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
      {CardsArray.map((el, index) => (
        <Cards key={index} Icon={el.Icon} iconcolor={el.color}>
          <h4 className="text-xs font-medium">{el.title}</h4>
          <h5 className="text-lg font-medium" style={{ color: el.color }}>
            {el.desc}
          </h5>
        </Cards>
      ))}
    </div>
  );
};

export default DashboardLayout;
