import { useState } from "react";
import { Card } from "./components/Card";
import { getChatCompletion } from "./api";
import { ModelSelect } from "./components/ModelSelect";

export const ChatArea = () => {
  const modelOptions = ["mistral", "wise-ancient", "deep-engineer", "dragon"];
  const loadingText =
    "Querying the model. Please be patient this may take a while.";

  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);

  const onSubmit = async () => {
    setIsLoading(true);

    // refresh input
    const currentInput = input;
    // setInput('');

    // make api call
    const rawResponse = await getChatCompletion(currentInput, selectedModel);

    // remove load display response or error code
    if (rawResponse.response) {
      setOutput(rawResponse.response);
      setIsLoading(false);
    }
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
          {isLoading ? loadingText : output}
        </p>
      </Card>
    </section>
  );
};
