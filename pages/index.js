import useLLM from "usellm";
import { useState } from "react";

export default function Demo() {
  const llm = useLLM({ serviceUrl: "https://usellm.org/api/llm" });
  const [result, setResult] = useState("");
  const [message, setMessage] = useState(null);

  async function handleClick(e) {
    e.preventDefault();
    try {
      console.log(e.target.message.value);
      await llm.chat({
        messages: [{ role: "user", content: e.target.message.value }],
        stream: true,
        onStream: ({ message }) => setResult(message.content),
      });
    } catch (error) {
      console.error("Something went wrong!", error);
    }
  }
  return (
    <div>
      <form onSubmit={handleClick}>
        <input name="message" placeholder="Escribe aqui el mensaje"></input>
        <button type="submit">Send</button>
      </form>
      <div style={{ whiteSpace: "pre-wrap" }}>{result}</div>
    </div>
  );
}