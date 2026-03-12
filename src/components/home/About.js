import { getContent } from "@/lib/get-content";
import Image from 'next/image'
import Brands from './Brands'
import { apiConfig, getImageUrl, fetchFromAPI } from '@/config/api';
const About = async ({ content: passedContent, locale = "en" }) => {
    const content = passedContent || (await getContent(locale, "homepage"));
    let companies = [];
    let error = null;

    try {
  const data = await fetchFromAPI(apiConfig.endpoints.companies, {
    next: { revalidate: 60 },
    headers: { 'Accept-Language': locale },
  });
  companies = data.data
    .map((company) => ({ id: company.id, name: company.name || '', logo: getImageUrl(company.logo || ''), priority: company.priority || 999 }))
    .sort((a, b) => a.priority - b.priority);
} catch (err) {
  error = err.message || 'Failed to load companies. Please try again later.';
  companies = [];
}

    const firstFourCompanies = companies.slice(0, 4);
    
    const firstRow = firstFourCompanies.slice(0, 2);
    const secondRow = firstFourCompanies.slice(2, 4);

    return (
        <section className='lg:px-[var(--inline-padding)] py-[3rem] lg:bg-[var(--secondary)] lg:text-white'>
            <div className='flex lg:flex-row flex-col center justify-between gap-6'>
                <p dir={locale.startsWith("ar") ? "rtl" : "ltr"} className='lg:w-[55%] lg:p-0 px-[4.3rem] lg:text-2xl leading-[1.3] text-center lg:text-start'>{content?.about?.description}</p>
                <div className='lg:block hidden w-[32%] text-center lg:text-start'>
                    <h2 className='font-bold text-[2rem] lg:block hidden'>{content?.trustedBy?.title}</h2>
                    {/* brands  */}
                    {error ? (
                        <div className='mt-[2rem]'>
                            <p className='text-red-600 text-sm mb-1'>Unable to load companies</p>
                            <p className='text-gray-600 text-xs'>{error}</p>
                        </div>
                    ) : firstFourCompanies.length === 0 ? (
                        <p className='mt-[2rem] text-gray-600 text-sm'>No companies available.</p>
                    ) : (
                        <>
                            {firstRow.length > 0 && (
                                <div className='flex justify-between mt-[2rem] items-center'>
                                    {firstRow.map((company) => (
                                        <div key={company.id} className="relative w-[10rem] h-[5rem]">
                                            <Image 
                                                src={company.logo} 
                                                alt={`${company.name}-logo`} 
                                                fill
                                                priority
                                                className="object-contain brightness-0 invert"
                                                sizes="160px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            {secondRow.length > 0 && (
                                <div className='flex justify-between mt-[1.5rem]'>
                                    {secondRow.map((company) => (
                                        <div key={company.id} className="relative w-[10rem] h-[5rem]">
                                            <Image 
                                                src={company.logo} 
                                                alt={`${company.name}-logo`} 
                                                fill
                                                priority
                                                className="object-contain brightness-0 invert"
                                                sizes="160px"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>
                <div>
                <h2 className='lg:hidden sr-only'>Trusted By</h2>
                <Brands className="lg:hidden" companies={error ? null : firstFourCompanies} locale={locale} />
                </div>
            </div>
        </section>
    )
}

export default About
