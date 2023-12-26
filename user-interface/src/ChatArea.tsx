import { useState } from "react"
import { Card } from "./components/Card"

export const ChatArea = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const loadingText = 'Querying the model. Please be patient this may take a while.';

    const onSubmit = () => {
        //set load
        setIsLoading(true)

        //refresh 
        const currentInput = input;
        setInput('');
        
        //make api call

        // remove load display response or error code

    }

return (
    <section>
        <Card>
    <textarea aria-label="Type your prompt here." value={input} onChange={(e) => setInput(e.target.value)}></textarea>
    <button onClick={() => onSubmit()}>Submit your prompt</button>
    </Card>

    <Card>
    <p aria-label="Chat response">{isLoading ? loadingText : output}</p>
    </Card>
    </section>
)
}