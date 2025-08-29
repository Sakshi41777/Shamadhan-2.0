import React, { useState } from "react";

function Day7Task() {
  // Counter state
  const [count, setCount] = useState(0);

  // Text state
  const [text, setText] = useState("");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Day 7 Task</h2>

      {/* Counter */}
      <h3>Counter</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
      <button onClick={() => setCount(count - 1)}>Decrease</button>
      <button onClick={() => setCount(0)}>Reset</button>

      <hr />

      {/* Live Text Preview */}
      <h3>Live Text Preview</h3>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <p>You typed: <strong>{text}</strong></p>
    </div>
  );
}

export default Day7Task;