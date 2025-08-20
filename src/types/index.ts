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

export interface participant {
  id: string;
  profileId: string;
  name: string;
  checkedIn: boolean;
  checkedOut: boolean;
  checkInDate: number;
  checkOutDate: number;
  listId: string;
  listName: string;
}

export interface useParticipantsParams {
  enabled?: boolean;
  listIds?: string[];
  profileIds?: string[];
  ltCheckInDate: number;
  gtCheckInDate: number;
}

export interface participantsResponse {
  data: participant[];
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  length: number;
  pages: number;
}

export interface useProfilesParams {
  page?: number;
  pageSize?: number;
  search?: string;
  enabled?: boolean;
}

export interface profilesResponse {
  data: profile[];
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  length: number;
}

export interface list {
  id: string;
  name: string;
}

export interface useListsParams {
  search?: string;
  page?: number;
  pageSize?: number;
  enabled?: boolean;
}

export interface listsResponse {
  data: list[];
  count: number;
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  length: number;
}
