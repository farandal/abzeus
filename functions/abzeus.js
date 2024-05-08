const { ServerlessFunction } = require("netlify");
const abzeus = require("abzeus");

const handler = new ServerlessFunction("get-data");

const translator = new abzeus.ABZeusAlfwetTranslator();

handler.add(
  {
    method: "GET",
    path: "/",
  },
  async (event) => {
    const l = event.queryStringParameters["l"] || "en";
    const w = event.queryStringParameters["w"];

    const f1 = event.queryStringParameters["f1"] || "+<>";
    const f2 = event.queryStringParameters["f2"] || "+><";

    if (!w) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "[w] parameter for word is required" }),
      };
    }

    try {
      const output = translator.translate(w, {
        lang: l,
        parentTriniFormat: f1,
        childTriniFormat: f2,
        nestedTranslation: true,
      });

      return {
        statusCode: 200,
        body: JSON.stringify(output),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
      };
    }
  }
);

module.exports = handler;
