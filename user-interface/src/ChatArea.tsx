import { useEffect, useState } from "react";
import { Card, ChatResponseCard } from "./components/Card";
import { getChatCompletionWithStream } from "./api";
import { ModelSelect } from "./components/ModelSelect";
import { PromptTextArea } from "./components/styled-components/PromptTextArea";
import { SubmitButton } from "./components/styled-components/SubmitButton";
import { DropdownContainer } from "./components/styled-components/DropDownContainer";
import { getModelOptionsController } from "./apiCotrollers";

interface ModelDefinitions {
  name: string;
  value: string;
}

export const ChatArea = () => {
  const [modelOptionsFromRemote, setModelOptionsFromRemote] = useState<ModelDefinitions[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [selectedModel, setSelectedModel] = useState('mistral');
  const loadingText =
  "Querying the model. Please be patient this may take a while.";

  const handleStreamedResponse = async (input: string) => {
    const decoder = new TextDecoder("utf-8");
    let output = "";

    const stream = await getChatCompletionWithStream(input, selectedModel);
    setIsLoading(false);

    // TODO: fix any type
    for await (const chunk of stream) {
      const decodedValue: any = JSON.parse(decoder.decode(chunk));
      output = output + decodedValue.response;
      setChatResponse(output);
    }
  };

  const onSubmit = async () => {
    // refresh
    setIsLoading(true);
    const currentInput = input;

    // make api call
    handleStreamedResponse(currentInput);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getModelOptionsController();
      if (data) {setModelOptionsFromRemote(data)};
    };
 
    fetchData();
  }, []);

  return (
    <section>

      <ChatResponseCard>
        <p aria-label="Chat response" aria-live="assertive">
          {!isLoading ? chatResponse : loadingText}
        </p>
      </ChatResponseCard>

      <Card>
        <PromptTextArea
         placeholder="Type your prompt here..."
          aria-label="Type your prompt here."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        ></PromptTextArea>
        <DropdownContainer>
        <ModelSelect
          aria-label="select a model from the dropdown"
          onChange={(e) => setSelectedModel(e.target.value)}
        >
          {modelOptionsFromRemote.map((model) => (
            <option value={model.value}>{model.name}</option>
          ))}
        </ModelSelect>
        </DropdownContainer>
        <SubmitButton onClick={() => onSubmit()}>Submit your prompt</SubmitButton>
      </Card>

    </section>
  );
};
