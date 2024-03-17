import { useEffect, useState } from "react";

const useElectronWindow = () => {
    const [windowSize, setWindowSize] = useState<[number,number] | null>(null);

    useEffect(() => {
      const handleWindowSize = (size:any) => {
        console.log(size);
        setWindowSize([size[0],size[1]]);
      };
  
      window.electron.onWindowSize(handleWindowSize);
      window.electron.getWindowSize();
      
      return () => {
        //window.electron.offWindowSize(handleWindowSize);
      };
    }, []);
    
  return windowSize ? [windowSize[0], windowSize[1]] : null;
};

export default useElectronWindow;