import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");
  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY!,
    model: "gpt-4o-mini",
  });
  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Generujesz SEO dla posta na bloga na temat ${topic}. Generuj tylko tytuł, krótki opis, SEO dane, URL i tagi.`,
    {
      expect: {
        examples: [
          {
            title: "Jak algorytm TikToka może zmienić strategię twórców",
            shortDesc:
              "Poznaj zaawansowane metody, które umożliwiają dotarcie do większej liczby odbiorców na TikToku.",
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
