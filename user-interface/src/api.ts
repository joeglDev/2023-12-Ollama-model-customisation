interface GetChatCompletionRequest {
  model: string;
  prompt: string;
  stream: boolean;
}

export const getChatCompletion = async (prompt: string, model: string) => {
  // generate request body
  const req: GetChatCompletionRequest = {
    model,
    prompt,
    stream: false,
  };
  // api request
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
    console.log(`Unexpected error: ${error}`);
  }
};
