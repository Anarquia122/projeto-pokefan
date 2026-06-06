import { OpenRouter } from '@openrouter/sdk'
import { config, type ModelConfig } from './config'

export type LLMResponse = {
    model: string;
    content: string;
}

export class OpenRouterService {
    private client: OpenRouter
    private config: ModelConfig
    constructor(configOverride?: ModelConfig) {
        this.config = configOverride ?? config

        this.client = new OpenRouter({
            apiKey: config.apiKey,
            httpReferer: config.httpReferer,
            appTitle: config.xTitle,
        })
    }

    async generate(prompt: string): Promise<LLMResponse> {
        // Simple routing logic based on sort preference
        let selectedModel = this.config.models[0]; // default

        if (this.config.provider.sort.by === 'price') {
            // Route to cheapest model (this is a mock - in real implementation you'd query available models)
            selectedModel = config.models[0];
        } else if (this.config.provider.sort.by === 'throughput') {
            // Route to highest throughput model
            selectedModel = 'openai/gpt-oss-20b:free';
        }

        const response = await this.client.chat.send({
            chatRequest: {
                model: selectedModel,
                messages: [
                    { role: 'system', content: this.config.systemPrompt },
                    { role: 'user', content: prompt }
                ],
                temperature: this.config.temperature,
                maxTokens: this.config.maxTokens,
            }
        })

        const content = response.choices?.at(0)?.message?.content || '';

        console.log('response from OpenRouter: ', content);

        return {
            model: response.model || selectedModel,
            content: String(content),
        }
    }
}