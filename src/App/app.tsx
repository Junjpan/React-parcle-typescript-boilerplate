import { useRef, useState, useEffect } from "react";
import { animateTo } from "./utilities/animateTo";
import Chat from "./components/chat/Chat";

const App = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const outPutRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        //if a new node is added, the new node will scroll up and the parent node will also do transform position
        if (mutation.type === "childList") {
          const newNode = outPutRef.current.firstChild;

          if (newNode instanceof HTMLElement) {
            animateTo(
              newNode,
              [
                { opacity: 0, transform: `translateY(10px)` },
                { opacity: 1, transform: `translateY(0px)` },
              ],
              {
                duration: 500,
                easing: "ease-out",
              }
            );

            animateTo(
              outPutRef.current,
              [
                { transform: `translateY(10px)` },
                { transform: `translateY(0px)` },
              ],
              {
                duration: 600,
                easing: "ease-in",
              }
            );
          }

          outPutRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    };

    const mutationObserver = new MutationObserver(callback);
    //check if new text is added
    mutationObserver.observe(outPutRef.current, {
      childList: true,
    });
    return () => {
      mutationObserver.disconnect();
    };
  }, []);

  const sendMessage = (msg: string) => {
    setMessages((pre) => [msg, ...pre]);
  };

  return (
    <div className="container">
      <div className="container__output" ref={outPutRef}>
        {messages.map((msg, i) => {
          return (
            <div key={i} className="chatBubble">
              {msg}
            </div>
          );
        })}
      </div>
      <div className="footer" ref={footerRef}>
        <Chat {...{ sendMessage }} />
      </div>
    </div>
  );
};

export default App;
