export type ModelConfig = {
  apiKey: string;
  httpReferer: string;
  xTitle: string;

  provider: {
    sort: {
      by: string;
      partition: string;
    };
  };

  models: string[];
  temperature: number;
  systemPrompt: string;
  maxTokens: number;
};

console.assert(process.env['OPENROUTER_API_KEY'], 'OPENROUTER_API_KEY is not set in environment variables');

export const config: ModelConfig = {
  apiKey: process.env['OPENROUTER_API_KEY'] || '',
  httpReferer: '',
  xTitle: 'Rotom Phone Chat',
  // dos modelos testados, o nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free é o mais rápido e que mantém uma boa qualidade de resposta, 
  // então é o único que está sendo usado aqui.
  models: [
    'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
  ],
  provider: {
    sort: {
      by: 'throughput', // Route to model with highest throughput (fastest response)
      partition: 'none',
    },
  },
  temperature: 0.7, 
  systemPrompt: `Você é o Rotom, o assistente virtual divertido, enérgico e prestativo do Rotom Phone do usuário. 
  Responda SEMPRE em português de forma curta, direta e natural, como se estivesse conversando em um aplicativo de mensagens (WhatsApp/Discord). 
  PROIBIDO: Não use tabelas, não use tópicos, não use listas estruturadas, não use divisórias (---) e evite respostas longas. 
  Fale como uma pessoa real conversando, usando parágrafos simples e diretos. Você pode usar emojis de vez em quando para parecer amigável.`,
  maxTokens: 250,
};
