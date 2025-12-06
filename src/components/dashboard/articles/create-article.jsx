import { useState, useRef, useEffect } from "react";
import ReactQuill from "react-quill-new";
import DOMPurify from "dompurify";
import axios from "axios";
import "react-quill-new/dist/quill.snow.css";
import '../../../../public/styles/dashboard/article.css'
import { useForm } from "react-hook-form";

export default function CreateArticle() {

  const { register, handleSubmit, reset, watch } = useForm()
  var [ imageIsDefined, setImageIsDefined ] = useState(false)
  var [ urlIsDefined, setUrlIsDefined ] = useState(false)
  const [ image, setImage ] = useState("")
  const [content, setContent] = useState("");
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef(null);

  var watchAll = watch()

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
    "blockquote", "list", "link",
    "image", "color", "background", "code-block", "align",
  ];

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/jpeg, image/png");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("image", file);

      try {
        setUploading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/article/add-illustration`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertEmbed(range.index, "image", `${import.meta.env.VITE_API_BASE_URL}/${res.data.url}`);
      } catch (err) {
        console.error("Erreur upload image:", err);
      } finally {
        setUploading(false);
      }
    };
  };

const handleDocumentUpload = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.png,.jpg");
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/article/add-file`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true
        });

        const quill = quillRef.current.getEditor();
        const range = quill.getSelection();
        quill.insertText(range.index, file.name, "link", `${import.meta.env.VITE_API_BASE_URL}${res.data.url}`);
      } catch (err) {
        console.error("Erreur upload document:", err);
      } finally {
        setUploading(false);
      }
    };
  };

const _handleSubmit = (data) => {
  const cleanHTML = DOMPurify.sanitize(content);
  const article = new FormData()
  
  article.append('title', data.title)
  if(imageIsDefined){
    article.append('image', image)
  }
  if(urlIsDefined){
    article.append('image', data.url)
  }
  article.append('contents', cleanHTML)
  
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/article/create`, article, { withCredentials: true, headers: imageIsDefined ? { "Content-Type": "multipart/form-data" } : { "Content-Type": "application/json" } })
  .then(()=>{
    reset()
    setImage(null)
    setContent("")
  })
};

  useEffect(()=>{
  
    if(watchAll.url) setUrlIsDefined(true)
    else setUrlIsDefined(false)

    if(image) setImageIsDefined(true)
    else setImageIsDefined(false)

  }, [image, watchAll.url])

  return (
    <>
      <div className="add-article">
        <h3>Création d'un article :</h3>
          {uploading && (
              <p className="upload-message">
                🔄 Upload en cours...
              </p>
          )}
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <fieldset>
            <div className="element">
              <label htmlFor="">Titre de l'article :</label>
              <input type="text" name="" id="" placeholder="Ajouter un titre à l'article" { ...register("title", { required: true }) } required />
            </div>
          </fieldset>
          <fieldset>
            <div className="element">
              <label htmlFor="">Image de mis en avant pour l'article :</label>
              <div className="inputs-container">
                <input disabled={imageIsDefined} type="url" name="" id="" placeholder="Utilisez cet champ pour une image en ligne" { ...register("url") } />
                <input disabled={urlIsDefined} type="file" name="" id="" onChange={(e)=>setImage(e.target.files[0])} accept="image/jpeg, image/png" />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <div className="element">
                <label htmlFor="">Contenus de l'article :</label>
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={content}
                    onChange={setContent}
                    modules={modules}
                    formats={formats}
                    placeholder="Écrivez votre article ici..."
                />
              <button>Soumettre</button>
            </div>
          </fieldset>
        </form>

          <div className="previsualisation">
              <h3>Prévisualisation :</h3>
              <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(content) }} />
          </div>
      </div>
    </>
  );
};