import { genkit, z } from 'genkit';
import { googleAI, gemini20Flash } from '@genkit-ai/googleai';
import { QueryIn, ResponseOut } from './model/schema.js';
import { startFlowServer  } from '@genkit-ai/express';

import dotenv from "dotenv";

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

dotenv.config()
const PORT = process.env.PORT;

console.log('Server running in port:', PORT);

const programmingFlow = ai.defineFlow(
  {
    name: 'programmingFlow',
    inputSchema: QueryIn,
    outputSchema: ResponseOut,
  },
  async (data): Promise<any> => {

    try{

        const parsedInput = QueryIn.parse(data);

        const { text } = await ai.generate({
            model:gemini20Flash,
            system: 'You are an expert on history of computer science and programming languages.',
            prompt:`Response a shortly history of a programming language with name ${parsedInput.name}, include in the description, year of creation, principal keywords, paradigms, pros and cons. 
            Response with schema from output.`,
            config: {
                maxOutputTokens: 800,
                stopSequences: ['<end>', '<fin>'],
                temperature: 1.0,
                topP: 0.4,
                topK: 10,
              },
            output:{ 
                format: 'json',
                schema: ResponseOut
            }
        });
    
        if (!text) {
            throw new Error('No data generated.');
        };
    
        const value = ResponseOut.parse(JSON.parse(text));

        return value;
  

    }
    catch(error){

        if (error instanceof z.ZodError){
            for(const issue of error.issues){
              console.error("Validation failed: ", issue.message);
            }
          }
          else {
            console.error("Unexpected error: ", error);
          }

    }


  }
);

startFlowServer({
  flows: [programmingFlow],
});