import React from 'react';
import { Internship } from '../types';

interface InternshipCardProps {
  internship: Internship;
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col gap-4 hover:shadow-[0_8px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-pointer">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h3 className="text-[18px] font-bold text-[#333333] tracking-tight">
            {internship.profile_name}
          </h3>
          <div className="flex items-center gap-2">
            <p className="text-[15px] font-medium text-gray-500">
              {internship.company_name}
            </p>
            {internship.is_active && (
              <span className="px-2 py-0.5 rounded border border-blue-400 text-blue-500 text-[11px] font-medium tracking-wide">
                Actively hiring
              </span>
            )}
          </div>
        </div>
        <div className="w-12 h-8 flex items-center justify-end flex-shrink-0">
          {internship.company_logo && internship.company_logo !== '' ? (
            <img 
              src={`https://internshala.com/cached_uploads/logo/${internship.company_logo}`} 
              alt={`${internship.company_name} logo`}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          )}
        </div>
      </div>

      {/* Info Row (Location, Stipend, Duration) */}
      <div className="flex flex-wrap items-center gap-6 mt-1 text-[14px] text-gray-700">
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>{internship.location_names.length > 0 ? internship.location_names.join(', ') : 'Location not specified'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <span>{internship.stipend?.salary || 'Unpaid'}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>{internship.duration}</span>
        </div>
      </div>

      {/* Role & Responsibilities Mock */}
      <div className="flex items-start gap-1.5 mt-1 text-[13.5px] text-gray-700">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <span className="truncate">Role & responsibilities Assist in processing vendor invoices and payment requests Verify invoices...</span>
      </div>

      {/* Skills Mock */}
      <div className="flex items-center flex-wrap gap-2 text-[13px] text-gray-500 font-medium">
        <span>Accounting</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>MS-Excel</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>Data entry</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>MIS</span>
        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
        <span>Report Generation</span>
      </div>

      {/* Footer Tags */}
      <div className="flex items-center gap-3 mt-1 pt-1">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#e6f4ea] text-[#137333] rounded-full text-[12.5px] font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Few hours ago
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#f8f8f8] text-gray-700 rounded-full text-[12.5px] font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
          </svg>
          Be an early applicant
        </div>
      </div>
    </div>
  );
}
