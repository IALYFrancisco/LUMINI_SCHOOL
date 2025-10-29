import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const ArticleEditor = () => {
  const [content, setContent] = useState("");

  const handleChange = (value) => {
    setContent(value);
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>Éditeur d’article</h2>
      <ReactQuill
        theme="snow"
        value={content}
        onChange={handleChange}
        placeholder="Écrivez votre article ici..."
      />
      <div style={{ marginTop: "30px", background: "#f7f7f7", padding: "15px", borderRadius: "8px" }}>
        <h3>Prévisualisation :</h3>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    </div>
  );
};

export default ArticleEditor;