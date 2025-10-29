// import React, { useState } from "react";
// import ReactQuill from "react-quill-new";
// import "react-quill-new/dist/quill.snow.css";

// // Configuration de la toolbar
// const modules = {
//   toolbar: {
//     container: [
//       [{ header: [1, 2, 3, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       ["blockquote", "code-block"],
//       ["link", "image"],
//       [{ align: [] }],
//       [{ color: [] }, { background: [] }],
//       ["clean"],
//     ],
//     handlers: {
//       image: imageHandler, // handler personnalisé pour l'image
//     },
//   },
// };

// function imageHandler() {
//   const input = document.createElement("input");
//   input.setAttribute("type", "file");
//   input.setAttribute("accept", "image/*");
//   input.click();

//   input.onchange = async () => {
//     const file = input.files[0];
//     if (file) {
//       // Conversion de l'image en base64 pour prévisualisation locale
//       const reader = new FileReader();
//       reader.onload = () => {
//         const quill = this.quill;
//         const range = quill.getSelection();
//         quill.insertEmbed(range.index, "image", reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };
// }

// const formats = [
//   "header",
//   "bold",
//   "italic",
//   "underline",
//   "strike",
//   "blockquote",
//   "list",
//   "bullet",
//   "indent",
//   "link",
//   "image",
//   "color",
//   "background",
//   "code-block",
//   "align",
// ];

// const ArticleEditor = () => {
//   const [content, setContent] = useState("");

//   const handleChange = (value) => {
//     setContent(value);
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto" }}>
//       <h2 style={{ textAlign: "center" }}>✍️ Éditeur d’article avancé</h2>

//       <ReactQuill
//         theme="snow"
//         value={content}
//         onChange={handleChange}
//         modules={modules}
//         formats={formats}
//         placeholder="Écrivez votre article ici..."
//       />

//       <div
//         style={{
//           marginTop: "30px",
//           background: "#f7f7f7",
//           padding: "15px",
//           borderRadius: "8px",
//         }}
//       >
//         <h3>Prévisualisation :</h3>
//         <div dangerouslySetInnerHTML={{ __html: content }} />
//       </div>
//     </div>
//   );
// };

// export default ArticleEditor;


// import React, { useState, useRef } from "react";
// import ReactQuill from "react-quill-new";
// import DOMPurify from "dompurify";
// import axios from "axios";
// import "react-quill-new/dist/quill.snow.css";

// const ArticleEditor = () => {
//   const [content, setContent] = useState("");
//   const quillRef = useRef(null);

//   // --- Configuration de la toolbar ---
//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, false] }],
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["blockquote", "code-block"],
//         ["link", "image", "document"], // ajout du bouton document
//         [{ align: [] }],
//         [{ color: [] }, { background: [] }],
//         ["clean"],
//       ],
//       handlers: {
//         image: () => handleImageUpload(),
//         document: () => handleDocumentUpload(),
//       },
//     },
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "blockquote",
//     "list",
//     "bullet",
//     "link",
//     "image",
//     "color",
//     "background",
//     "code-block",
//     "align",
//   ];

//   // --- Gestion des images ---
//   const handleImageUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const res = await axios.post("http://localhost:5000/upload/image", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         quill.insertEmbed(range.index, "image", res.data.url);
//       } catch (err) {
//         console.error("Erreur upload image:", err);
//       }
//     };
//   };

//   // --- Gestion des documents téléchargeables ---
//   const handleDocumentUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute(
//       "accept",
//       ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
//     );
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const res = await axios.post("http://localhost:5000/upload/document", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         quill.insertText(range.index, file.name, "link", res.data.url);
//       } catch (err) {
//         console.error("Erreur upload document:", err);
//       }
//     };
//   };

//   const handleSubmit = async () => {
//     const cleanHTML = DOMPurify.sanitize(content);
//     await axios.post("http://localhost:5000/articles", { content: cleanHTML });
//     alert("Article enregistré avec succès !");
//     setContent("");
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto" }}>
//       <h2 style={{ textAlign: "center" }}>✍️ Éditeur d’article complet</h2>

//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         placeholder="Écrivez votre article ici..."
//       />

//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: "20px",
//           background: "#007BFF",
//           color: "white",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Publier l’article
//       </button>

//       <div
//         style={{
//           marginTop: "30px",
//           background: "#f7f7f7",
//           padding: "15px",
//           borderRadius: "8px",
//         }}
//       >
//         <h3>Prévisualisation :</h3>
//         <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
//       </div>
//     </div>
//   );
// };

// export default ArticleEditor;

// import React, { useState, useRef } from "react";
// import ReactQuill from "react-quill-new";
// import DOMPurify from "dompurify";
// import axios from "axios";
// import "react-quill-new/dist/quill.snow.css";

// const ArticleEditor = () => {
//   const [content, setContent] = useState("");
//   const quillRef = useRef(null);

//   // --- Configuration toolbar ---
//   const modules = {
//     toolbar: {
//       container: [
//         [{ header: [1, 2, 3, 4, 5, 6, false] }], // titres sémantiques
//         ["bold", "italic", "underline", "strike"],
//         [{ list: "ordered" }, { list: "bullet" }],
//         ["blockquote", "code-block"],
//         ["link", "image", "document"], // bouton document
//         [{ align: [] }],
//         [{ color: [] }, { background: [] }],
//         ["clean"],
//       ],
//       handlers: {
//         image: () => handleImageUpload(),
//         document: () => handleDocumentUpload(),
//       },
//     },
//   };

//   const formats = [
//     "header", "bold", "italic", "underline", "strike",
//     "blockquote", "list", "bullet", "link",
//     "image", "color", "background", "code-block", "align",
//   ];

//   // --- Upload image ---
//   const handleImageUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", "image/*");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const res = await axios.post("http://localhost:5000/upload/image", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         quill.insertEmbed(range.index, "image", res.data.url);
//       } catch (err) {
//         console.error("Erreur upload image:", err);
//       }
//     };
//   };

//   // --- Upload document ---
//   const handleDocumentUpload = async () => {
//     const input = document.createElement("input");
//     input.setAttribute("type", "file");
//     input.setAttribute("accept", ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt");
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];
//       const formData = new FormData();
//       formData.append("file", file);

//       try {
//         const res = await axios.post("http://localhost:5000/upload/document", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });

//         const quill = quillRef.current.getEditor();
//         const range = quill.getSelection();
//         quill.insertText(range.index, file.name, "link", res.data.url);
//       } catch (err) {
//         console.error("Erreur upload document:", err);
//       }
//     };
//   };

//   // --- Publier l'article ---
//   const handleSubmit = async () => {
//     const cleanHTML = DOMPurify.sanitize(content);
//     await axios.post("http://localhost:5000/articles", { content: cleanHTML });
//     alert("✅ Article enregistré !");
//     setContent("");
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "40px auto" }}>
//       <h2 style={{ textAlign: "center" }}>✍️ Éditeur d’article complet</h2>

//       <ReactQuill
//         ref={quillRef}
//         theme="snow"
//         value={content}
//         onChange={setContent}
//         modules={modules}
//         formats={formats}
//         placeholder="Écrivez votre article ici..."
//       />

//       <button
//         onClick={handleSubmit}
//         style={{
//           marginTop: "20px",
//           background: "#007BFF",
//           color: "white",
//           padding: "10px 20px",
//           borderRadius: "8px",
//           border: "none",
//           cursor: "pointer",
//         }}
//       >
//         Publier l’article
//       </button>

//       <div
//         style={{
//           marginTop: "30px",
//           background: "#f7f7f7",
//           padding: "15px",
//           borderRadius: "8px",
//         }}
//       >
//         <h3>Prévisualisation :</h3>
//         <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
//       </div>
//     </div>
//   );
// };

// export default ArticleEditor;


import React, { useState, useRef } from "react";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";

const ArticleEditor = () => {
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false); // état upload
  const quillRef = useRef(null);

  // --- Configuration toolbar ---
  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }], // titres sémantiques
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "code-block"],
        ["link", "image", "document"], // bouton document
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
    input.setAttribute("accept", "image/*");
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
    <div style={{ maxWidth: "800px", margin: "40px auto" }}>
      <h2 style={{ textAlign: "center" }}>✍️ Éditeur d’article complet</h2>

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
        style={{
          marginTop: "20px",
          background: "#007BFF",
          color: "white",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Publier l’article
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

export default ArticleEditor;