import { useEffect, useState } from "react";

const useElectronWindow = () => {
    const [windowSize, setWindowSize] = useState<[number,number]>([800,600]);

    useEffect(() => {
      const handleWindowSize = (size:any) => {
        console.log(windowSize);
        setWindowSize([size[0],size[1]]);
      };
  
      window.electron.onWindowSize(handleWindowSize);
      window.electron.getWindowSize();
      
      return () => {
        //window.electron.offWindowSize(handleWindowSize);
      };
    }, []);
    
console.log(windowSize);
  return windowSize ? [windowSize[0], windowSize[1]] : [800,600];
};

export default useElectronWindow;