import { Chapter, AudioTrack, DayPlan, CheatSheetWord } from "./types";

export const chaptersData: Chapter[] = [
  {
    id: "cap-01",
    number: "Capítulo 01",
    title: "Não é falta de capacidade",
    subtitle: "Entenda os dois tipos de bloqueio — na fala e na escuta.",
    summary: "Se você consegue ler e entender textos, mas congela na hora de produzir som, o problema é somático e comportamental, não cognitivo.",
    sections: [
      {
        title: "O Mito da Falta de Vocabulário",
        paragraphs: [
          "Quase todo estudante que 'trava' na hora de falar repete o mesmo mantra: 'Eu preciso de mais vocabulário'. Eles passam horas memorizando listas de verbos irregulares ou baixando pacotes de flashcards com palavras raras.",
          "Mas pense no seguinte: quando você trava, as palavras que somem não são termos intelectuais ou científicos. Elas são palavras simples como 'fazer', 'perguntar', 'encontrar' ou 'enviar'. Você SABE essas palavras. Se as visse escritas num papel, saberia a tradução em um milissegundo. Elas apenas não estão disponíveis sob pressão.",
          "O bloqueio real não é de conhecimento (sua mente não é vazia); é um bloqueio de acesso motor e de ansiedade performativa. Entender isso é o primeiro passo para parar de estudar gramática inútil e focar no que realmente destrava."
        ]
      },
      {
        title: "Os Dois Lados da Moeda: Bloqueio Ativo vs. Passivo",
        paragraphs: [
          "O bloqueio ocorre em duas frentes distintas. Na Fala (Bloqueio Ativo), você enfrenta o medo do julgamento alheio e o processo doloroso do 'perfeccionismo tradutor' — tentar montar a frase perfeita em português, traduzir mentalmente e só então mover os lábios.",
          "O Bloqueio Passivo ocorre na Escuta. É quando você está ouvindo perfeitamente até tropeçar em uma palavra desconhecida. Sua mente para ali para tentar decodificá-la. Em segundos, todo o resto da conversa continua sem você, e sua conclusão frustrada é: 'Eu não entendi nada!'."
        ],
        exercise: {
          title: "Exercício do Refrão Conectivo",
          description: "Aprenda a vocalizar o silêncio para ganhar tempo de rascunhar frases mentalmente.",
          steps: [
            "Escolha um tema trivial (Ex: seu prato de comida favorito).",
            "Grave-se no celular falando por 1 minuto sobre isso na língua alvo.",
            "Toda vez que hesitar, use um conectivo de hesitação (Ex: 'You know...', 'Let me see...', 'You see...'). Nunca caia no silêncio morto."
          ]
        }
      }
    ]
  },
  {
    id: "cap-02",
    number: "Capítulo 02",
    title: "Por que você trava",
    subtitle: "As quatro causas reais: medo, perfeccionismo, falta de treino e estudo estático.",
    summary: "As quatro forças invisíveis que constroem a muralha do silêncio no seu cérebro.",
    sections: [
      {
        title: "As Quatro Causas Reais",
        paragraphs: [
          "1. Medo de errar: Desde a escola, somos punidos quando erramos. Uma marca de caneta vermelha na prova criava humilhação. Mas no idioma real, o erro é o único caminho para calibração de pronúncia e cadência.",
          "2. Perfeccionismo compulsivo: Querer soar logo de cara como um nativo erudito. Você tenta usar construções complexas que nem no português usaria no dia a dia.",
          "3. Estudo passivo estático: Assistir séries com legenda e passar horas no Duolingo gera uma ilusão de aprendizado. Você está apenas reconhecendo padrões, e nunca produzindo impulsos de fala real.",
          "4. Treinamento inadequado de escuta: O hábito de precisar ler cada palavra para entender. Você falha porque seu ouvido não foi habituado com a fusão e redução nativa de sons."
        ]
      }
    ]
  },
  {
    id: "cap-03",
    number: "Capítulo 03",
    title: "As 5 regras do destrave",
    subtitle: "Princípios práticos para ignorar a perfeição e priorizar a conexão.",
    summary: "Como hackear o seu sistema de autodefesa para permitir o fluxo contínuo na fala.",
    sections: [
      {
        title: "As Regras de Ouro",
        paragraphs: [
          "Regra 1: Fale errado intencionalmente. Para perder o medo do erro, você precisa errar de propósito e perceber que o mundo não vai acabar e que as pessoas vão continuar te entendendo.",
          "Regra 2: Simplifique absolutamente tudo. Se não souber dizer 'Eu gostaria de agendar uma reunião', diga 'I want to talk'. O objetivo final é a troca de informações, não o prêmio Nobel de literatura.",
          "Regra 3: Repita frases completas de improviso, sintonizando ritmo e melodia ao invés de decorar regras de conjugação de verbos passados."
        ],
        exercise: {
          title: "A Técnica da Conversa Infantil",
          description: "Tente explicar conceitos complexos usando apenas o vocabulário de uma criança de 5 anos.",
          steps: [
            "Pense em um assunto difícil (Ex: Aquecimento global ou Economia de mercado).",
            "Tente descrevê-lo usando apenas termos extremamente simples (Ex: 'Sun makes ground too hot, bad for food').",
            "Sinta o alívio cognitivo de não precisar de termos técnicos."
          ]
        }
      }
    ]
  },
  {
    id: "cap-04",
    number: "Capítulo 04",
    title: "Ferramentas de destrave imediato",
    subtitle: "Estratégias para improvisação e gerenciamento de conversas reais.",
    summary: "Táticas de guerrilha linguística para carregar no bolso e usar em momentos de sufoco.",
    sections: [
      {
        title: "A Tabela de Frases Coringa",
        paragraphs: [
          "Frases coringa são estruturas flutuantes que se adaptam a qualquer situação. Elas dão tempo para sua mente respirar ou te salvam quando você não entende uma parte do que disseram.",
          "Em vez de apenas pedir desculpas e se encolher, você assume o papel de condutor da conversa. 'Could you rephrase that?' (Você poderia reformular isso?) é 10 vezes melhor do que 'I don't speak English'."
        ],
        exercise: {
          title: "A Técnica do Redirecionamento Estrela",
          description: "Como sair do escuro para uma zona segura.",
          steps: [
            "Quando te fizerem uma pergunta que você não saiba responder de imediato, responda com: 'That's an interesting question. Let me think.'",
            "Isso compra 5 segundos cruciais para o seu cérebro mapear o vocabulário e reduzir os níveis de cortisol."
          ]
        }
      }
    ]
  },
  {
    id: "cap-05",
    number: "Capítulo 05",
    title: "Plano de 7 dias",
    subtitle: "O cronograma definitivo para ir do congelamento total ao fluxo inicial.",
    summary: "Uma rotina rápida diária de 15 minutos focada na aceleração da fiação neural de fala ativa.",
    sections: [
      {
        title: "Segunda-feira a Domingo: A Jornada de 1 Semana",
        paragraphs: [
          "Não adianta estudar duas horas no sábado. Seu cérebro adquire fluência através do microtrabalho repetido diaramente.",
          "O plano de 7 dias foca em ações motoras diárias de baixo atrito. Você falará sozinho, fará imitações com áudios simples e criará diálogos mentais ativos enquanto toma banho ou arruma a casa."
        ]
      }
    ]
  },
  {
    id: "cap-06-07",
    number: "Capítulo 06 & 07",
    title: "Fechamento + Próximos passos",
    subtitle: "Consolidação e transição para o ambiente social real.",
    summary: "Seu passaporte para as primeiras conversas reais sem traidores emocionais internos.",
    sections: [
      {
        title: "Manutenção do Fluxo",
        paragraphs: [
          "Agora você tem o mapa e as ferramentas essenciais. Destravar é uma barreira de entrada: uma vez que você atravessa a primeira barreira e percebe que as pessoas respondem às suas frases imperfeitas, a ansiedade despenca.",
          "Nos próximos meses, foque em aumentar gradualmente a complexidade dos assuntos, mas nunca abra mão do pilar fundamental: Conexão SEMPRE precede Perfeição."
        ]
      }
    ]
  }
];

export const audioTracksData: AudioTrack[] = [
  {
    id: "track-1",
    title: "01. Introdução ao Método e Desconstrução do Medo",
    duration: "06:12",
    seconds: 372,
    description: "Por que falar errado de propósito é o catalisador que vai liberar sua fala em menos de 24 horas."
  },
  {
    id: "track-2",
    title: "02. Superando o Bloqueio de Escuta (Audição Tolerante)",
    duration: "08:45",
    seconds: 525,
    description: "Como treinar seu cérebro para preencher lacunas de palavras desconhecidas sem paralisar o processo."
  },
  {
    id: "track-3",
    title: "03. Técnica Shadowing & Aceleração de Pronúncia",
    duration: "05:50",
    seconds: 350,
    description: "Siga o tom de voz e ritmo do orador imediatamente. Exercícios mecânicos para soltar os músculos da face."
  },
  {
    id: "track-4",
    title: "04. Prática Diária: Mantendo a Consistência Sem Sofrer",
    duration: "06:23",
    seconds: 383,
    description: "Como encaixar o plano de 7 dias na sua rotina corrida, aproveitando janelas de tempo ocioso."
  }
];

export const dayPlansData: DayPlan[] = [
  {
    day: 1,
    title: "O Choque do Silêncio",
    description: "Dia de romper a barreira do som no seu isolamento de estudo.",
    action: "Fale em voz alta tudo o que você está fazendo no quarto em inglês/espanhol por 5 minutos.",
    task: "Falar sozinho narrando suas ações cotidianas ('I am walking near the door. Cold water.')"
  },
  {
    day: 2,
    title: "O Padrão Troll",
    description: "Perder o medo da pronúncia exata intencionalmente.",
    action: "Grave e envie um áudio simples de 30 segundos falando com sotaque absurdamente grosseiro e exagerado.",
    task: "Grave uma frase simples esticando as vogais e rindo do próprio som para dessensibilizar a vergonha do erro."
  },
  {
    day: 3,
    title: "Técnica das 30 Palavras",
    description: "Expressar ideias complexas com limitações severas de vocabulário.",
    action: "Explique o que é uma 'geladeira' em inglês sem poder usar a palavra 'refrigerator' ou 'fridge'.",
    task: "Restrinja-se a termos fáceis: 'Box for kitchen, food stay inside, cold water, very ice'."
  },
  {
    day: 4,
    title: "Ritmo sobre Vocábulos",
    description: "Treinar a pulsação e melodia das palavras.",
    action: "Escolha qualquer áudio nativo de 10 segundos e imite-o como se fosse uma canção, prestando atenção apenas na música da frase.",
    task: "Fazer o exercício de Shadowing 5 vezes seguidas ignorando o significado exato de cada palavra."
  },
  {
    day: 5,
    title: "O Conector Mágico",
    description: "Incorporar frases curinga para ganhar tempo neurológico.",
    action: "Se force a introduzir um dos conectores ('Actually', 'Well, let me think about', 'To be honest') antes de qualquer resposta no espelho.",
    task: "Praticar 10 respostas rápidas usando conectores de hesitação naturais."
  },
  {
    day: 6,
    title: "Simulação de Crise",
    description: "Lidar com o inesperado sem congelar.",
    action: "Improvisar o que você diria num restaurante se seu prato viesse com um inseto e você esquecesse o nome do inseto.",
    task: "Desenhar a frase de sobrevivência usando gestos/palavras genéricas ('Excuse me, my food has a little bad black thing here')."
  },
  {
    day: 7,
    title: "Primeira Ponte",
    description: "Consolidar a vitória e fazer do hábito um amigo do peito.",
    action: "Marque um compromisso com você mesmo para ler a Tabela Coringa de manhã e ouvir uma trilha em áudio à noite.",
    task: "Finalizar o plano de 7 dias compartilhando seu progresso e baixando o certificado simbólico."
  }
];

export const cheatSheetWordsData: CheatSheetWord[] = [
  {
    phrase: "Let me think about it for a second...",
    meaning: "Deixe-me pensar sobre isso por um segundo...",
    pronunciationHint: "lét mi fink abáut ít fór a sé-kãnd",
    category: "fluxo",
    example: "Let me think about it for a second, I need to remember the name.",
    exampleMeaning: "Deixe-me pensar um segundo, preciso lembrar o nome."
  },
  {
    phrase: "I'm not sure if I follow you, could you repeat?",
    meaning: "Não tenho certeza se estou te acompanhando, poderia repetir?",
    pronunciationHint: "aim nót cúr íf ai fólou iú, cúdjú rí-pit?",
    category: "bloqueio",
    example: "I'm not sure if I follow you, could you repeat that last part?",
    exampleMeaning: "Não tenho certeza se entendi, você poderia repetir essa última parte?"
  },
  {
    phrase: "What I'm trying to say is that...",
    meaning: "O que eu estou tentando dizer é que...",
    pronunciationHint: "uót ai em trá-in tu sêi ís dét...",
    category: "fluxo",
    example: "What I'm trying to say is that we need to start simple.",
    exampleMeaning: "O que estou de fato tentando dizer é que precisamos começar de forma simples."
  },
  {
    phrase: "How do you say [word] in English?",
    meaning: "Como se diz [palavra] em inglês?",
    pronunciationHint: "ráu du iú sêi [word] ín ín-glic?",
    category: "resposta-rapida",
    example: "How do you say 'garfo' in English? Ah, fork!",
    exampleMeaning: "Como se diz 'garfo' em inglês? Ah, fork!"
  },
  {
    phrase: "Wait, the word is on the tip of my tongue...",
    meaning: "Espere, a palavra está na ponta da minha língua...",
    pronunciationHint: "uêit, dã uõrd ís ón dã tí-p óv mai tâng...",
    category: "bloqueio",
    example: "Wait, the word is on the tip of my tongue... Ah, schedule!",
    exampleMeaning: "Espera, a palavra tá na ponta da minha língua... Ah, cronograma!"
  },
  {
    phrase: "Could you rephrase that in a simpler way, please?",
    meaning: "Poderia dizer isso de forma mais simples, por favor?",
    pronunciationHint: "cúdjú rí-freiz dét ín a sím-plér uêi, plíz?",
    category: "bloqueio",
    example: "I'm beginner. Could you rephrase that in a simpler way?",
    exampleMeaning: "Sou iniciante. Você poderia reformular isso de um jeito mais simples?"
  },
  {
    phrase: "Actually, it is more like...",
    meaning: "Na verdade, é mais parecido com...",
    pronunciationHint: "ék-tchuã-li, ít ís mór láik...",
    category: "fluxo",
    example: "Actually, it is more like a work meeting, not a party.",
    exampleMeaning: "Na verdade, se parece mais com uma reunião de trabalho, não uma festa."
  },
  {
    phrase: "That makes sense to me.",
    meaning: "Isso faz sentido para mim.",
    pronunciationHint: "dét mêiks séns tu mí",
    category: "resposta-rapida",
    example: "Oh, ok! That makes total sense to me now.",
    exampleMeaning: "Ah, ok! Isso faz total sentido pra mim agora."
  }
];
