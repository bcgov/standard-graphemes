import "./Character.css";

export default function Character({ char }: { char: string }) {
  console.log(char);
  return (
    <div className="character-groups">
      <h3>BC Sans</h3>

      <div className="character-group">
        <div className="character-display bc-sans light">
          <span className="font-name">BC Sans Light (300)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display bc-sans">
          <span className="font-name">BC Sans Normal (400)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display bc-sans bold">
          <span className="font-name">BC Sans Bold (700)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display bc-sans italic light">
          <span className="font-name">BC Sans Italic Light (300)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display bc-sans italic">
          <span className="font-name">BC Sans Italic Normal (400)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display bc-sans italic bold">
          <span className="font-name">BC Sans Italic Bold (700)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
      </div>

      <h3>Noto Sans</h3>
      <div className="character-group">
        <div className="character-display noto-sans light">
          <span className="font-name">Noto Sans Light (300)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display noto-sans">
          <span className="font-name">Noto Sans Normal (400)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display noto-sans bold">
          <span className="font-name">Noto Sans Bold (700)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display noto-sans italic light">
          <span className="font-name">Noto Sans Italic Light (300)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display noto-sans italic">
          <span className="font-name">Noto Sans Italic Normal (400)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display noto-sans italic bold">
          <span className="font-name">Noto Sans Italic Bold (700)</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
      </div>

      <h3>System Font Stack</h3>
      <div className="character-group">
        <div className="character-display sans">
          <span className="font-name">System Font Stack Sans</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display serif">
          <span className="font-name">System Font Stack Serif</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
        <div className="character-display mono">
          <span className="font-name">System Font Stack Mono</span>
          <div className="character-container">
            <span>{char}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
