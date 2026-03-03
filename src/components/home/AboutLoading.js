import BrandsLoading from './BrandsLoading';

const AboutLoading = () => {
    return (
        <section className='lg:px-[var(--inline-padding)] py-[3rem]'>
            <div className='flex lg:flex-row flex-col center justify-between'>
                <div className='lg:w-[55%] lg:p-0 px-[4.3rem]'>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4"></div>
                </div>
                <div className='lg:block hidden w-[32%]'>
                    <div className="h-8 bg-gray-200 rounded animate-pulse w-1/2 mb-4"></div>
                    <div className='flex justify-between mt-[2rem] items-center'>
                        <div className="w-[110px] h-[87px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-[110px] h-[87px] bg-gray-200 rounded animate-pulse"></div>
                    </div>
                    <div className='flex justify-between mt-[1.5rem]'>
                        <div className="w-[137px] h-[57px] bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-[137px] h-[57px] bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
                <div>
                    <h2 className='lg:hidden sr-only'>Trusted By</h2>
                    <BrandsLoading className="lg:hidden"/>
                </div>
            </div>
        </section>
    );
};

export default AboutLoading;

