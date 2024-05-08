import { useEffect, useState } from "react";

const useElectronWindow = () => {
    const [windowSize, setWindowSize] = useState<[number,number]>();

    useEffect(() => {
      const handleWindowSize = (size:any) => {
        setWindowSize([size[0],size[1]]);
      };
  
      window.electron.onWindowSize(handleWindowSize);
      window.electron.getWindowSize();
      
      return () => {
        //window.electron.offWindowSize(handleWindowSize);
      };
    }, []);
    
  return windowSize ? [windowSize[0] || 0, windowSize[1] || 0] : [0,0];
};

export default useElectronWindow;