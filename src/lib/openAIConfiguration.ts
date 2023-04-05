import { Configuration, OpenAIApi } from "openai";

const configuration = 
    import.meta.env.VITE_OPENAI_SECRET && import.meta.env.VITE_OPENAI_ORG
        ? new Configuration({
            organization: import.meta.env.VITE_OPENAI_ORG,
            apiKey: import.meta.env.VITE_OPENAI_SECRET
        })
        : null

if (configuration) {
    delete configuration.baseOptions.headers['User-Agent'];
}

const openAI = 
    configuration 
        ? new OpenAIApi(configuration)
        : null

export const getAIResponse = async (message: string) => {
    try {
        const response = await openAI?.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: `${message}`}]
        })

        if (!response?.data?.choices) return ""
        const responseMessage = response?.data?.choices[0].message?.content

        if (!responseMessage) return ""

        return responseMessage

    } catch (e) {
        console.log("Error on AI Response")
        console.error(e)
    }
}

