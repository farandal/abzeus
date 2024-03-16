import { useEffect, useState } from "react";

const useElectronWindow = () => {
    const [windowSize, setWindowSize] = useState<[number,number]>([1280,960]);

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
    
  return windowSize ? [windowSize[0], windowSize[1]] : [1280,960];
};

export default useElectronWindow;