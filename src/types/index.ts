import type { DateValue } from "@react-types/datepicker";

import { Key, RangeValue } from "@react-types/shared";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};
export type view = "day" | "week" | "month";

export interface profileFilter {
  profiles: Key[];
  view: view;
  dateRange: RangeValue<DateValue> | null;
}
export interface listsFilter {
  lists: Key[];
  view: view;
  dateRange: RangeValue<DateValue> | null;
}

interface listProfile {
  profileId: number;
  checkIn: string | null;
  checkOut?: string | null;
}
export interface typeLists {
  id: number;
  name: string;
  date: string;
  hasCheckout: boolean;
  profiles: listProfile[];
}

export interface profile {
  id: number;
  name: string;
  email: string;
  phone: string;
}
