"use client";

import { DateRange } from "react-day-picker";
import { DateRangePicker } from "./date-range-picker";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "./ui/label";

interface FiltersProps {
  dateRange: DateRange | undefined;
  onDateRangeChange: (date: DateRange | undefined) => void;
  age: string;
  onAgeChange: (age: string) => void;
  gender: string;
  onGenderChange: (gender: string) => void;
}

export default function Filters({
  dateRange,
  onDateRangeChange,
  age,
  onAgeChange,
  gender,
  onGenderChange,
}: FiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border bg-card p-4 shadow-sm">
      <div className="grid gap-2">
        <Label htmlFor="date-range">Date Range</Label>
        <DateRangePicker id="date-range" date={dateRange} onDateChange={onDateRangeChange} />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="age-filter">Age</Label>
        <Select value={age} onValueChange={onAgeChange}>
          <SelectTrigger id="age-filter" className="w-[180px]">
            <SelectValue placeholder="Select age" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ages</SelectItem>
            <SelectItem value="<18">&lt;18</SelectItem>
            <SelectItem value="18-40">18-40</SelectItem>
            <SelectItem value=">40">&gt;40</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="gender-filter">Gender</Label>
        <Select value={gender} onValueChange={onGenderChange}>
          <SelectTrigger id="gender-filter" className="w-[180px]">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genders</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
