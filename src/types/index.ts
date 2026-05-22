export interface Location {
  string: string;
  link: string;
  country: string;
  region: string | null;
  locationName: string;
}

export interface Stipend {
  salary: string;
  tooltip: string | null;
  salaryValue1: number | null;
  salaryValue2: number | null;
  salaryType: string;
  currency: string;
  scale: string;
  large_stipend_text: boolean;
}

export interface Internship {
  id: number;
  title: string;
  employment_type: string;
  company_name: string;
  company_url: string;
  company_logo: string;
  profile_name: string;
  duration: string;
  stipend: Stipend;
  posted_on: string;
  application_deadline: string;
  location_names: string[];
  locations: Location[];
  start_date: string;
  is_premium: boolean;
  is_active: boolean;
  work_from_home: boolean;
  part_time: boolean;
}

export interface APIResponse {
  internships_meta: {
    [key: string]: Internship;
  };
  internship_ids: number[];
}
