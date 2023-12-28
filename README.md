# 2023-12-Ollama-model-customisation

This repository holds various customisations and files supporting my investigation of the Ollama-based open-source Large Language Models (LLMs).

## Parameters

- Distribution system: [Ollama](https://github.com/jmorganca/ollama)
- Current model: Mistal 7B

## Model Files

### Wise ancient
- Purpose: To provide answers referencing history, philosophy and theology in a semi-cryptic manner. Think a wizard consulting a bound demon for hidden wisdoms.

### Deep engineer
- Purpose: To provide knowledge on practical sciences and engineering. Lacks knowledge of the arts and humanities.
- Problems: Still answers arts questions.

### Dragon
- Purpose: A mythological western dragon. Should answer in a non-human manner of speech.

### Amadeus
- Purpose: Expert scientist. To provide consul on scientific matters.

## Start guide

1. Follow the [Ollama](https://github.com/jmorganca/ollama) quick start guide to set up Ollama. In brief:
- Download ollama (linux): `curl https://ollama.ai/install.sh | sh`
- Pull your model: `ollama pull mistral`

2. Create custom model files:
`
touch modelFileName.txt
open modelFileName.txt
`

- Copy text into model file from repo model files.
- Create model file: `ollama create -f ./pathToModelFile.txt`

3. Run the model in command line: 
- `ollama run model`

4. To run in UI:
- cd into UI directory: `cd ./user-interface`
- Install UI dependencies: `npm i`
- Run the UI in dev mode: `npm run dev`