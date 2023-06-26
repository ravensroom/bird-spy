import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const useUserId = (): string => {
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');

    if (!storedUserId) {
      const newUserId = uuidv4();
      localStorage.setItem('userId', newUserId);
      setUserId(newUserId);
    } else {
      setUserId(storedUserId);
    }
  }, []);

  return userId;
};

export default useUserId;
