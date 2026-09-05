import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/translate", async (req, res) => {
  const { text, lang } = req.query;

  const response = await fetch(
    `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=${lang}`,
    {
      method: "POST",
      headers: {
        "Ocp-Apim-Subscription-Key": process.env.TRANSLATOR_KEY,
        "Ocp-Apim-Subscription-Region": process.env.TRANSLATOR_REGION,
        "Content-Type": "application/json"
      },
      body: JSON.stringify([{ Text: text }])
    }
  );

  const result = await response.json();
  res.send(result[0].translations[0].text);
});

app.listen(3000, () => console.log("Server running on port 3000"));
