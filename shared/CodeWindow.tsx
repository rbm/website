import SyntaxHighlighter from "react-syntax-highlighter";
import styled from "@emotion/styled";
import {
  atomOneLight as syntaxThemeLight,
  atomOneDark as syntaxThemeDark,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";

const removeLeadingSpaces = (snippet: string): string => {
  const lines = snippet.split("\n");
  if (!lines[0].replace(/^\s+/, "").length) {
    lines.shift();
  }
  if (!lines[lines.length - 1].replace(/^\s+/, "").length) {
    lines.pop();
  }
  const leadingSpace = lines[0].match(/^\s+/)?.[0];
  return lines.map((l) => l.replace(leadingSpace, "")).join("\n");
};

const CodeWindow = ({
  snippet,
  className = "",
  filename = "",
  theme = "light",
  type = "editor",
}: {
  snippet: string;
  className?: string;
  filename?: string;
  theme?: "light" | "dark";
  type?: "editor" | "terminal";
}) => {
  const backgroundColor =
    theme === "dark"
      ? "var(--color-almost-black)"
      : "var(--color-almost-white)";
  return (
    <Window
      className={`p-2 ${className}`}
      style={{ backgroundColor, borderRadius: "var(--border-radius)" }}
    >
      <div className="mb-1 flex gap-1 relative">
        <div className="w-2.5 h-2.5 border border-slate-700 rounded-full"></div>
        <div className="w-2.5 h-2.5 border border-slate-700 rounded-full"></div>
        <div className="w-2.5 h-2.5 border border-slate-700 rounded-full"></div>
        <div
          className="text-slate-500 absolute inset-x-0 mx-auto text-center"
          style={{ fontSize: "0.6rem", top: "-1px" }}
        >
          {filename}
        </div>
      </div>
      <SyntaxHighlighter
        language="javascript"
        showLineNumbers={type === "editor"}
        style={theme === "dark" ? syntaxThemeDark : syntaxThemeLight}
        codeTagProps={{ className: "code-window" }}
        // className="hello"
        customStyle={{
          backgroundColor,
          // fontSize: "0.7rem",
        }}
      >
        {removeLeadingSpaces(snippet)}
      </SyntaxHighlighter>
    </Window>
  );
};

const Window = styled.div`
  font-size: 0.55rem;

  // larger screens
  @media (min-width: 480px) {
    font-size: 0.7rem;
  }
`;

export default CodeWindow;
