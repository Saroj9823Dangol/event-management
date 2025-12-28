import { SVGProps } from "react";

export interface IBase {
  id: string;
  created_at: string;
  updated_at: string;
}

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type MediaType = "video" | "image";

export interface ICountry {
  name: string;
  iso2: string;
  iso3: string;
  cities?: string[];
}

export interface IMenuItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  children?: IMenuItem[];
}

export interface IColumn {
  name: string;
  uid: string;
  sortable?: boolean;
}

export interface IStatusOption {
  name: string;
  uid: string;
}

export interface IActivity {
  id: string;
  user: string;
  action: string;
  time: string;
}

// types.ts
export interface IFileWithId extends File {
  id?: string;
  url?: string;
  originalFile?: any; // Keep original data if needed
}

export interface FileWithPreview extends IFileWithId {
  id: string;
  preview: string;
}

export interface IFile extends IBase {
  url: string;
  id: string;
}

export interface IOrganizer extends IBase {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: "approved" | "rejected" | "pending" | "suspended";
  files: IFile[];
  avatar: IFile;
  description: string;
  website: string;
  remarks: string;
  blocked: boolean;
}

export interface IRole extends IBase {
  name: string;
}

export interface IUser extends IBase {
  name: string;
  email: string;
  phone: string;
  organizer: IOrganizer | null;
  roles: IRole[];
  verified: boolean;
  status: string;
}

export interface IStaff extends IBase {
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface IOrderItem extends IBase {
  ticket_type: string;
  quantity: number;
  unit_price: number;
  total_price: number;
  ticket: ITicket;
}

export interface IOrder extends IBase {
  event: IEvent;
  eventLineup: ILineup;
  order_items: IOrderItem[];
  promo_code: IPromoCode | null;
  sub_total: number;
  discount_amount: number;
  total_amount: number;
  currency: string;
  status: string;
  payment_method: string;
  user: IUser;
  payment_response: IPaymentResponse;
}

export interface IPaymentResponsePaypal {
  id: string;
  paypal_order_id: string;
  redirect_url: string;
  status: string;
  intent: string;
  payer: {
    name: {
      given_name: string;
      surname: string;
    };
    email_address: string;
    payer_id: string;
  };
  purchase_units: [
    {
      reference_id: string;
      amount: {
        currency_code: string;
        value: string;
      };
      payments: {
        captures: [
          {
            id: string;
            status: string;
            amount: {
              currency_code: string;
              value: string;
            };
            final_capture: boolean;
            seller_protection: {
              status: string;
            };
            create_time: string;
            update_time: string;
          }
        ];
      };
    }
  ];
}

export interface IPaymentResponseStripe {
  id: string;
  paid: boolean;
  order: null | string;
  amount: number;
  object: string;
  redirect_url: string;
  review: null | string;
  source: {
    id: string;
    name: null | string;
    brand: string;
    email: null | string;
    last4: string;
    phone: null | string;
    object: string;
    wallet: null | string;
    country: string;
    funding: string;
    customer: null | string;
    exp_year: number;
    metadata: any[];
    cvc_check: string;
    exp_month: number;
    address_zip: string;
    fingerprint: string;
    address_city: null | string;
    address_line1: null | string;
    address_line2: null | string;
    address_state: null | string;
    dynamic_last4: null | string;
    address_country: null | string;
    allow_redisplay: string;
    regulated_status: string;
    address_zip_check: string;
    address_line1_check: null | string;
    tokenization_method: null | string;
  };
  status: string;
  created: number;
  dispute: null | string;
  outcome: {
    type: string;
    reason: null | string;
    risk_level: string;
    risk_score: number;
    advice_code: null | string;
    network_status: string;
    seller_message: string;
    network_advice_code: null | string;
    network_decline_code: null | string;
  };
  captured: boolean;
  currency: string;
  customer: null | string;
  disputed: boolean;
  livemode: boolean;
  metadata: any[];
  refunded: boolean;
  shipping: null | any;
  application: null | string;
  description: string;
  destination: null | string;
  receipt_url: string;
  failure_code: null | string;
  on_behalf_of: null | string;
  fraud_details: any[];
  receipt_email: string;
  transfer_data: null | any;
  payment_intent: null | string;
  payment_method: string;
  receipt_number: null | string;
  transfer_group: null | string;
  amount_captured: number;
  amount_refunded: number;
  application_fee: null | string;
  billing_details: {
    name: null | string;
    email: null | string;
    phone: null | string;
    tax_id: null | string;
    address: {
      city: null | string;
      line1: null | string;
      line2: null | string;
      state: null | string;
      country: null | string;
      postal_code: string;
    };
  };
  failure_message: null | string;
  source_transfer: null | string;
  balance_transaction: string;
  statement_descriptor: null | string;
  application_fee_amount: null | number;
  payment_method_details: {
    card: {
      brand: string;
      last4: string;
      checks: {
        cvc_check: string;
        address_line1_check: null | string;
        address_postal_code_check: string;
      };
      wallet: null | string;
      country: string;
      funding: string;
      mandate: null | string;
      network: string;
      exp_year: number;
      exp_month: number;
      fingerprint: string;
      overcapture: {
        status: string;
        maximum_amount_capturable: number;
      };
      installments: null | any;
      multicapture: {
        status: string;
      };
      network_token: {
        used: boolean;
      };
      three_d_secure: null | any;
      regulated_status: string;
      amount_authorized: number;
      authorization_code: string;
      extended_authorization: {
        status: string;
      };
      network_transaction_id: string;
      incremental_authorization: {
        status: string;
      };
    };
    type: string;
  };
  failure_balance_transaction: null | string;
  statement_descriptor_suffix: null | string;
  calculated_statement_descriptor: string;
}

export type IPaymentResponse = IPaymentResponsePaypal & IPaymentResponseStripe;

export interface IAttendee extends IBase, IUser {
  orders: IOrder[];
  payment_response: IPaymentResponse;
}

export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: number;
  parent: ICategory | null;
  files: IFile[];
}

export interface IEvent extends IBase {
  name: string;
  slug: string;
  description: string;
  remarks: string;
  status: "draft" | "active" | "suspended";
  files: IFile[];
  thumbnail: IFile;
  featured_banner: IFile;
  featured: boolean;
  trending: boolean;
  is_adults_only: boolean;
  is_multi_day_event: boolean;
  currency: string;
  language: string;
  organizer_id: string;
  start_date: string;
  end_date: string;
  venue_name: string;
  venue_address: string;
  venue_country: string;
  organizer: IOrganizer;
  category: ICategory;
  performers: IPerformer[];
  lineups: ILineup[];
  nearest_lineup: ILineup;
  ticketTypes: ITicketType[];
  promoCodes: IPromoCode[];
  policies: IPolicy[];
  addressable: IAddressable;
  custom_fields: ICustomFields;
  low_price: number;
  high_price: number;
  tickets_count: number;
  orders_sum_total_amount: number;
  lineups_sum_capacity: number;
  blocked: boolean;
}

export interface ICustomFields extends IBase {
  venue_name: string;
  google_map_link?: string;
  youtube_link?: string;
  embed_url?: string;
}

export interface IPolicy extends IBase {
  policy_name: string;
  policy_description: string;
}

export interface IPerformer extends IBase {
  name: string;
  sub_name: string;
  files: IFile[];
  social_links: {
    tiktok: string;
    youtube: string;
    facebook: string;
    instagram: string;
  };
}

export interface ILineup extends IBase {
  id: string;
  name: string;
  description: string | null;
  start_date: string;
  end_date: string;
  capacity: number;
  status: boolean;
  event_id: string;
  ticketTypes: ITicketType[];
  addressable: IAddressable;
  performer_ids: string[];
  performers: IPerformer[];
  custom_fields: ICustomFields;
}

export interface IAddressable {
  phone: string;
  email: string;
  timezone: string;
  address_line1: string;
  address_line2: string;
  landmark: string | null;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  latitude: number;
  longitude: number;
  address: string;
}

export interface ITicketType extends IBase {
  name: string;
  description: string[] | null;
  status: string;
  event_id: string;
  max_tickets: number;
  sales_start_date: string;
  sales_end_date: string;
  event_lineup_id: string;
  display_order: number;
  sold_tickets: number;
  price: number;
  valid_count: number;
  eventLineup: ILineup;
}

export interface ITicket {
  id: string | null;
  ticket_number: string;
  status: string | null;
  used_at: string | null;
  qr_code: string;
}

export interface IPromoCode extends IBase {
  code: string;
  description: string | null;
  discount_type: "percentage" | "fixed";
  discount_value: number;
  max_uses: number;
  min_order_value: number;
  valid_from: string;
  valid_until: string;
}

// Dashboard Analytics Types
export interface IDashboardStats {
  total_events: number;
  total_revenue: number;
  total_tickets_sold: number;
  active_organizers_count: number;
  top_performing_events: IEvent[];
  upcoming_events: IEvent[];
  recent_events: IEvent[];
  event_counts_by_status: Record<EventStatus, IEventStatusDetail>;
}

export type EventStatus = "DRAFT" | "ACTIVE" | "CANCELLED" | "COMPLETED";

export interface IEventStatusDetail {
  status: Lowercase<EventStatus>;
  total: number;
  percentage: number;
}

export interface IRevenueDataPoint {
  date: string;
  total: string;
  label: string;
}

export interface IAnalyticsRevenueResponse {
  filter: string;
  year: number;
  month: number;
  revenue: IRevenueDataPoint[];
}

export interface IEventStatusDistribution {
  status: "active" | "draft" | "completed" | "cancelled";
  count: number;
  percentage: number;
}

export interface ITransaction extends IBase {
  source: string;
  payment_method: string;
  payment_provider_id: string;
  amount: number;
  net_amount: number;
  fee: number;
  currency: string;
  status: string;
  event: IEvent;
  eventLineup: ILineup;
  order_items: IOrderItem[];
  promo_code: IPromoCode | null;
  sub_total: number;
  discount_amount: number;
  total_amount: number;
  user: IUser;
  organizer: IOrganizer;
  payment_response: {
    provider: string;
    transaction_id: string;
    error: string | { issue: string; description: string }[];
  };
}

export interface ISetting extends IBase {
  // General
  name: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  maintenance_mode: boolean;

  // Events
  default_commission: number;
  ticket_tax: number;

  // Payments
  enable_stripe: boolean;
  enable_paypal: boolean;
  enable_cash: boolean;
  test_mode: boolean;

  // Uploads
  max_file_size: number;
  allowed_image_types: string;
}

export interface INotification extends IBase {
  title: string;
  body: string;
  flags: {
    sms: boolean;
    push: boolean;
    email: boolean;
  };
  sender: IUser;
  recipients_count: number;
  failed_count: number;
  success_count: number;
  recipients_type: string;
}

export interface IActivityLog extends IBase {
  action: string;
  description: string;
  ip: string;
  user: IUser;
  meta: {
    id?: number | string;
    attributes?: Record<string, any>;
    changes?: Record<string, any>;
  };
}

export interface IPaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    links: {
      url: string | null;
      label: string;
      active: boolean;
      page: number | null;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}

export interface IPromotionBanner extends IBase {
  event: IEvent;
  files:IFile[];
}
