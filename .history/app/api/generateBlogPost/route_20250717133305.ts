import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const chat = createChat({
    apiKey:
      process.env.OPENAI_API_KEY ||
      "sk-proj-m5F97TxvGplJe3a2yfloT3BlbkFJG1TEpMpZ3ms6QfONLsMT",
    model: "gpt-4",
  });

  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Generujesz podstawowe dane dla posta na bloga na temat ${topic}. Generuj tylko tytuł, krótki opis, SEO dane, URL i tagi. NIE generuj treści posta - to będzie pisane ręcznie.`,
    {
      expect: {
        examples: [
          {
            title: "Jak algorytm TikToka może zmienić strategię twórców",
            shortDesc:
              "Poznaj zaawansowane metody, które umożliwiają dotarcie do większej liczby odbiorców na TikToku.",
            text1Title: "Treść posta",
            text1Desc: "",
            text2Title: "",
            text2Desc: "",
            text3Title: "",
            text3Desc: "",
            text4Title: "",
            text4Desc: "",
            text5Title: "",
            text5Desc: "",
            text6Title: "",
            text6Desc: "",
            text7Title: "",
            text7Desc: "",
            googleTitle:
              "Algorytm TikToka - pełny przewodnik po strategiach dla twórców",
            googleDescription:
              "Sprawdź, jak działa algorytm TikToka i jak go wykorzystać do rozwinięcia strategii twórczej.",
            googleKeywords:
              "algorytm TikTok, strategie twórców TikTok, rozwój profilu TikTok",
            url: "algorytm-tiktoka-strategie",
            urlLabel: "Dowiedz się więcej o algorytmie TikToka",
            category: "Social Media",
            tags: "TikTok,algorytm,strategie,twórców,media społecznościowe",
          },
        ],
        properties: {
          response: {
            title: "string",
            shortDesc: "string",
            text1Title: "string",
            text1Desc: "string",
            text2Title: "string",
            text2Desc: "string",
            text3Title: "string",
            text3Desc: "string",
            text4Title: "string",
            text4Desc: "string",
            text5Title: "string",
            text5Desc: "string",
            text6Title: "string",
            text6Desc: "string",
            text7Title: "string",
            text7Desc: "string",
            googleTitle: "string",
            googleDescription: "string",
            googleKeywords: "string",
            url: "string",
            urlLabel: "string",
            category: "string",
            tags: "string",
          },
        },
        schema: {
          additionalProperties: true,
          type: "object",
          properties: {
            response: {
              type: "object",
            },
          },
          required: [
            "title",
            "shortDesc",
            "text1Title",
            "text1Desc",
            "text2Title",
            "text2Desc",
            "text3Title",
            "text3Desc",
            "text4Title",
            "text4Desc",
            "text5Title",
            "text5Desc",
            "text6Title",
            "text6Desc",
            "text7Title",
            "text7Desc",
            "googleTitle",
            "googleDescription",
            "googleKeywords",
            "url",
            "urlLabel",
            "category",
            "tags",
          ],
        },
      },
    }
  );

  return NextResponse.json(response.content);
}
