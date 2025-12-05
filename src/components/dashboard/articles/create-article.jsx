import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import '../../../../public/styles/dashboard/article.css'

export default function CreateArticle() {
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);

  // --- Configuration toolbar ---
  const modules = {
    toolbar: {
      container: [
        [{ header: [ 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image", "document"],
        [{ align: [] }],
        [{ color: [] }, { background: [] }],
        ["clean"],
      ],
      handlers: {
        image: () => handleImageUpload(),
        document: () => handleDocumentUpload(),
      },
    },
  };

  const formats = [
    "header", "bold", "italic", "underline", "strike",
    "blockquote", "list", "bullet", "link",
    "image", "color", "background", "code-block", "align",
  ];

  // --- Upload image ---
  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpeg, image/png");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const res = await axios.post("http://localhost:5000/upload/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", res.data.url);
      } catch (err) {
        console.error("Erreur upload image:", err);
      } finally {
        setUploading(false);
      }
    };
  };

  // --- Upload document ---
  const handleDocumentUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const res = await axios.post("http://localhost:5000/upload/document", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertText(range.index, file.name, "link", res.data.url);
      } catch (err) {
        console.error("Erreur upload document:", err);
      } finally {
        setUploading(false);
      }
    };
  };

  // --- Publier l'article ---
  const handleSubmit = async () => {
    const cleanHTML = DOMPurify.sanitize(content);
    await axios.post("http://localhost:5000/articles", { content: cleanHTML });
    alert("✅ Article enregistré !");
    setContent("");
  };

  return (
    <div className="add-article">
        <h3>Création d'un article :</h3>
        {uploading && (
            <div style={{ marginBottom: "10px", color: "#007BFF" }}>
            🔄 Upload en cours...
            </div>
        )}

        <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Écrivez votre article ici..."
        />

        <button
            onClick={handleSubmit}
        >
            Soumettre
        </button>

        <div
            style={{
            marginTop: "30px",
            background: "#f7f7f7",
            padding: "15px",
            borderRadius: "8px",
            }}
        >
            <h3>Prévisualisation :</h3>
            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
        </div>
    </div>
  );
};