import './App.css'
import {Layout} from "antd";
import {Route, Routes} from "react-router-dom";
import ImageViewer from "./components/ImageManagement/ImageViewer.jsx";
import ImageUploader from "./components/ImageManagement/ImageUploader.jsx";
import Header from "./components/ImageManagement/Header.jsx";
import {Content, Footer} from 'antd/es/layout/layout';


export default function App() {
    return (
        <Layout style={{ minHeight: '100%' }}>
            <Layout >
                <Header></Header>
            <Content style={{ padding: '50px' }}>
                <Routes>
                    <Route path='/view' element={<ImageViewer />} />
                    <Route
                        path='/create'
                        element={
                                <ImageUploader />
                        }
                    />
                </Routes>
            </Content>
            <Footer style={{ textAlign: 'center' }}>
                © PNGAddicts
            </Footer>
            </Layout>
        </Layout>
    );
}

