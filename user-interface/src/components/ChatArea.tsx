import { useEffect, useState } from "react";
import { Card } from "./styled-components/Card";
import { getChatCompletionWithStream } from "../api/apiModels";
import { ModelSelect } from "./styled-components/ModelSelect";
import { ChatResponseCard } from "./styled-components/Card";
import { PromptTextArea } from "./styled-components/PromptTextArea";
import { SubmitButton } from "./styled-components/SubmitButton";
import { getModelOptionsController } from "../api/apiControllers";
import { DropdownContainer } from "./styled-components/DropDownContainer";

interface DecodedStreamedResponse {
  model: string;
  created_at: string;
  response: string;
  done: boolean;
  context: number[];
  total_duration: number;
  load_duration: number;
  prompt_eval_count: number;
  prompt_eval_duration: number;
  eval_count: number;
  eval_duration: number;
 }

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

    const stream = await getChatCompletionWithStream(input, selectedModel) as unknown as NodeJS.ReadableStream;
    setIsLoading(false);

    for await (const chunk of stream) {
      if (typeof chunk !== 'string') {
        const decodedValue: DecodedStreamedResponse = JSON.parse(decoder.decode(chunk));
        output = output + decodedValue.response;
        setChatResponse(output);
      }   
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
