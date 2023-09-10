import { useEffect, useRef, useState } from "react";
import { animateTo } from "../../utilities/animateTo";

const Chat = ({ sendMessage }: { sendMessage: (message: string) => void }) => {
  const [inputContent, setInputContent] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const { scrollHeight } = textAreaRef.current;
    const { clientHeight } = textAreaRef.current;
    const chatContainer = document.querySelector(".footer") as HTMLDivElement;
    const body = document.querySelector("body");
    //in order to allow the container maximum the height and not scroll in textarae
    if (scrollHeight > clientHeight) {
      chatContainer.style.setProperty("--footer-height", `${scrollHeight}px`);
      body.style.setProperty("--footer-height", `${scrollHeight}px`);
    }
    if (inputContent === "") {
      chatContainer.style.setProperty("--footer-height", `40px`);
      body.style.setProperty("--footer-height", `40px`);
    }
  }, [inputContent]);

  return (
    <div className="chatContainer">
      <div className="chatContainer__content">
        <div className="chatContainer__input">
          <textarea
            ref={textAreaRef}
            value={inputContent}
            className="chatContainer__input__textarea"
            onInput={(e) => setInputContent(e.currentTarget.value)}
          ></textarea>
          <button
            className="chatContainer__input__button"
            onClick={() => {
              sendMessage(inputContent);
              setTimeout(() => setInputContent(""), 400);
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
