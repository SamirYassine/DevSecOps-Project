import React, { useState } from "react";
import Draggable from "react-draggable";

function Sidebar({ dataList, onSave, onDeleteAll, onPrint }) {
  const handleDragStart = (e, item) => {
    e.dataTransfer.setData("text", JSON.stringify(item));
  };

  return (
    <div
      style={{ width: "200px", borderRight: "1px solid #ccc", padding: "10px" }}
    >
      <h2>List of samples</h2>
      {dataList.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item)}
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
      <button onClick={onSave} className="ActivateSitesBtn">
        Save
      </button>
      <button
        onClick={onDeleteAll}
        style={{ marginTop: 10, backgroundColor: "red" }}
      >
        Delete all tags
      </button>
      <button onClick={onPrint} style={{ marginTop: 10 }}>
        Print Image
      </button>
    </div>
  );
}

function Drg() {
  const [image, setImage] = useState(null);
  const [texts, setTexts] = useState([]);
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

  const handleTextDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const item = JSON.parse(e.dataTransfer.getData("text"));
    const imageRect = e.target.getBoundingClientRect();
    const posX = ((e.clientX - imageRect.left) / imageRect.width) * 100;
    const posY = ((e.clientY - imageRect.top) / imageRect.height) * 100;
    setTexts([...texts, { id: item.id, title: item.value, x: posX, y: posY }]);
  };

  const handleTextDrag = (e, id) => {
    const { clientX, clientY } = e;
    const imageRect = e.target.parentElement.getBoundingClientRect();
    const posX = ((clientX - imageRect.left) / imageRect.width) * 100;
    const posY = ((clientY - imageRect.top) / imageRect.height) * 100;
    setTexts(
      texts.map((text) =>
        text.id === id ? { ...text, x: posX, y: posY } : text
      )
    );
  };

  const handleSave = () => {
    const zonesJSON = texts.map((zone) => ({
      title: zone.title,
      id: zone.id,
      type: "C",
      index: zone.id,
      color: "red",
      draggable: true,
      x: zone.x,
      y: zone.y,
    }));
    console.log(JSON.stringify(zonesJSON));
  };

  const handleDeleteAll = () => {
    setTexts([]);
  };

  const handlePrint = () => {
    const printContents = document.getElementById("imprimable").innerHTML;
    const originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Sidebar
          dataList={sidebarData}
          onSave={handleSave}
          onDeleteAll={handleDeleteAll}
          onPrint={handlePrint}
        />
        <div style={{ position: "relative" }}>
          <input type="file" onChange={handleImageUpload} />
          {image && (
            <div style={{ position: "relative" }} id="imprimable">
              <img
                src={image}
                alt="Uploaded"
                onDrop={handleTextDrop}
                onDragOver={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
                style={{ maxWidth: "100%", height: "auto" }}
              />
              {texts.map((text) => (
                <Draggable
                  key={text.id}
                  defaultPosition={{ x: text.x + "%", y: text.y + "%" }}
                  onDrag={(e) => handleTextDrag(e, text.id)}
                >
                  <div
                    style={{
                      position: "absolute",
                      left: text.x + "%",
                      top: text.y + "%",
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
                      {text.id}
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
