import SearchLayout from '@/components/SearchLayout';
import { Internship, APIResponse } from '@/types';

async function getInternships(): Promise<Internship[]> {
  const res = await fetch('https://internshala.com/hiring/search', {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch internships');
  }

  const data: APIResponse = await res.json();
  
  // Extract the internship meta objects into an array
  const internships = data.internship_ids.map(id => data.internships_meta[id]).filter(Boolean);
  
  return internships;
}

export default async function Home() {
  let internships: Internship[] = [];
  let errorMsg = '';

  try {
    internships = await getInternships();
  } catch (error) {
    console.error(error);
    errorMsg = 'Failed to load internships. Please try again later.';
  }

  return (
    <main className="min-h-screen bg-[#f8f9fa] text-gray-900 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8 h-[72px] flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="flex items-center text-blue-500 font-bold text-xl tracking-wide gap-1">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform -rotate-45" viewBox="0 0 20 20" fill="currentColor">
                 <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
               </svg>
               INTERNSHALA
             </div>
          </div>
          <nav className="hidden md:flex items-center text-[14px] font-medium text-gray-700 h-full">
            <div className="relative h-full flex items-center px-4 cursor-pointer text-gray-900">
              <span>Internships</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              <div className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-500"></div>
            </div>
            <div className="h-full flex items-center px-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <span>Courses</span>
              <span className="ml-2 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">OFFER</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <div className="h-full flex items-center px-4 cursor-pointer hover:bg-gray-50 transition-colors">
              <span>Jobs</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 text-gray-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </div>
            <div className="relative h-full flex items-center group">
              <div className="h-full flex items-center px-4 cursor-pointer hover:bg-blue-50 group-hover:bg-blue-50 transition-colors text-blue-500 font-semibold group-hover:text-blue-600">
                <span>Login / Register</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
              </div>
              <div className="absolute top-full right-0 w-64 bg-white border border-gray-100 shadow-lg rounded-b-lg hidden group-hover:block z-20 py-2">
                <a href="#" className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors font-medium">Register as a student</a>
                <a href="#" className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors font-medium">Register as an employer</a>
                <a href="#" className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-500 transition-colors font-medium">Login</a>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-6">
        {errorMsg ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{errorMsg}</span>
          </div>
        ) : (
          <SearchLayout initialInternships={internships} />
        )}
      </div>
    </main>
  );
}
