import { useState } from "react";
import { Card } from "./components/Card";
import { getChatCompletionWithStream } from "./api";
import { ModelSelect } from "./components/ModelSelect";

export const ChatArea = () => {
  const modelOptions = ["mistral", "wise-ancient", "deep-engineer", "dragon"];
  const loadingText =
    "Querying the model. Please be patient this may take a while.";

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState('');
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);

  const handleStreamedResponse = async (input: string) => {
    const decoder = new TextDecoder('utf-8');
    let output = ''; 

    const stream = await getChatCompletionWithStream(input, selectedModel);
    setIsLoading(false);

    for await (const chunk of stream!) {
      const decodedValue: any = JSON.parse(decoder.decode(chunk));
      output = output + decodedValue.response
      setChatResponse(output);
  }
}

  const onSubmit = async () => {
    // refresh 
    setIsLoading(true);
    const currentInput = input;

    // make api call
    handleStreamedResponse(currentInput);
  };

  return (
    <section>
      <h2>Chat here ^w^</h2>
      <Card>
        <textarea
          aria-label="Type your prompt here."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></textarea>
        <label htmlFor="model-select">Select a model:</label>
        <ModelSelect
          id="model-select"
          aria-label="select a model"
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {modelOptions.map((model) => (
            <option value={model}>{model}</option>
          ))}
        </ModelSelect>
        <button onClick={() => onSubmit()}>Submit your prompt</button>
      </Card>

      <h3>Response</h3>
      <Card>
        <p aria-label="Chat response" aria-live="assertive">
          {!isLoading ? chatResponse : loadingText}
        </p>
      </Card>
    </section>
  );
};
