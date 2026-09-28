import React, { useEffect, useState } from 'react';


const LiveClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    return (
        <span className="text-xs text-gray-400 font-mono">
            {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
        </span>
    );
};
export default React.memo(LiveClock);