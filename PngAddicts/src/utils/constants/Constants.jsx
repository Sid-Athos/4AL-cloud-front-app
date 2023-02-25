import {Tooltip} from "antd";
import {UploadOutlined, TableOutlined} from "@ant-design/icons";
export default class Constants {
    static API_BASE_URL = import.meta.env.VITE_BACKEND_API_URL;
    static MENU_ITEMS = [
        {
            icon: <Tooltip title={"View image list"}><TableOutlined style={{fontSize: '28px', paddingLeft:'8px'}}/></Tooltip>,
            key: 'View'
        },
        {
            key: 'Create',
            icon: <Tooltip title={"Create image"}><UploadOutlined  style={{fontSize: '28px', paddingLeft:'8px'}}/></Tooltip>,
        }];
}