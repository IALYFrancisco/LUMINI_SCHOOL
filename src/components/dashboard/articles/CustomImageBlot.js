import { Quill } from "react-quill-new";

const BlockEmbed = Quill.import("blots/block/embed")

export class ImageBlot extends BlockEmbed {
    static create(value){
        const node = super.create()
        node.setAttribute("src", value.src)

        if(value.alt){
            node.setAttribute("alt", value.alt)
        }

        return node
    }

    static value(node){
        return {
            src: node.getAttribute("src"),
            alt: node.getAttribute("alt")
        }
    }
}

ImageBlot.blotName = "image"
ImageBlot.tagName = "img"