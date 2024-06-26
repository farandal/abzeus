import { IABZeusTranslatorOutput } from "abzeus";

const ABZeusETO = ({input}:{input:IABZeusTranslatorOutput["trinitarianGroups"]}) => {
    
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                /* @ts-expect-error */
                <td key={index}>{input[header]}</td>
              ))}
            </tr>
          </tbody>
        </table>
      );

    return <>{JSON.stringify(input)}</>

}

// eslint-disable-next-line react-refresh/only-export-components
export default ABZeusETO;