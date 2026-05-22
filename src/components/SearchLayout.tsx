"use client";

import React, { useState, useMemo } from 'react';
import { Internship } from '../types';
import FilterSidebar from './FilterSidebar';
import InternshipCard from './InternshipCard';

interface SearchLayoutProps {
  initialInternships: Internship[];
}

export default function SearchLayout({ initialInternships }: SearchLayoutProps) {
  const [profileFilters, setProfileFilters] = useState<string[]>([]);
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [isWfh, setIsWfh] = useState<boolean>(false);
  const [isPartTime, setIsPartTime] = useState<boolean>(false);
  const [stipendFilter, setStipendFilter] = useState<number>(0);
  const [durationFilter, setDurationFilter] = useState<string>('');
  const [keywordFilter, setKeywordFilter] = useState<string>('');
  const [keywordInput, setKeywordInput] = useState<string>('');
  const [isKeywordFocused, setIsKeywordFocused] = useState<boolean>(false);

  const filteredInternships = useMemo(() => {
    return initialInternships.filter((internship) => {
      // Profile match (case insensitive, OR logic)
      if (profileFilters.length > 0) {
        const matchesProfile = profileFilters.some(pf => internship.profile_name.toLowerCase().includes(pf.toLowerCase()));
        if (!matchesProfile) {
          return false;
        }
      }
      
      // Location match (OR logic)
      if (locationFilters.length > 0) {
        const locations = internship.location_names.map(l => l.toLowerCase());
        const isMatch = locationFilters.some(lf => locations.some(loc => loc.includes(lf.toLowerCase())));
        if (!isMatch) {
           return false;
        }
      }

      // WFH
      if (isWfh && !internship.work_from_home) {
        return false;
      }

      // Part-time
      if (isPartTime && !internship.part_time) {
        return false;
      }

      // Stipend
      if (stipendFilter > 0) {
        if (!internship.stipend?.salaryValue1 || internship.stipend.salaryValue1 < stipendFilter) {
          return false;
        }
      }

      // Duration (Max duration filter)
      if (durationFilter) {
        const maxDuration = parseInt(durationFilter, 10);
        const durationMatch = internship.duration.match(/(\d+)/);
        if (durationMatch) {
          const internshipDuration = parseInt(durationMatch[1], 10);
          if (internshipDuration > maxDuration) {
            return false;
          }
        }
      }

      // Keyword Search
      if (keywordFilter) {
        const keyword = keywordFilter.toLowerCase();
        const matchesKeyword = 
          internship.title.toLowerCase().includes(keyword) ||
          internship.company_name.toLowerCase().includes(keyword) ||
          internship.profile_name.toLowerCase().includes(keyword) ||
          internship.location_names.some(loc => loc.toLowerCase().includes(keyword));
          
        if (!matchesKeyword) {
          return false;
        }
      }

      return true;
    });
  }, [initialInternships, profileFilters, locationFilters, isWfh, isPartTime, stipendFilter, durationFilter, keywordFilter]);

  const handleKeywordSearch = () => {
    setKeywordFilter(keywordInput);
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleKeywordSearch();
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row gap-6 items-start relative">
        <div className="w-full md:w-[300px] flex-shrink-0 sticky top-6 max-h-[calc(100vh-3rem)] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <div className="h-[76px] mb-4 mt-2 flex flex-col justify-center">
            <div className="flex items-center gap-2 text-[14px] text-gray-600">
              <span className="hover:text-blue-500 cursor-pointer">Home</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              <span className="text-gray-900 font-medium">Internships</span>
            </div>
          </div>
          <FilterSidebar
            profileFilters={profileFilters}
            setProfileFilters={setProfileFilters}
            locationFilters={locationFilters}
            setLocationFilters={setLocationFilters}
            isWfh={isWfh}
            setIsWfh={setIsWfh}
            isPartTime={isPartTime}
            setIsPartTime={setIsPartTime}
            stipendFilter={stipendFilter}
            setStipendFilter={setStipendFilter}
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
          />
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-6 overflow-visible mb-6">
             <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 font-semibold text-gray-700 text-[15px] text-center rounded-t-xl">
               Keyword Search
             </div>
             <div className="p-4 pt-5 pb-6">
                <div className="flex relative">
                  {isKeywordFocused && (
                    <div className="absolute bottom-full left-0 mb-2 w-full bg-[#333333] text-white text-[13px] py-2.5 px-3 rounded shadow-lg animate-in fade-in zoom-in duration-200">
                      Search by category, location or company name.
                      <div className="absolute -bottom-1.5 left-4 w-3 h-3 bg-[#333333] rotate-45"></div>
                    </div>
                  )}
                  <input 
                    type="text" 
                    placeholder="e.g. Design, Mumbai, Infosys" 
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeywordKeyDown}
                    onFocus={() => setIsKeywordFocused(true)}
                    onBlur={() => setIsKeywordFocused(false)}
                    className="w-full border border-gray-300 hover:border-blue-500 rounded-l px-3 py-2 text-[14px] outline-none focus:border-blue-500 transition-colors" 
                  />
                  <button 
                    onClick={handleKeywordSearch}
                    className="bg-[#008bdc] text-white px-4 py-2 rounded-r hover:bg-[#0073b7] transition-colors flex items-center justify-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
             </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 pb-10">
          <div className="h-[60px] mb-4 text-center mt-2 flex flex-col justify-center">
            <h1 className="text-[24px] font-semibold text-gray-800 leading-tight">
              {filteredInternships.length} Total Internships
            </h1>
            <p className="mt-1 text-[14px] text-gray-500">
              Latest Summer Internships in India
            </p>
          </div>
          {filteredInternships.map(internship => (
          <InternshipCard key={internship.id} internship={internship} />
        ))}
        {filteredInternships.length === 0 && (
          <div className="flex items-center justify-center h-64 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-[15px]">No internships match your filters.</p>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
