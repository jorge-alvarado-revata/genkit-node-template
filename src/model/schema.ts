import { z } from 'genkit';

//query for a programming language history

export const QueryIn = z.object({
    name: z.string()
  });


// response for a programming language history
  
export const ResponseOut = z.object({
    year_creation: z.string(),
    description: z.string(),
    creators: z.array(z.string()),
    keywords: z.array(z.string()),
    paradigms: z.array(z.string()),
    pros: z.array(z.string()),
    cons: z.array(z.string())
  });