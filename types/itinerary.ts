export interface ScheduleOption {
  id: string;
  title: string;
  note?: string;
  tag?: string;
  location?: string;
  lat?: number;
  lng?: number;
  menu?: string;
}

export interface ScheduleItem {
  time: string;
  title: string;
  note?: string;
  location?: string;
  lat?: number;
  lng?: number;
  menu?: string;
  tags: string[];
  options?: ScheduleOption[];
  selectedOptionId?: string;
}

export interface ParkingTipInfo {
  title: string;
  description: string;
  parkingLot: string;
  restaurantSupport: string;
  mapUrl: string;
}

export interface DayScenario {
  id: string;
  name: string;
  badge: string;
  beachName: string;
  parkingTip: ParkingTipInfo;
  cafes: string[];
  schedule: ScheduleItem[];
}

export interface DayItinerary {
  dayNumber: number;
  date: string;
  dayOfWeek: string;
  title: string;
  parkingTip?: ParkingTipInfo;
  schedule?: ScheduleItem[];
  scenarios?: DayScenario[];
}

export interface TripInfo {
  title: string;
  startDate: string;
  endDate: string;
  duration: string;
  basecamp: string;
  goal: string;
}

export interface FoodOption {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  tag: string;
  recommendedMenu: string;
  icon: string;
}

export interface ItineraryData {
  trip: TripInfo;
  days: DayItinerary[];
  foodOptions?: FoodOption[];
}
