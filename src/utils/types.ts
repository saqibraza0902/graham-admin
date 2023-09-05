import { PAYOUT_PAYMENT_STATUS_ENUM, PAYOUT_TYPE_ENUM } from "./enum";
import { BillingDetails, IProduct, ProcessStatus } from "./orderTypes";

export interface OptionType {
  label: string;
  value: string | number | boolean;
}

// Global Types

export interface IUser {
  _id: string;
  username: string;
  fullName: string;
  state: string;
  zip_code: string;
  email: string;
  city: string;
  phoneNumber: string;
  country: string;
  role: UserRole[];
  provider: string;
  resetToken: string;
  varified: boolean;
  profile_image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Brand Types
export type BrandItemProps = {
  _id: string;
  draft: boolean;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export interface BrandTableProp {
  brands: BrandItemProps[];
  page?: number;
  del?: (id: string) => Promise<void>;
  loading?: boolean;
}
export interface BrandRowProp {
  item: BrandItemProps;
  index: number;
  del: (id: string) => Promise<void>;
  page?: number | undefined;
}
export interface BrandDataState {
  name: string;
  draft: string | number | boolean;
}

//  Category Types
export interface CategoryItemProps {
  createdAt: string;
  draft: boolean;
  icon: string;
  name: string;
  subCategories: number;
  parent_category: string | null;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface CategoryRowProp {
  item: CategoryItemProps;
  del: (id: string) => Promise<void>;
  index: number;
  page?: number;
}

export interface SubCatItemProps {
  createdAt: string;
  draft: boolean;
  icon: string;
  name: string;
  parent_category: CategoryItemProps;
  updatedAt: string;
  __v: number;
  _id: string;
}
export interface SubCategoryRowProp {
  item: SubCatItemProps;
  del: (id: string) => Promise<void>;
  index: number;
  page?: number;
}
export interface CategoryDataState {
  draft: string | number | boolean;
  name: string;
  icon: File | null | string;
}
export interface SubCategoryDataState {
  draft: string | number | boolean;
  name: string;
  parent_category: string | null | boolean | number;
}
export interface CategoryRadioButtonProps {
  checked: boolean | null;
  onChange: () => void;
  title: string;
  disabled?: boolean | null;
}
export interface SubCategoryOpts {
  parent: OptionType | any;
  status: OptionType;
}

// Taxes Component Types

export interface TaxesItemProps {
  _id: string;
  name: string;
  draft: boolean;
  percentage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface TaxesTableProp {
  getTax: TaxesItemProps[];
  page?: number;
  del?: (id: string) => Promise<void>;
}
export interface TaxesRowProp {
  item: TaxesItemProps;
  del: (id: string) => Promise<void>;
  index: number;
  page: number | undefined;
}

export interface FeeDataState {
  name: string;
  percentage: string | number;
  draft: string | number | boolean;
}

// Subscription Component Types
export interface SubsTableProp {
  subs: SubsItemProps[];
  page?: number;
  del?: (id: string) => Promise<void>;
}
export interface SubsRowProps {
  item: SubsItemProps;
  index: number;
  del: (id: string) => Promise<void>;
  page: number | undefined;
}
export interface SubsItemProps {
  _id: string;
  name: string;
  amount: number;
  draft: boolean;
  duration_in_days: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface SubsDataState {
  name: string | number | any;
  duration_in_days: string | number | any;
  draft: string | number | any;
  amount: number | string;
}
// Ads Types
interface AdPrices {
  currency: string;
  rented_as: string;
  rent_price: number;
  taxes: number;
  service_fee: number;
}

interface AdVendorDetails {
  name: string;
  street_no_1: string;
  street_no_2: string;
  phone_number: string;
  desctiption: string;
  postcode: string;
  city: string;
  country: string;
}

interface AdPaymentPolicy {
  deposit: boolean;
  rent_type: string;
  amount: number;
}

interface AdLocation {
  street_no_1: string;
  street_no_2: string;
  postcode: string;
  city: string;
  country: string;
  lat: number;
  long: number;
}

interface AdPlan {
  amount: number;
  duration_in_days: number;
  name: string;
}

export interface AdCreatedBy {
  _id: string;
  username: string;
  fullName: string;
  state: string;
  zip_code: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  role: string[];
  provider: string;
  resetToken: string;
  varified: boolean;
  createdAt: string;
  address: string;
  updatedAt: string;
  __v: number;
  city: string;
  profile_image: string;
}

interface AdCustomDetail {
  label: string;
  value: string;
  _id: string;
}

export interface AdProduct {
  prices: AdPrices;
  vendor_details: AdVendorDetails;
  payment_policy: AdPaymentPolicy;
  location: AdLocation;
  plan: AdPlan;
  _id: string;
  add_title: string;
  add_description: string;
  available_stock: number;
  images: string[];
  category: string;
  sub_category: string;
  brand: string;
  product_details: string;
  about_product: string;
  things_to_know: string;
  cancellation_policy: string;
  customDetails: AdCustomDetail[];
  start_date: string;
  end_date: string;
  created_by: AdCreatedBy;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface PostAdTable {
  data: AdProduct[];
  page?: number;
}
export interface PostAdRowProps {
  open: boolean;
  handleClick: () => void;
  item: AdProduct;
  index?: number | undefined;
  page?: number | undefined;
}
export interface ProfileProps {
  prof: AdCreatedBy | undefined;
}

export interface SingleSellerAds {
  item: AdProduct;
}
// Seller Component Types
export interface SellerTableProps {
  data: SellerItem[];
  page?: number;
}
export interface SellerProductProp {
  _id: string;
  add_title: string;
  add_description: string;
  available_stock: number;
  images: string[];
  prices: AdPrices;
  vendor_details: AdVendorDetails;
  category: string;
  sub_category: string;
  brand: string;
  payment_policy: AdPaymentPolicy;
  product_details: string;
  about_product: string;
  things_to_know: string;
  cancellation_policy: string;
  customDetails: AdCustomDetail[];
  location: AdLocation;
  start_date: string;
  end_date: string;
  plan: AdPlan;
  created_by: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface SellerItem {
  _id: string;
  username: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  varified: boolean;
  createdAt: string;
  profile_image: string;
  latestProduct: SellerProductProp;
}

export interface SellerRowProps {
  item: SellerItem;
  open: boolean;
  handleClick: () => void;
  index?: number | undefined;
  page?: number | undefined;
}

export interface SellerTableSellerSection {
  profile: string;
  name: string;
  email: string;
}
export interface SellerRowProduct {
  product: SellerProductProp;
}
// Buyer Component Types

type UserRole = "USER";

export interface ILatestProduct {
  _id: string;
  product: [IProduct];
  quantity: number;
  buyer: string;
  seller: string;
  seller_earned: number;
  start_date: string;
  end_date: string;
  time_difference: number;
  total_price: number;
  service_fee: number;
  taxes: number;
  order_status: string;
  payment_status: string;
  process_status: ProcessStatus[];
  billing_details: BillingDetails;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface IBuyer extends IUser {
  latestProduct: ILatestProduct;
}


export interface ITimeStamps {
  createdAt: string
  updatedAt: string
}
export interface IPayoutRequest extends ITimeStamps {
  _id: string
  payout_type: PAYOUT_TYPE_ENUM
  user: string
  order_id: string
  payout_amount: number
  payout_stripe_id: string
  payment_status: PAYOUT_PAYMENT_STATUS_ENUM
  user_account: string
}
