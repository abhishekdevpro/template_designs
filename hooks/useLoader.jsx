import { useState } from 'react';

const useLoader = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = async (action) => {
    setIsLoading(true);
    try {
      await action();
    } finally {
      setIsLoading(false);
    }
  };

  return [isLoading, handleAction];
};

export default useLoader;
