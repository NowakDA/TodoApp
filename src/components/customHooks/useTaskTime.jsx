import { useEffect, useState } from 'react';
import { formatDistanceToNow } from 'date-fns';

// TIME COUNTER SINCE THE TASK WAS CREATED used in Task.jsx
const useTaskTime = (createdAt) => {
  const [timeAgo, setTimeAgo] = useState('');
  useEffect(() => {
    const updateTimeAgo = () => {
      setTimeAgo(formatDistanceToNow(new Date(createdAt), { addSuffix: true }));
    };

    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, 60000);
    return () => clearInterval(interval);
  }, [createdAt]);

  return timeAgo;
};

export default useTaskTime;
