import { NextRequest, NextResponse } from "next/server";
import { createChat } from "completions";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");
  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "OpenAI API key not configured" },
      { status: 500 }
    );
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
  });
  try {
    await chat.sendMessage("Ping");
    const response = await chat.sendMessage(
      `Generujesz SEO dla posta na bloga na temat ${topic}. Generuj tylko tytuł, krótki opis, SEO dane, URL i tagi.`,
      {
        expect: {
          examples: [
            {
              title:
                "Poczucie własnej wartości – jak je zbudować, a nie tylko „mieć”?",
              shortDesc:
                "Nie rodzimy się z pewnością siebie – można ją wypracować. Zobacz jak.",
              googleTitle:
                "Jak budować poczucie własnej wartości – praktyczne wskazówki",
              googleDescription:
                "Dowiedz się, co naprawdę wpływa na poczucie własnej wartości i jak przestać się porównywać.",
              googleKeywords:
                "poczucie własnej wartości, pewność siebie, rozwój osobisty",
              url: "poczucie-wlasnej-wartosci-jak-budowac",
              urlLabel: "Przeczytaj, jak rozwijać własną wartość bez ściemy",
              category: "Psychologia",
              tags: "pewność siebie,wartość,rozwój,porównywanie,samoakceptacja",
            },
            {
              title: "Dlaczego nawyki są ważniejsze niż motywacja?",
              shortDesc:
                "Motywacja jest fajna, ale nie można na niej polegać. Nawyki rządzą – i zaraz Ci to pokażę.",
              googleTitle: "Budowanie nawyków – sposób na trwałą zmianę",
              googleDescription:
                "Zobacz, jak małe działania codzienne tworzą wielkie efekty. Bez presji i bez magii.",
              googleKeywords:
                "nawyki, budowanie nawyków, rozwój osobisty, motywacja",
              url: "dlaczego-nawyki-sa-wazne",
              urlLabel: "Przeczytaj o sile codziennych nawyków",
              category: "Styl życia",
              tags: "nawyki,zmiana,motywacja,produktywność,rozwój",
            },
            {
              title: "Asertywność – czyli jak mówić „nie” bez dramatu",
              shortDesc:
                "Nie musisz być niemiły, żeby być asertywny. Sprawdź, jak stawiać granice bez wyrzutów sumienia.",
              googleTitle:
                "Asertywność w praktyce – mów „nie” i nie czuj się winny",
              googleDescription:
                "Dowiedz się, jak budować asertywność na co dzień i dlaczego warto zacząć od... siebie.",
              googleKeywords:
                "asertywność, komunikacja, granice, rozwój osobisty",
              url: "asertywnosc-bez-stresu",
              urlLabel: "Zobacz, jak być asertywnym i spokojnym",
              category: "Relacje",
              tags: "asertywność,granice,komunikacja,pewność siebie,psychologia",
            },
            {
              title:
                "Prokrastynacja – dlaczego znowu nie zrobiłeś tego, co miałeś zrobić?",
              shortDesc:
                "Zrozum mechanizmy odkładania na później i dowiedz się, jak ruszyć z miejsca (bez presji).",
              googleTitle: "Prokrastynacja – jak ją pokonać bez poczucia winy?",
              googleDescription:
                "Odkryj, skąd się bierze prokrastynacja i poznaj sposoby, które działają także wtedy, gdy nie masz motywacji.",
              googleKeywords:
                "prokrastynacja, odkładanie, zarządzanie czasem, brak motywacji",
              url: "prokrastynacja-jak-sobie-poradzic",
              urlLabel: "Przeczytaj, jak pokonać prokrastynację",
              category: "Psychologia",
              tags: "prokrastynacja,czas,motywacja,produktywność,rozwoj",
            },
          ],
          properties: {
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
          schema: {
            additionalProperties: true,
            type: "object",
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
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      {
        error: "Failed to generate blog post",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
