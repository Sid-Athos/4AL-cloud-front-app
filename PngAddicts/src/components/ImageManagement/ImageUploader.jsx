import {Button, Upload} from "antd";
import {UploadOutlined} from "@ant-design/icons";

export default function ImageUploader(){
    return (
        <>
            <Upload>
                <Button icon={<UploadOutlined />}>Uploader une image</Button>
            </Upload>

        </>
    )
}