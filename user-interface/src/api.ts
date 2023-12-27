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
    console.log(`Unexpected error: ${error}`);
  }
};

export const getChatCompletionWithStream = async (prompt: string, model: string) => {
    // generate request body
    const req: GetChatCompletionRequest = {
      model,
      prompt,
      stream: true,
    };

    return fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    }) 
    // .then(response => response.json())
    .then((data) => {
      console.log(data.body)
      const stream = data.body
      console.log('stream', stream)
      return stream
      })
    .catch(error => console.error('Error:', error));
  
}
