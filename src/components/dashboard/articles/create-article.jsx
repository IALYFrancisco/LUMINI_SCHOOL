import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import "../../../../public/styles/dashboard/article.css";
import { useForm } from "react-hook-form";
import "./CustomImageBlot";

export default function CreateArticle() {
  const { register, handleSubmit, reset, watch } = useForm();

  const [imageIsDefined, setImageIsDefined] = useState(false);
  const [urlIsDefined, setUrlIsDefined] = useState(false);
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);

  const quillRef = useRef(null);
  const watchAll = watch();

  const modules = {
    history: {
      delay: 1000,
      maxStack: 100,
      userOnly: true,
    },
    toolbar: {
      container: [
        [{ header: [2, 3, 4, 5, 6, false] }],
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
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "link",
    "image",
    "color",
    "background",
    "code-block",
    "align",
  ];

  const handleImageUpload = async () => {
    const remoteURLImage = window.prompt(
      "Utilisez ce champ pour une image déjà en ligne :"
    );

    if (
      remoteURLImage &&
      (remoteURLImage.startsWith("http://") ||
        remoteURLImage.startsWith("https://"))
    ) {
      const altImage = window.prompt(
        "Saisissez le texte alternatif de cette image :"
      );

      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true);

      quill.insertEmbed(range.index, "image", {
        src: remoteURLImage,
        alt: altImage || "",
      });

      return;
    }

    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/jpeg, image/png";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/article/add-illustration`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        quill.insertEmbed(range.index, "image", {
          src: `${import.meta.env.VITE_API_BASE_URL}/${res.data.url}`,
          alt: "",
        });
      } catch (err) {
        console.error("Erreur upload image :", err);
      } finally {
        setUploading(false);
      }
    };
  };

  const handleDocumentUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt";
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);

        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/article/add-file`,
          formData,
          { withCredentials: true }
        );

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection(true);

        quill.insertText(
          range.index,
          file.name,
          "link",
          `${import.meta.env.VITE_API_BASE_URL}${res.data.url}`
        );
      } catch (err) {
        console.error("Erreur upload document :", err);
      } finally {
        setUploading(false);
      }
    };
  };

  const _handleSubmit = (data) => {
    if (content === "<p><br></p>") return;

    const cleanHTML = DOMPurify.sanitize(content);
    const article = new FormData();

    article.append("title", data.title);

    if (imageIsDefined) article.append("image", image);
    if (urlIsDefined) article.append("image", data.url);

    article.append("contents", cleanHTML);

    axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/article/create`, article, {
        withCredentials: true,
      })
      .then(() => {
        reset();
        setImage(null);
        setContent("");
      });
  };

  useEffect(() => {
    setUrlIsDefined(!!watchAll.url);
    setImageIsDefined(!!image);
  }, [image, watchAll.url]);

  return (
    <div className="add-article">
      <h3>Création d'un article :</h3>

      {uploading && <p className="upload-message">🔄 Upload en cours...</p>}

      <form onSubmit={handleSubmit(_handleSubmit)}>
        <fieldset>
          <label>Titre de l'article</label>
          <input
            type="text"
            placeholder="Ajouter un titre"
            {...register("title", { required: true })}
            required
          />
        </fieldset>

        <fieldset>
          <label>Image de mise en avant</label>
          <div className="inputs-container">
            <input
              type="url"
              disabled={imageIsDefined}
              placeholder="Image en ligne"
              {...register("url")}
            />
            <input
              type="file"
              disabled={urlIsDefined}
              accept="image/jpeg, image/png"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
        </fieldset>

        <fieldset>
          <label>Contenu de l'article</label>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            placeholder="Écrivez votre article ici..."
          />
        </fieldset>

        <button>Soumettre</button>
      </form>

      <div className="previsualisation ql-container ql-snow">
        <h3>Prévisualisation :</h3>
        <div
          className="ql-editor"
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }}
        />
      </div>
    </div>
  );
}