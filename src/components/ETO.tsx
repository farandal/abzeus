import { IABZeusTranslatorOutput } from "abzeus";

const ETO = ({input}:{input:IABZeusTranslatorOutput["trinitarianGroups"]}) => {
    
    const headers = ["suj", "eto", "obj"];
    const asciiHeaders = ["*", "o", "."];

    return (
        <table style={{display:"inline"}}>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
            <tr>
              {asciiHeaders.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {headers.map((header, index) => (
                /* @ts-ignore */
                <td key={index}>{input[header]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      );

    return <>{JSON.stringify(input)}</>

}

// eslint-disable-next-line react-refresh/only-export-components
export default ETO;