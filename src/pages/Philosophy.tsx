import ABZeusTranslatorWidget, { IABZeusTranslatorWidget } from "@/components/abzeus/ABZeusTranslatorWidget";
import { ABZeusConfigState } from "@/state/ABZeusConfigSlice";
import { RootState } from "@/store";
import { Box } from "@mui/material";
import { useSelector } from "react-redux";

const English = () => {

    const ABZeusState: ABZeusConfigState = useSelector((state: RootState) => state.ABZeusConfig)

    const widgetConfig: IABZeusTranslatorWidget = {
        //width: 320,
        height: 240,
        options: {
            lang: ABZeusState.options?.lang || "es",
        },
        showInput: false,
        showBottomLabel: true,
        showBackText: false
    }
    
    return <Box style={{textAlign:"center"}}>

                <h2>-O-Z*us philosophical model overview.</h2>
                <ABZeusTranslatorWidget {...widgetConfig} w={"filosofia"} zoom={0.99}   />
                
                <p>The -O-Z*us model premises that words carry a meaning with a common sense bias based on the interpretation of the symbols that make up the characters, allowing to correlate an objective idea in the meaning of words through the interpretation of the symbols and geometry that make up the characters without significant relevant pre-cognitive biases, however, with a subjective bias to the constructive philosophy with which the -O-Z*us Alfwet was developed, highlighting its three postulates: irreducibility and minimal representation [.], duality [.*], and trinity [*O.]</p>
                <h2>Principles</h2>
                <h1 className="abzeus" >e</h1>
                <p>Ireductibility and minimal representation.</p>
                <h1 className="abzeus" >D</h1>
                <p>Duality ‘the object is the result of an abstraction’.</p>
                <h1 className="abzeus">EOe</h1>
                <p>Trinity ‘a definition has a previous / subjective / abstract and forward / objective part’.</p>
                
                <hr></hr>
               
                <h2>DUAL</h2>
                <p className="abzeus mainTitle">D</p>
            
                <ABZeusTranslatorWidget {...widgetConfig} w={"dual"}   zoom={1}  />
                <p>Rationalizes form thought a definition that describes the topological space between the abstract and the object towards an origin or initial definition</p>
                <h5>The object is the result of an abstraction</h5>
                <p>A form of representation based on the postulate of duality in the context of the -O-Z*us philosophy that establishes that ‘the object is the result of an abstraction’ </p>
                <p>Duality in -O-Z*us philosophy is equivalent to the minimum and irreducible visual representation in two dimensions of the distance between the abstract and the object, describing the two components that make up a 'whole' between the abstract and the objective, analogous and consistent with the Kantian postulates as the minimal representable distance between the phenomenon [* the abstract] and the noumenon [. The object] and with Einsteinian postulate of the duality between matter [.] and energy [*] that leads to other developments such as, for example, that the minimum representation of the distance between the abstract and the object is also equivalent to a definition of ‘thought’.</p>
    
                <hr></hr>

                <h2>TRINI</h2>
                <p className="abzeus mainTitle">EOe</p>
                <ABZeusTranslatorWidget {...widgetConfig} w={"trini"}   zoom={1}  />
                <p>The words are interpreted in trisyllabic groups called trinitarian, derived from the postulate of the Trinity in -O- Z*us philosophy, “any definition has an abstract/subjective and objective component” that generates the pattern of Trinity (suj,eto,obj) as the three components that make up the definition and that essentially describe its substantive [eto] as a radius singularly describable [rini] that applies as a theorem on words with the pattern SUJ&lt;ETO&gt;OBJ. </p>
                
                <div className="abzeus mainTitle">{'SUJ < ETO > OBJ'}</div>
                
                <h4>SUJ (Subject) </h4>
                <p>Rationalizes [u] the link [j] with observation [s].</p>
                <h4>ETO (Substantive)</h4>
                <p>Defines [o] what exists [t] from its representation [e]. </p>
                <h4>OBJ (Object)</h4>
                <p>Concludes [b] the link [j] with the definition [o]. </p>
                <p>Each trinitarian group responds to the trinity (suj&lt;eto&gt;obj) that describes the central letter of the group as a Substantive portion that is enveloped by two node characters that respond to the pattern that ‘every representable node has a previous subjective portion forward an objective portion’. When the trinitarian group is a palindrome, the relationship of adjacent attributes surrounding the substantive [eto], creates a relationship of belonging represented by the root as the substantive [eto] and its container [suj,obj]; the root [eto] and its square [suj,obj].</p>
                <p>Duality within the -O- Z*us Philosophy behind its alphabet (-O-Z*us Alfwet) establishes that ‘any object comes from an abstraction’, basically synthesizing Duality as a topological space between the abstract/subjective towards the object, and Trinity establishes that “any definition has an abstract and objective component”, counting the definition or the whole, where the definition exists, as the third part. </p>
                <p>The letter [e] is represented by a dot [.] and the letter [E] is represented by an asterisk [*]; them representing the duality between the abstract and the object [E,e], therefore the letter [e] and [E] or [.] and [*] represents duality in its minimum expression, as the process of giving object [.] to the abstract [*], finally the letter [e] represented by a dot or an asterisk is equivalent to the duality of the information representation.</p>
                <p>Within the physical context, the letter [e] and [E] or [.] and [*] represent the duality of matter and energy, highlighting that the duality of information is the duality between the objective and the abstract/subjective part of the whole, consistent with the Einsteinian duality of matter and energy postulate.</p>
                <p>The model finally allows to conclude an objective meaning of words in various languages through a simple stemming decoding algorithm, also providing a contextual interpretation interface (literal,physical,anthropological)</p>
    
    </Box>
}

const Philosophy = () => {
    return <Box sx={{pt:2}} className="mainContent philosophy">
              <div style={{alignItems:'center',justifyContent:'center',height:"100vh"}}>
                <h1 className="abzeus">filosofia</h1>
                <English/>
              </div>
        </Box>
}

export default Philosophy;