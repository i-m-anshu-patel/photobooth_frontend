import React from 'react'
import { filterlist } from '../utils/filterlist';

const FilterModal = ({ filters , setfilters, setFilterClassname, setFilterModalMode}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-40'>
      <div className="sm:w-full md:w-1/2 grid grid-rows-2 gap-2">
        <div className="grid grid-cols-4 gap-3 mt-14">
          {filterlist.map((filter, index) => (
            <div className="flex flex-col" key={index}>
              <div
                className={filter.name === filters ? 'border-2 border-white' : ''}
                onClick={() => {
                  setfilters(filter.name);
                  setFilterClassname(filter.className);
                  setFilterModalMode(false);
                }}
              >
                <img src="filterImage.jpg" alt="filterImage" className={`w-full ` + filter.className} />
                <p className="text-md text-center text-white capitalize">{filter.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilterModal
