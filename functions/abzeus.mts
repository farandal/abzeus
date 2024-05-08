import { Config, Context } from "@netlify/functions";
import { ABZeusAlfwetTranslator } from "abzeus";

const translator = new ABZeusAlfwetTranslator();

export default async (req: Request, context: Context) => {

  const { w } = context.params;
 
  const queryString = new URL(req.url).searchParams;

  const _w = w;
  const _l = queryString.get("l") || "en";

  const _f1 = queryString.get("f1") || "+<>";
  const _f2 = queryString.get("f2") || "+><";

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

    return new Response(JSON.stringify({ error: error && error.message ? error.message : error }), { status: 500 });

  }
}

export const config: Config = {
  //path: "/api/:w/:l"
  path: "/api/:w"
};