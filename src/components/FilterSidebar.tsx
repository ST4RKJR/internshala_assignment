"use client";

import React, { useState } from 'react';

interface FilterSidebarProps {
  profileFilters: string[];
  setProfileFilters: (val: string[]) => void;
  locationFilters: string[];
  setLocationFilters: (val: string[]) => void;
  isWfh: boolean;
  setIsWfh: (val: boolean) => void;
  isPartTime: boolean;
  setIsPartTime: (val: boolean) => void;
  stipendFilter: number;
  setStipendFilter: (val: number) => void;
  durationFilter: string;
  setDurationFilter: (val: string) => void;
}

export default function FilterSidebar({
  profileFilters,
  setProfileFilters,
  locationFilters,
  setLocationFilters,
  isWfh,
  setIsWfh,
  isPartTime,
  setIsPartTime,
  stipendFilter,
  setStipendFilter,
  durationFilter,
  setDurationFilter,
}: FilterSidebarProps) {
  const stipendValues = [0, 2000, 4000, 6000, 8000, 10000];
  const [showMoreFilters, setShowMoreFilters] = useState(false);
  
  const durationOptions = ['1', '2', '3', '4', '6', '12', '24', '36'];
  const [isDurationOpen, setIsDurationOpen] = useState(false);

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [profileInput, setProfileInput] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const profileOptionsList = ['.NET Development', '3D Printing', 'AI Agent Development', 'Accounts', 'Acting', 'Aerospace Engineering', 'Agriculture & Food Engineering', 'Analytics', 'Marketing', 'Sales', 'Design', 'Software Development', 'Data Science', 'Human Resources'];
  const locationOptionsList = ['Adilabad', 'Agarahara', 'Agartala', 'Agonda', 'Agra', 'Ahmadnagar', 'Ahmedabad', 'Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad', 'Chennai', 'Kolkata'];

  const filteredProfiles = profileOptionsList.filter(p => p.toLowerCase().includes(profileInput.toLowerCase()));
  const filteredLocations = locationOptionsList.filter(l => l.toLowerCase().includes(locationInput.toLowerCase()));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-center py-4 border-b border-gray-100">
        <h2 className="text-[16px] font-semibold flex items-center gap-2 text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filters
        </h2>
      </div>

      <div className="p-5 space-y-5">
        {/* Profile Filter */}
        <div className="space-y-1.5 relative">
          <label className="text-[13px] font-medium text-gray-700">Profile</label>
          <div 
            className={`w-full min-h-[38px] px-2 py-1.5 border ${isProfileOpen || profileFilters.length > 0 ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 rounded bg-white flex flex-wrap gap-1.5 items-center transition-colors cursor-text`}
            onClick={() => {
              const input = document.getElementById('profile-input');
              if (input) input.focus();
            }}
          >
            {profileFilters.map(pf => (
              <div key={pf} className="bg-[#008bdc] text-white px-2 py-0.5 rounded-[3px] flex items-center gap-1.5 text-[12px]">
                {pf}
                <span 
                  className="hover:text-gray-200 cursor-pointer text-[14px] font-light leading-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProfileFilters(profileFilters.filter(p => p !== pf));
                  }}
                >
                  &times;
                </span>
              </div>
            ))}
            <input
              id="profile-input"
              type="text"
              placeholder={profileFilters.length === 0 ? "e.g. Marketing" : ""}
              value={profileInput}
              onChange={(e) => {
                setProfileInput(e.target.value);
                setIsProfileOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && profileInput === '' && profileFilters.length > 0) {
                  setProfileFilters(profileFilters.slice(0, -1));
                }
              }}
              onFocus={() => setIsProfileOpen(true)}
              onBlur={() => setTimeout(() => setIsProfileOpen(false), 200)}
              className="flex-1 min-w-[60px] text-[13px] outline-none bg-transparent"
            />
          </div>
          {isProfileOpen && filteredProfiles.filter(p => !profileFilters.includes(p)).length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 max-h-60 overflow-y-auto">
              {filteredProfiles.filter(p => !profileFilters.includes(p)).map((opt) => (
                <div 
                  key={opt}
                  className="px-4 py-2 text-[13px] text-gray-700 hover:bg-[#e6f4f1] cursor-pointer"
                  onClick={() => {
                    setProfileFilters([...profileFilters, opt]);
                    setProfileInput('');
                    setIsProfileOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Location Filter */}
        <div className="space-y-1.5 relative">
          <label className="text-[13px] font-medium text-gray-700">Location</label>
          <div 
            className={`w-full min-h-[38px] px-2 py-1.5 border ${isLocationOpen || locationFilters.length > 0 ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 rounded bg-white flex flex-wrap gap-1.5 items-center transition-colors cursor-text`}
            onClick={() => {
              const input = document.getElementById('location-input');
              if (input) input.focus();
            }}
          >
            {locationFilters.map(lf => (
              <div key={lf} className="bg-[#008bdc] text-white px-2 py-0.5 rounded-[3px] flex items-center gap-1.5 text-[12px]">
                {lf}
                <span 
                  className="hover:text-gray-200 cursor-pointer text-[14px] font-light leading-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setLocationFilters(locationFilters.filter(l => l !== lf));
                  }}
                >
                  &times;
                </span>
              </div>
            ))}
            <input
              id="location-input"
              type="text"
              placeholder={locationFilters.length === 0 ? "e.g. Delhi" : ""}
              value={locationInput}
              onChange={(e) => {
                setLocationInput(e.target.value);
                setIsLocationOpen(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Backspace' && locationInput === '' && locationFilters.length > 0) {
                  setLocationFilters(locationFilters.slice(0, -1));
                }
              }}
              onFocus={() => setIsLocationOpen(true)}
              onBlur={() => setTimeout(() => setIsLocationOpen(false), 200)}
              className="flex-1 min-w-[60px] text-[13px] outline-none bg-transparent"
            />
          </div>
          {isLocationOpen && filteredLocations.filter(l => !locationFilters.includes(l)).length > 0 && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 max-h-60 overflow-y-auto">
              {filteredLocations.filter(l => !locationFilters.includes(l)).map((opt) => (
                <div 
                  key={opt}
                  className="px-4 py-2 text-[13px] text-gray-700 hover:bg-[#e6f4f1] cursor-pointer"
                  onClick={() => {
                    setLocationFilters([...locationFilters, opt]);
                    setLocationInput('');
                    setIsLocationOpen(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 pt-1 text-[14px] text-gray-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isWfh}
              onChange={(e) => setIsWfh(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
            />
            <span>Work from home</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={isPartTime}
              onChange={(e) => setIsPartTime(e.target.checked)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" 
            />
            <span>Part-time</span>
          </label>
        </div>

        {/* Stipend Filter */}
        <div className="space-y-3 pt-2">
          <label className="text-[13px] font-medium text-gray-700">Desired minimum monthly stipend (₹)</label>
          <div className="relative pt-2">
            <input
              type="range"
              min="0"
              max="10000"
              step="2000"
              value={stipendFilter}
              onChange={(e) => setStipendFilter(parseInt(e.target.value))}
              style={{
                background: `linear-gradient(to right, #e5e7eb ${(stipendFilter / 10000) * 100}%, #0ea5e9 ${(stipendFilter / 10000) * 100}%)`
              }}
              className="w-full h-1.5 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-[#0ea5e9] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:ring-4 [&::-webkit-slider-thumb]:ring-white [&::-webkit-slider-thumb]:shadow-[0_0_0_2px_#0ea5e9]"
            />
            <div className="flex justify-between text-[13px] mt-3 font-medium">
              {stipendValues.map((val) => {
                const label = val === 0 ? '0' : `${val / 1000}K`;
                const isActive = val === stipendFilter;
                return (
                  <span 
                    key={val} 
                    className={`text-center w-6 cursor-pointer ${isActive ? 'text-gray-800' : 'text-gray-400'}`}
                    onClick={() => setStipendFilter(val)}
                  >
                    {label}
                  </span>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-2">
          <button 
            onClick={() => {
              if (showMoreFilters) {
                // Reset dropdown states when hiding the section
                setIsDatePickerOpen(false);
                setIsDurationOpen(false);
              }
              setShowMoreFilters(!showMoreFilters);
            }}
            className="flex items-center gap-1 text-[13px] text-blue-500 hover:text-blue-700 font-medium transition-colors"
          >
            {showMoreFilters ? 'View less filters' : 'View more filters'}
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-3.5 w-3.5 transition-transform ${showMoreFilters ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {showMoreFilters && (
          <div className="space-y-5 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-1.5 relative">
              <label className="text-[13px] font-medium text-gray-700">Starting from (or after)</label>
              <div 
                className="w-full px-3 py-2 border border-gray-300 hover:border-blue-500 rounded text-sm cursor-pointer bg-white transition-colors flex justify-between items-center"
                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
              >
                <span className={startDate ? 'text-gray-800' : 'text-gray-400'}>
                  {startDate ? startDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Choose date'}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              
              {isDatePickerOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-xl rounded-md z-50 p-3 select-none">
                  <div className="flex justify-between items-center mb-4 px-1">
                    <button 
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <span className="text-[13px] font-semibold text-gray-800">
                      {currentMonth.toLocaleString('default', { month: 'short' })} {currentMonth.getFullYear()}
                    </span>
                    <button 
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                      className="text-gray-400 hover:text-blue-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center mb-2">
                    {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                      <div key={day} className="text-[11px] font-medium text-gray-400">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center">
                    {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay() }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-7 w-7"></div>
                    ))}
                    {Array.from({ length: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate() }).map((_, i) => {
                      const day = i + 1;
                      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
                      const isToday = date.toDateString() === new Date().toDateString();
                      const isPast = date < new Date(new Date().setHours(0,0,0,0));
                      const isSelected = startDate?.toDateString() === date.toDateString();
                      
                      return (
                        <div 
                          key={day} 
                          onClick={() => {
                            if (!isPast) {
                              setStartDate(date);
                              setIsDatePickerOpen(false);
                            }
                          }}
                          className={`h-7 w-7 flex items-center justify-center text-[12px] rounded-full mx-auto transition-colors
                            ${isPast ? 'text-gray-300 cursor-not-allowed' : 'cursor-pointer'}
                            ${isSelected ? 'bg-[#008bdc] text-white font-semibold' : ''}
                            ${!isPast && !isSelected ? 'text-gray-700 hover:bg-blue-50' : ''}
                            ${isToday && !isSelected ? 'font-bold text-blue-600' : ''}
                          `}
                        >
                          {day}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-1.5 relative">
              <label className="text-[13px] font-medium text-gray-700">Max. duration (months)</label>
              <div 
                className={`w-full px-3 py-1.5 min-h-[38px] border ${isDurationOpen ? 'border-blue-500' : 'border-gray-300'} hover:border-blue-500 rounded ${!durationFilter ? 'cursor-pointer' : 'cursor-default'} bg-white transition-colors flex justify-between items-center`}
                onClick={() => {
                  if (!durationFilter) {
                    setIsDurationOpen(!isDurationOpen);
                  }
                }}
              >
                {durationFilter ? (
                  <div className="bg-[#008bdc] text-white px-2 py-0.5 rounded-[3px] flex items-center gap-1.5 text-[12px]">
                    {durationFilter === '1' ? '1 month' : `${durationFilter} months`}
                    <span 
                      className="hover:text-gray-200 cursor-pointer text-[14px] font-light leading-none"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDurationFilter('');
                        setIsDurationOpen(false);
                      }}
                    >
                      &times;
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-400 text-[13px]">Choose duration</span>
                )}
                
                {!durationFilter && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
              
              {isDurationOpen && (
                <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-200 shadow-lg rounded-md z-50 py-1 max-h-64 overflow-y-auto">
                  {durationOptions.map((opt) => (
                    <div 
                      key={opt}
                      className="px-4 py-2 text-[13px] text-gray-700 hover:bg-[#e6f4f1] cursor-pointer"
                      onClick={() => {
                        setDurationFilter(opt);
                        setIsDurationOpen(false);
                      }}
                    >
                      {opt === '1' ? '1 month' : `${opt} months`}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-3 pt-1 text-[13px] text-gray-700">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="flex items-center gap-1">Internships with job offer <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="flex items-center gap-1">Fast response <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="flex items-center gap-1">Early applicant <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                <span className="flex items-center gap-1">Internships for women <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span>
              </label>
            </div>
          </div>
        )}

        <div className="pt-4 flex justify-end">
          <button 
            onClick={() => {
              setProfileFilters([]);
              setLocationFilters([]);
              setIsWfh(false);
              setIsPartTime(false);
              setStipendFilter(0);
              setDurationFilter('');
              setStartDate(null);
            }}
            className="text-[13px] text-blue-500 hover:text-blue-700 font-semibold transition-colors"
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  );
}
