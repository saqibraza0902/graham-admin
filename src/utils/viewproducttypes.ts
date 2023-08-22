interface BillingDetails {
  username: string;
  name: string;
  email: string;
  mobile_number: string;
  city: string;
  zip_code: string;
  state: string;
  country: string;
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
  varified: boolean;
  profile_image: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ProcessStatus {
  date: string;
  status: string;
  _id: string;
}

export interface Order {
  billing_details: BillingDetails;
  _id: string;
  product: string; // You can replace this with the appropriate type if the product ID has a structured format.
  quantity: number;
  buyer: Buyer;
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
  createdAt: string;
  updatedAt: string;
  __v: number;
}
