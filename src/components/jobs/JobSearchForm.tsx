import React from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';
import { Button, Input } from '@/components/ui';

export interface JobSearchFormValues {
  position: string;
  location: string;
  country: string;
}

interface JobSearchFormProps {
  values: JobSearchFormValues;
  isLoading: boolean;
  onChange: (values: JobSearchFormValues) => void;
  onSubmit: () => void;
}

const COUNTRIES = [
  { value: 'US', label: 'United States' },
  { value: 'IN', label: 'India' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'CA', label: 'Canada' },
  { value: 'DE', label: 'Germany' },
  { value: 'AU', label: 'Australia' },
];

export const JobSearchForm: React.FC<JobSearchFormProps> = ({
  values,
  isLoading,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <div className="md:col-span-4">
        <Input
          label="Job title / keywords"
          placeholder="e.g. Software Engineer"
          value={values.position}
          leftIcon={<Briefcase className="w-4 h-4" />}
          onChange={(e) => onChange({ ...values, position: e.target.value })}
        />
      </div>
      <div className="md:col-span-3">
        <Input
          label="Location"
          placeholder="e.g. City or Remote"
          value={values.location}
          leftIcon={<MapPin className="w-4 h-4" />}
          onChange={(e) => onChange({ ...values, location: e.target.value })}
        />
      </div>
      <div className="md:col-span-3 space-y-1.5">
        <label className="block text-xs font-medium text-slate-300">Country</label>
        <select
          value={values.country}
          onChange={(e) => onChange({ ...values, country: e.target.value })}
          className="w-full bg-slate-900/80 border border-slate-700/60 rounded-xl py-2.5 px-4 text-xs text-slate-100 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/60"
        >
          {COUNTRIES.map((c) => (
            <option key={c.value} value={c.value}>
              {c.label}
            </option>
          ))}
        </select>
      </div>
      <div className="md:col-span-2">
        <Button
          type="submit"
          className="w-full"
          isLoading={isLoading}
          leftIcon={<Search className="w-4 h-4" />}
        >
          Search
        </Button>
      </div>
    </form>
  );
};
