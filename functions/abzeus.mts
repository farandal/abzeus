import { Config, Context } from "@netlify/functions";
import { ABZeusAlfwetTranslator } from "abzeus";



export default async (req: Request, context: Context) => {

  const translator = new ABZeusAlfwetTranslator();

  const { w } = context.params;
 
  const queryString = new URL(req.url).searchParams;

  const _w = w;
  const _l = queryString.get("l") || "en";

  const _f1 = queryString.get("f1") || "+<>";
  const _f2 = queryString.get("f2") || "+><";

  const set = queryString.get("set") || null;

  if(set && set != "") {

    const _set = set.split(",");
    
    try {

        const result = _set.map((w) => {
            return translator.translate(w, {
                lang: _l,
                parentTriniFormat: _f1,
                childTriniFormat: _f2,
                nestedTranslation: false
            })[0];
        })

        return new Response(JSON.stringify(result), { status: 200 });

    } catch (error:any) {

        console.log(error)

        //return new Response(JSON.stringify({ error: error && error.message ? error.message : error }), { status: 500 });
        return new Response(JSON.stringify({error:"error"}), { status: 500 });

    }

  }

  if (!_w) {
    return new Response(JSON.stringify({ error: "[w] parameter for word is required" }), { status: 400 });
  }

  try {

    const output = translator.translate(w, {
      lang: _l,
      parentTriniFormat: _f1,
      childTriniFormat: _f2,
      nestedTranslation: false
    });

    return new Response(JSON.stringify(output), { status: 200 });

  } catch (error:any) {

    console.log(error)

    //return new Response(JSON.stringify({ error: error && error.message ? error.message : error }), { status: 500 });
    return new Response(JSON.stringify({error:"error"}), { status: 500 });

  }
}

export const config: Config = {
  //path: "/api/:w/:l"
  path: "/api/:w"
};