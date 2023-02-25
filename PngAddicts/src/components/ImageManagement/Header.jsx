import React, { useState} from "react";
import {useNavigate} from "react-router-dom";
import {Menu} from "antd";
import Constants from "../../utils/constants/Constants.jsx";
let items = Constants.MENU_ITEMS;


export default function Header() {
    const [current, setCurrent] = useState('view');
    const navigate = useNavigate();

    const onClick = async (e) => {
        setCurrent(e.key);
        navigate(`/${e.key}`);
    };

    return (
        <>
            <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} className={"header"} >
            </Menu>
        </>
    );
}