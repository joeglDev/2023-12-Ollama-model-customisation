interface GetChatCompletionRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

interface ReadableStream<R = any> {
  [Symbol.asyncIterator](): AsyncIterableIterator<R>;
}

interface ModelDetails {
  format: string;
  family: string;
  families?: string[];
  parameter_size: string;
  quantization_level: string;
 }
 
 interface Model {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details: ModelDetails;
 }
 
 interface GetModelsResponse{
  models: Model[];
 }

export const getChatCompletion = async (prompt: string, model: string) => {
  // generate request body
  const req: GetChatCompletionRequest = {
    model,
    prompt,
    stream: true,
  };

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    const result = await res.json();

    return result;
  } catch (error) {
    throw Error(`Unexpected error: ${error}`);
  }
};

export const getChatCompletionWithStream = async (
  prompt: string,
  model: string,
) => {
  // generate request body
  const req: GetChatCompletionRequest = {
    model,
    prompt,
    stream: true,
  };

  try {
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (res.body) {
      return res.body as unknown as ReadableStream;
    } else {
      throw Error("Response is null.");
    }
  } catch (error) {
    throw Error(`Unexpected error: ${error}`);
  }
};

export const getModelOptions = async () => {
  try {
    const response = await fetch('http://localhost:11434/api/tags');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data: GetModelsResponse = await response.json();
    return data
  } catch (error) {
    console.error('Error:', error);
  }
}