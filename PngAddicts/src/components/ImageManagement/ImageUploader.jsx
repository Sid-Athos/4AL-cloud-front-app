import {useState} from "react";
import ImageService from "../../utils/services/Images.js";

export default function ImageUploader(){

    const [file, setFile] = useState()

    const submit = async event => {
        event.preventDefault()

        const formData = new FormData()
        formData.append("image", file)

        ImageService.saveImage(formData).then()
    }


    return (
        <>
            <form onSubmit={submit}>
                <input
                    name={"image"}
                    onChange={e => setFile(e.target.files[0])}
                    type="file"
                    accept="image/*"
                ></input>

                <button type="submit">Submit</button>
            </form>
        </>
    )
}