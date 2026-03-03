import home from '@/content/homepage'
import Image from 'next/image'
import Brands from './Brands'
import { apiConfig, getApiUrl, getImageUrl } from '@/config/api';

const About = async () => {
    let companies = [];
    let error = null;

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
        companies = data.data
            .map((company) => ({
                id: company.id,
                name: company.name || '',
                logo: getImageUrl(company.logo || ''),
                priority: company.priority || 999,
            }))
            .sort((a, b) => a.priority - b.priority);
    } catch (err) {
        error = err.message || 'Failed to load companies. Please try again later.';
        companies = [];
    }

    // Take only first 4 companies for About section
    const firstFourCompanies = companies.slice(0, 4);
    
    // Split first 4 companies into rows of 2 for the desktop layout
    const firstRow = firstFourCompanies.slice(0, 2);
    const secondRow = firstFourCompanies.slice(2, 4);

    return (
        <section className='lg:px-[var(--inline-padding)] py-[3rem]'>
            <div className='flex lg:flex-row flex-col center justify-between'>
                <p className='lg:w-[55%] lg:p-0 px-[4.3rem] lg:text-2xl leading-[1.3] lg:text-start text-center'>{home.about.description}</p>
                <div className='lg:block hidden w-[32%] lg:text-start text-center'>
                    <h2 className='font-bold text-[2rem] lg:block hidden'>{home.trustedBy.title}</h2>
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
                                                className="object-contain"
                                                sizes="110px"
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
                                                className="object-contain"
                                                sizes="137px"
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
                <Brands className="lg:hidden" companies={error ? null : firstFourCompanies} />
                </div>
            </div>
        </section>
    )
}

export default About
