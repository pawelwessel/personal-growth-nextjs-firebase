import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const topic = req.nextUrl.searchParams.get("topic");

  if (!topic) {
    return NextResponse.json({ error: "Topic is required" }, { status: 400 });
  }

  try {
    // For now, we'll return a mock response since we don't have the AI integration set up
    // In a real implementation, you would integrate with an AI service like OpenAI
    const mockResponse = {
      title: `Przewodnik po ${topic}`,
      shortDesc: `Kompleksowy przewodnik dotyczący ${topic} - wszystko co musisz wiedzieć`,
      text1Title: "Wprowadzenie",
      text1Desc: `W dzisiejszym świecie ${topic} odgrywa kluczową rolę w naszym życiu. W tym artykule przyjrzymy się najważniejszym aspektom tego tematu i dowiemy się, jak możemy go lepiej zrozumieć i wykorzystać.`,
      text2Title: "Podstawy",
      text2Desc: `Aby w pełni zrozumieć ${topic}, musimy poznać jego podstawy. To fundament, na którym opierają się wszystkie zaawansowane koncepcje i praktyczne zastosowania.`,
      text3Title: "Praktyczne zastosowania",
      text3Desc: `Wiedza teoretyczna to tylko początek. Prawdziwa wartość ${topic} ujawnia się w praktycznych zastosowaniach. Sprawdź, jak możesz wykorzystać te informacje w swoim życiu.`,
      text4Title: "Zaawansowane techniki",
      text4Desc: `Dla tych, którzy opanowali podstawy, przygotowaliśmy sekcję o zaawansowanych technikach związanych z ${topic}. To poziom ekspercki, który pozwoli Ci wyróżnić się w tej dziedzinie.`,
      text5Title: "Analiza i wnioski",
      text5Desc: `Na podstawie przedstawionych informacji możemy wyciągnąć ważne wnioski dotyczące ${topic}. Ta analiza pomoże Ci lepiej zrozumieć przyszłe trendy i możliwości.`,
      text6Title: "Przyszłość",
      text6Desc: `Jak będzie wyglądać przyszłość ${topic}? W tej sekcji przyglądamy się trendom i przewidywaniom ekspertów, aby przygotować Cię na nadchodzące zmiany.`,
      text7Title: "Podsumowanie",
      text7Desc: `Podsumowując, ${topic} to obszar, który wymaga ciągłego uczenia się i adaptacji. Mamy nadzieję, że ten artykuł pomógł Ci lepiej zrozumieć ten temat i zainspirował do dalszego rozwoju.`,
      googleTitle: `${topic} - kompletny przewodnik`,
      googleDescription: `Poznaj wszystko o ${topic} - od podstaw po zaawansowane techniki. Praktyczny przewodnik z przykładami i wskazówkami.`,
      googleKeywords: `${topic}, przewodnik, techniki, praktyczne zastosowania`,
      url: `${topic.toLowerCase().replace(/\s+/g, "-")}`,
      urlLabel: `Dowiedz się więcej o ${topic}`,
      category: "Rozwój osobisty",
      tags: `${topic},przewodnik,techniki,rozwój`,
    };

    return NextResponse.json(mockResponse);
  } catch (error) {
    console.error("Error generating blog post:", error);
    return NextResponse.json(
      { error: "Failed to generate blog post" },
      { status: 500 }
    );
  }
}
