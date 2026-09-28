
// import React, { useState, useEffect } from 'react';
// import DailyProgress from '../DailyProgress';
// import SleepQuality from '../SleepQuality';
// import Activity from '../Activity';
// import Hydration from '../Hydration';
// import TodaysAgenda from '../TodaysAgenda';
// import Mindfulness from '../Mindfulness';
// import Header from './header/Header';
// import { useAuth } from '../../../context/AuthContext';
// import Stats from './Habits/Stats';
// import {useSelector} from 'react-redux';
// import Year from './ChangeView/Year';
// import Month from './ChangeView/Month';
// import Weeks from './ChangeView/Weeks';

// const HealthDashboard = () => {

//     const { user,logout } = useAuth();
//     const currentView = useSelector((state) => state.changeView.value) || "Today";

//     return (
//         <>
//             <div className="health-dashboard bg-gray-900 text-white min-h-screen h-full  p-8" >
//                 <Header />
//                 <Stats />
//                 {(currentView === "Today" && 
//                 <div className="  h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-orange-800 p-6 rounded-lg max-w-7xl mx-auto">
//                     <DailyProgress />
//                     <SleepQuality />
//                     <Activity />
//                     <Hydration />
//                     <TodaysAgenda />
//                     <Mindfulness />
//                 </div>)}
//                 {(currentView === "Week" && 
//                 <div className="  h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-orange-800 p-6 rounded-lg max-w-7xl mx-auto">
//                     <Weeks />
//                 </div>)}
//                 {(currentView === "Month" && 
//                 <div className="  h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-orange-800 p-6 rounded-lg max-w-7xl mx-auto">
//                     <Month />
//                         </div>)}
//                 {(currentView === "Year" && 
//                 <div className="  h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-orange-800 p-6 rounded-lg max-w-7xl mx-auto">  
//                     <Year />
//                 </div>)}
//             </div>


//         </>
//     )
// }

// export default HealthDashboard;


// import React from 'react';
// import DailyProgress from '../DailyProgress';
// import SleepQuality from '../SleepQuality';
// import Activity from '../Activity';
// import Hydration from '../Hydration';
// import TodaysAgenda from '../TodaysAgenda';
// import Mindfulness from '../Mindfulness';
// import Header from './header/Header';
// import Stats from './Habits/Stats';
// import Year from './ChangeView/Year';
// import Month from './ChangeView/Month';
// import Weeks from './ChangeView/Weeks';

// import { useAuth } from '../../../context/AuthContext';
// import { useSelector } from 'react-redux';

// const HealthDashboard = () => {

//     const { user } = useAuth();
//     const currentView = useSelector((state) => state.changeView.value) || "Today";

//     const renderViewContent = () => {

//         switch (currentView) {
//             case "Week":
//                 return <Weeks />;
//             case "Month":
//                 return <Month />;
//             case "Year":
//                 return <Year />;
//             case "Today":
//             default:

//                 return (
//                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#0f1825] p-6 rounded-lg">
//                         <DailyProgress />
//                         <SleepQuality />
//                         <Activity />
//                         <Hydration />
//                         <TodaysAgenda />
//                         <Mindfulness />
//                     </div>
//                 );
//         }
//     };

//     return (
//         <div className="health-dashboard bg-[#0a1120] text-white min-h-screen h-full p-8">
//             <Header />
//             {currentView === "Today" && <Stats />}

//             <div className="max-w-8xl mx-auto w-full mt-12">
//                 {renderViewContent()}
//             </div>
//         </div>
//     );
// };

// export default HealthDashboard;



import React from 'react';
// import DailyProgress from '../HealthActivity/DailyProgress/DailyProgress';
// import SleepQuality from '../HealthActivity/SleepQuality/SleepQuality';
// import Activity from '../HealthActivity/Activity/Activity';
// import Hydration from '../HealthActivity/Hydration/Hydration';
// import TodaysAgenda from '../HealthActivity/Today/TodaysAgenda';
// import Mindfulness from '../HealthActivity/Mindfulness/Mindfulness';
import Header from './header/Header';
import Stats from './Habits/Stats';

import NewWeek from './ChangeView/NewWeek';
import DashboardContent from './DashboardContent';

import { useAuth } from '../../context/AuthContext';
import { useSelector } from 'react-redux';


const HealthDashboard = () => {

    const { user } = useAuth();
    const currentView = useSelector((state) => state.changeView.value) || "Today";

    // const renderViewContent = () => {
    //     switch (currentView) {
    //         case "Week":
    //             return <NewWeek />;
    //         case "Month":
    //             return <Month />;
    //         case "Today":
    //         default:
    //             return (
    //                 <div className="bg-[#0f1825] p-6 rounded-lg border border-slate-800 flex flex-col lg:flex-row gap-6">

    //                     {/* Left Column: Health Metric Cards */}
    //                     <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
    //                         <DailyProgress />
    //                         <SleepQuality />
    //                         <Hydration />
    //                         <Mindfulness />
    //                     </div>

    //                     {/* Right Column: Agenda */}
    //                     <div className="w-full lg:w-[350px] shrink-0">
    //                         <TodaysAgenda />
    //                     </div>

    //                 </div>
    //             );
    //     }
    // };

    return (
        <div className="health-dashboard bg-[#0a1120] text-white min-h-screen h-full p-8 font-sans">
            <Header />
            {currentView === "Today" && <Stats />}

            <div className="max-w-7xl mx-auto w-full mt-8">
                {/* {renderViewContent()} */}
                <DashboardContent />
            </div>
        </div>
    );
};

export default HealthDashboard;