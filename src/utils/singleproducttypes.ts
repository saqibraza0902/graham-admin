interface Prices {
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

interface Product {
  prices: Prices;
  vendor_details: VendorDetails;
  payment_policy: PaymentPolicy;
  location: Location;
  plan: Plan;
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
  customDetails: CustomDetail[];
  start_date: string;
  end_date: string;
  created_by: string;
  disabled: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface UserProfile {
  completed_orders: number;
  cancelled_orders: number;
  pending_orders: number;
  active_orders: number;
}

export interface ProductCardProps {
  product: Product;
  completed_orders: number;
  cancelled_orders: number;
  pending_orders: number;
  active_orders: number;
}
