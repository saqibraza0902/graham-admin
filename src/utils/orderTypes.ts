export interface BillingDetails {
  username: string;
  name: string;
  email: string;
  mobile_number: string;
  city: string;
  zip_code: string;
  state: string;
  country: string;
}
type UserRole = "USER";
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
interface ProductPrices {
  currency: string;
  rented_as: string;
  rent_price: number;
  taxes: number;
  service_fee: number;
}

interface VendorDetails {
  name: string;
  street_no_1: string;
  street_no_2: string;
  phone_number: string;
  description: string;
  postcode: string;
  city: string;
  country: string;
}

interface PaymentPolicy {
  deposit: boolean;
  rent_type: string;
  amount: number;
}

interface Location {
  coordinates: number[];
  street_no_1: string;
  street_no_2: string;
  postcode: string;
  city: string;
  country: string;
  lat: number;
  long: number;
  type: string;
}

interface Plan {
  amount: number;
  duration_in_days: number;
  name: string;
}

interface CustomDetail {
  label: string;
  value: string;
  _id: string;
}

interface Buyer {
  _id: string;
  username: string;
  fullName: string;
  state: string;
  zip_code: string;
  email: string;
  city: string;
  phoneNumber: string;
  country: string;
  role: string[];
  provider: string;
  resetToken: string;
  verified: boolean;
  profile_image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProcessStatus {
  date: string;
  status: string;
  _id: string;
}
export interface IProduct {
  _id: string;
  add_title: string;
  add_description: string;
  available_stock: number;
  images: string[];
  prices: ProductPrices;
  vendor_details: VendorDetails;
  category: string;
  sub_category: string;
  brand: string;
  payment_policy: PaymentPolicy;
  product_details: string;
  about_product: string;
  things_to_know: string;
  cancellation_policy: string;
  customDetails: CustomDetail[];
  location: Location;
  start_date: string;
  end_date: string;
  plan: Plan;
  created_by: IUser;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export interface Order {
  billing_details: BillingDetails;
  _id: string;
  product: IProduct;
  quantity: number;
  buyer: Buyer;
  seller: IUser;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}
