// CardContext.js
import { createContext, useContext, useRef } from 'react';

const CardContext = createContext();

export const useCard = () => useContext(CardContext);

export const CardProvider = ({ children }) => {
  const cardRef = useRef();
  
  return (
    <CardContext.Provider value={cardRef}>
      {children}
    </CardContext.Provider>
  );
};
