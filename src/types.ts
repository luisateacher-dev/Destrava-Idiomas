export interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  summary: string;
  sections: {
    title: string;
    paragraphs: string[];
    exercise?: {
      title: string;
      description: string;
      steps: string[];
    };
  }[];
}

export interface AudioTrack {
  id: string;
  title: string;
  duration: string;
  seconds: number;
  description: string;
}

export interface DayPlan {
  day: number;
  title: string;
  description: string;
  action: string;
  task: string;
}

export interface CheatSheetWord {
  phrase: string;
  meaning: string;
  pronunciationHint: string;
  category: "fluxo" | "bloqueio" | "resposta-rapida" | "perguntas";
  example: string;
  exampleMeaning: string;
}
