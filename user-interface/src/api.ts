interface GetChatCompletionRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

interface ReadableStream<R = any> {
  [Symbol.asyncIterator](): AsyncIterableIterator<R>;
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
