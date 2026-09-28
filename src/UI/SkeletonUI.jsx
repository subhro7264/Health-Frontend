import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';


const SkeletonUI = () => {

    return (
        <>

    <div className="max-w-6xl mx-auto py-10 px-5 font-sans">
        <header className="mb-8">
          <div className="mb-1"><Skeleton height={36} width={250} /></div>
          <div><Skeleton height={20} width={100} /></div>
        </header>

        {/* 4 Summary Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <div className="mb-2 flex justify-between items-center">
                <Skeleton height={16} width={100} />
                <Skeleton height={24} width={24} circle />
              </div>
              <Skeleton height={40} width="60%" />
            </div>
          ))}
        </div>

        {/* 4 Charts Skeleton */}
        <div className="flex flex-col gap-10">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl border border-gray-200">
              <div className="mb-5"><Skeleton height={28} width={150} /></div>
              <div className="h-[300px] w-full">
                <Skeleton height="100%" borderRadius="0.5rem" />
              </div>
            </div>
          ))}
        </div>
      </div>

        </>
    )
}

export default SkeletonUI;