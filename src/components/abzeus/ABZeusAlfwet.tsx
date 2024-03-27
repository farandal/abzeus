import { useEffect, useState } from "react";
import createABZeusDict from "../../abzeus/dict/createABZeusDict";
import { ABZeusConfigState } from "@/state/ABZeusConfigSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Box } from "@mui/material";


const ABZeusAlfwet = () => {

    const dispatch = useDispatch();
    
    const dict = createABZeusDict();

    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)
    
    const [currentLang,setCurrentLang] = useState<string>();
    
    useEffect(() => {

        if(ABZeusState.options && ABZeusState.options.lang) {
  
            setCurrentLang(ABZeusState.options?.lang)
        }

    },[ABZeusState])

    const [dictionary,setDictionary] = useState<Map<string, string>>()

    useEffect(() => {
       if(dict && currentLang) {
        setDictionary(dict.alfwet(currentLang));
       }
    },[dict,currentLang])

    if(!dictionary) return <>Loading</>
    return (
      <Box sx={{pt:10,pb:10}}>
      <table>
      <thead>
        <tr>
          <th>-O-Z*us</th>
          <th>Latin</th>
          <th>(ABZeus).*</th>
          <th>ABZeus</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(dictionary.entries()).map(([key, value]) => (
          <tr key={key}>
            <td className="abzeus" >
                <Box
                    sx={{
                        padding: 1,
                        //width: 300,
                        height: 30,
                        border: '1px solid black',
                        backgroundColor: 'white',
                    }}
                    >
                    {key}
                </Box>
            </td>
            <td>
                <Box
                    sx={{
                        padding: 1,
                        //width: 300,
                        height: 30,
                        border: '1px solid black',
                        backgroundColor: 'white',
                    }}
                    >
                    {key}
                </Box>    
            </td>
            <td className="abzeus">{value}</td>
            <td>{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </Box>
    );
  };
  
  export default ABZeusAlfwet;