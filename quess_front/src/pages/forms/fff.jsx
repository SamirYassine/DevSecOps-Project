import React, { useState } from "react";
import Draggable from "react-draggable";

function Drg() {
  const [image, setImage] = useState(null);
  const [symbols, setSymbols] = useState([]);
  const [sidebarData] = useState([
    { id: 1, value: "Zone 1" },
    { id: 2, value: "Zone 2" },
    { id: 3, value: "Zone 3" },
  ]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSymbolDrop = (e) => {
    e.preventDefault();
    const item = JSON.parse(e.dataTransfer.getData("text"));
    const imageRect = e.target.getBoundingClientRect();
    const posX = ((e.clientX - imageRect.left) / imageRect.width) * 100;
    const posY = ((e.clientY - imageRect.top) / imageRect.height) * 100;
    setSymbols([
      ...symbols,
      { id: item.id, title: item.value, x: posX, y: posY },
    ]);
  };

  const handleSymbolDrag = (e, id) => {
    const { clientX, clientY } = e;
    const imageRect = e.target.parentElement.getBoundingClientRect();
    const posX = ((clientX - imageRect.left) / imageRect.width) * 100;
    const posY = ((clientY - imageRect.top) / imageRect.height) * 100;
    setSymbols(
      symbols.map((symbol) =>
        symbol.id === id ? { ...symbol, x: posX, y: posY } : symbol
      )
    );
  };

  const handleSave = () => {
    console.log("Symbols:", symbols);
    // Implement save functionality here
  };

  const handleDeleteAll = () => {
    setSymbols([]);
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            width: "200px",
            borderRight: "1px solid #ccc",
            padding: "10px",
          }}
        >
          <h2>List of samples</h2>
          {sidebarData.map((item) => (
            <div
              key={item.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text", JSON.stringify(item));
              }}
              style={{
                margin: "5px",
                padding: "5px",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {item.value}
            </div>
          ))}
          <button onClick={handleSave} className="ActivateSitesBtn">
            Save
          </button>
          <button
            onClick={handleDeleteAll}
            style={{ marginTop: 10, backgroundColor: "red" }}
          >
            Delete all tags
          </button>
        </div>
        <div style={{ position: "relative" }}>
          <input type="file" onChange={handleImageUpload} />
          {image && (
            <div
              style={{ position: "relative" }}
              onDrop={handleSymbolDrop}
              onDragOver={(e) => {
                e.preventDefault();
              }}
            >
              <img
                src={image}
                alt="Uploaded"
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {symbols.map((symbol) => (
                <Draggable
                  key={symbol.id}
                  defaultPosition={{ x: symbol.x + "%", y: symbol.y + "%" }}
                  onDrag={(e) => handleSymbolDrag(e, symbol.id)}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: symbol.x + "%",
                      top: symbol.y + "%",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "inline-block",
                        width: "20px",
                        height: "20px",
                        backgroundColor: "red",
                        color: "white",
                        textAlign: "center",
                        lineHeight: "20px",
                      }}
                    >
                      {symbol.id}
                    </div>
                  </div>
                </Draggable>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Drg;
