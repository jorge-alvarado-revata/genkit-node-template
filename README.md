# genkit-node-template

**another genkit node template example**


Hello everyone, this a another basic example of node with Genkit.

This example is based from https://firebase.google.com/docs/genkit/deploy-node with a plus:

1. tsconfig.json compatible with node 20+
2. require a .env file for configuration
2. vscode launch.json configure with "npx genkit start -- tsx --env-file=.env --watch src/index.ts"
3. a model schema.ts for input and output zod object.
4. Code for check validation input and output with zod schemas, important for call a genkit endpoint as a REST API.
5. Dockerfile for testing or deploy.


**Important Notes:**


1. After clone create .env file for :

- GOOGLE_GENAI_API_KEY="your GOOGLE GENAI API KEY"
- PORT="your services port"


 2. If you are using Genkit UI console, consider the input structure in json format directly. Like in the following example:

    In section Flows, Input(JSON) form field:

    Insert a json input equivalent to input zod input object schema.
        
        {
            "name": "lua"
        }

        

    The response is a json equivalent to zod output object schema.

        
        {
        "firstName": "John",
        "lastName": "Smith",
        "age": 25
        }

        

 3. If you are using another client like Postman or Thunder, consider the input with the following structure.
 
        
        {
        "data":{
            "name":"lua"
            } 
        }
        

    Where **data** is the name of parameter for async function.


        {

          "result": {
                    "firstName": "John",
                    "lastName": "Smith",
                    "age": 25
                    }
        }


4. For Docker run, include **.env** file in command line

docker build -t genkit-node-template .


docker run --name genkit-node-template --env-file .env -p **4002:4002** -d genkit-node-template

Consider the number port include in .env file.
