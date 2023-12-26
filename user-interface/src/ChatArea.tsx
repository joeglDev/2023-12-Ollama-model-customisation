import { useState } from "react"
import { Card } from "./components/Card"
import { getChatCompletion } from "./api";

export const ChatArea = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const loadingText = 'Querying the model. Please be patient this may take a while.';

    const onSubmit = async () => {
        setIsLoading(true)

        // refresh input
        const currentInput = input;
        setInput('');
        
        // make api call
        const rawResponse = await getChatCompletion(currentInput);

        // remove load display response or error code
        if (rawResponse.response) {
            setOutput(rawResponse.response)
            setIsLoading(false);
        }

    }

return (
    <section>
        <Card>
    <textarea aria-label="Type your prompt here." value={input} onChange={(e) => setInput(e.target.value)}></textarea>
    <button onClick={() => onSubmit()}>Submit your prompt</button>
    </Card>

    <Card>
    <p aria-label="Chat response" aria-live="assertive">{isLoading ? loadingText : output}</p>
    </Card>
    </section>
)
}