import Image from "next/image";
import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';

const Brands = async ({ className = "", companies: providedCompanies = null }) => {
  let companies = [];
  let error = null;

  // If companies are provided (from About section), use them
  // Otherwise, fetch and skip first 4
  if (providedCompanies) {
    companies = providedCompanies;
  } else {
    try {
      const url = getApiUrl(apiConfig.endpoints.companies);
      const response = await fetch(url, {
        next: { revalidate: 60 },
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.msg || 'API request was not successful');
      }
      
      // Sort by priority if available, otherwise by id
      const allCompanies = data.data
        .map((company) => ({
          id: company.id,
          name: company.name || '',
          logo: getImageUrl(company.logo || ''),
          priority: company.priority || 999,
        }))
        .sort((a, b) => a.priority - b.priority);
      
      // Skip first 4 companies (they're shown in About section)
      companies = allCompanies.slice(4);
    } catch (err) {
      error = err.message || 'Failed to load brands. Please try again later.';
      companies = [];
    }
  }

  return (
    <section className={`py-[3rem] ${className}`}>
      <h2 className="sr-only">Trusted Security Technology Brands</h2>

      {error ? (
        <div className="flex items-center justify-center bg-[#F2F3F4] sm:h-[170px] h-[70px]">
          <div className="text-center">
            <p className="text-red-600 text-sm sm:text-base px-4 mb-1">
              Unable to load brands
            </p>
            <p className="text-gray-600 text-xs sm:text-sm px-4">
              Try again!
            </p>
          </div>
        </div>
      ) : companies.length === 0 ? (
        <div className="flex items-center justify-center bg-[#F2F3F4] sm:h-[170px] h-[70px]">
          <p className="text-center text-gray-600 text-sm sm:text-base px-4">
            No brands available at the moment.
          </p>
        </div>
      ) : (
        <ul className="flex items-center justify-center bg-[#F2F3F4] 
          sm:h-[170px] h-[70px] 
          xl:gap-[8rem] md:gap-[4rem] gap-[1.5rem]
          sm:px-[var(--inline-padding)] px-[var(--small-padding)]"
        >
          {companies.map((company) => (
            <li
              key={company.id}
              className="relative w-[3rem] sm:w-[5rem] lg:w-[10rem] h-[50%] flex-shrink-0"
            >
              <Image
                src={company.logo}
                alt={`${company.name} security solutions partner`}
                fill
                className="object-contain"
                sizes="(max-width: 640px) 70px, (max-width: 768px) 100px, 140px"
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Brands;
