'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import CTAButton from '../ui/CTAButton';

const ProjectsClient = ({ projects = [], services = [] }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setServiceMenuOpen(false);
      }
    };

    if (serviceMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [serviceMenuOpen]);

  const toggleService = (service) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const clearFilters = () => {
    setSelectedServices([]);
    setActiveFilter('all');
    setServiceMenuOpen(false);
  };

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all' || selectedServices.length === 0) {
      return projects;
    }
    return projects.filter((project) =>
      selectedServices.includes(project.service)
    );
  }, [projects, activeFilter, selectedServices]);

  const hasNoProjects = projects.length === 0;
  const hasNoFilteredProjects =
    !hasNoProjects && filteredProjects.length === 0;

  return (
    <section className="py-[3rem] lg:py-[4rem]">
      <div className="px-[3.75rem] md:px-[9.5rem]">
        <div className="flex items-center gap-[3rem] mb-[3rem]">
          <button
            type="button"
            onClick={clearFilters}
            className={`px-[1.25rem] py-[0.25rem] md:px-[2rem] md:py-[0.5rem] text-[0.75rem] md:text-2xl transition-colors bg-[var(--secondary)] text-white`}
          >
            All Projects
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => {
                setActiveFilter('service');
                setServiceMenuOpen((open) => !open);
              }}
              className={`flex items-center gap-2 px-[2rem] py-[0.25rem] md:px-[3.75rem] md:py-[0.5rem] text-[0.75rem] md:text-2xl transition-colors bg-[var(--secondary)] text-white`}
            >
              <span>Service</span>
              {selectedServices.length > 0 && (
                <span className="absolute top-[-10px] right-[-10px] bg-[var(--primary-blue-first)] inline-flex items-center justify-center rounded-full px-2 py-[2px] text-[0.65rem] md:text-[0.7rem]">
                  {selectedServices.length}
                </span>
              )}
            </button>

            {serviceMenuOpen && services.length > 0 && (
              <div className="absolute z-20 mt-2 w-56 rounded-md border border-gray-200 bg-white shadow-[0_8px_24px_rgba(0,0,0,0.12)] p-3 space-y-2">
                {services.map((service) => {
                  const checked = selectedServices.includes(service);
                  return (
                    <label
                      key={service}
                      className="flex items-center gap-2 text-xs md:text-sm cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => {
                          setActiveFilter('service');
                          toggleService(service);
                        }}
                        className="h-3 w-3 md:h-4 md:w-4 accent-[var(--primary-blue-first)]"
                      />
                      <span>{service}</span>
                    </label>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        {hasNoProjects ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-[var(--secondary)] text-base md:text-lg">
              No projects available at the moment. Check back soon!
            </p>
          </div>
        ) : hasNoFilteredProjects ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-center text-[var(--secondary)] text-base md:text-lg">
              No projects match the selected services.
            </p>
          </div>
        ) : (
          <div className="grid gap-[1.5rem] md:gap-[2rem] lg:grid-cols-2 ">
            {filteredProjects.map((project) => {
              return (
                <article
                  key={project.id}
                  className="bg-white shadow-[0_12px_30px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col"
                >
                  <div className="relative h-[165px] md:h-[300px]">
                    {project.mainImage ? (
                      <Image
                        src={project.mainImage}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}

                    {project.propertyType && (
                      <span
                        className={`absolute top-0 left-0`}
                      >
                        {project.propertyType === 'home' ?
                        <Image
                          src="/projects/home-label.svg"
                          alt="Home Label"
                          width={50}
                          height={50}
                          /> 
                          :
                           <Image
                          src="/projects/commercial-label.svg"
                          alt="Commercial Label"
                          width={50}
                          height={50}
                          />
                        }
                      </span>
                    )}
                    {project.service && (
                      <span
                        className="absolute top-0 left-[50px] px-[0.75rem] py-[0.5rem] text-[0.5rem] md:text-base text-white bg-[var(--primary-blue-second)]"
                      >
                        {project.service}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className='w-[80%] px-[1.5rem] py-[0.75rem] md:px-[2rem] md:py-[1.5rem]'>
                    <h3 className="font-bold text-base md:text-2xl mb-[0.75rem]">
                      {project.title}
                    </h3>
                    <p className="text-xs md:text-[1.25rem] mb-4">
                      {project.description}
                    </p>
                    </div>

                    <div className="mt-auto flex justify-end">
                      <CTAButton title="Read More" link={`/projects/${project.id}`} color="blue" className="mr-[0.75rem] mb-[0.75rem] text-xs md:text-base !py-[2px] !px-[4px] md:!py-[0.5rem] md:!px-[1.5rem]"/>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsClient;


