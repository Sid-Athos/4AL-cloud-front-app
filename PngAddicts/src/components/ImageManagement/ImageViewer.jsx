import {useCallback, useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Image, Tabs} from "antd";
import ImagesService from "../../utils/services/Images.js";
const { TabPane } = Tabs;

export default function ImageViewer(){
    const [imageList, setImageList] = useState([])
    const [unlinkedImageList, setUnlinkedImageList] = useState([]);

    const theme = 'ag-theme-alpine';
    const columns =[{
        field: 'link',
        editable: false,
        height:200,
        cellRenderer: params => {
            return <Image src={params.value} height={200}></Image>
        }
    }
        ,{
            field: 'text',
            editable: true

        }];

    useEffect(() => {
        ImagesService.retrieveLinkedImages().then(response => {

            setImageList(response.data);
        })
        ImagesService.retrieveImages().then(response => {

            setUnlinkedImageList(mapUnlinkedImages(response.data));
        })
    },[]);


    function mapUnlinkedImages(fromServer){
        return fromServer.map(image => {
            return {link: image.link, text: null}
        })
    }


    const onCellEditRequest = useCallback(async (event) => {
        const imageWithText = {
            link : event.data.link,
            text: event.newValue
        }
        let listToModify = imageList;
        let imageToModify = imageList.findIndex(image => image.link === event.data.link);
        listToModify[imageToModify].description = event.newValue;

        setImageList([...listToModify]);
        ImagesService.saveImageText(imageWithText).then(res => {
            console.log(res)
        });
    }, [imageList]);

    const onCellEditRequestNewLink = useCallback(async (event) => {
        const imageWithText = {
            link : event.data.link,
            text: event.newValue
        }
        let listToModify = imageList;
        listToModify.push(imageWithText)

        setImageList([...listToModify]);
        ImagesService.saveImageText(imageWithText).then(res => {
            console.log(res)
        });
    }, [imageList]);



    const gridStyle = useMemo(() => ({
        height: imageList.length > 2 ? 600: 200,
        width:500,
        color: 'black'
    }), []);

    return (
        <>
            <Tabs defaultActiveKey={"linkedImages"}>
                <TabPane tab="Linked Images" key="linkedImages" style={{maxWidth:660}}>

                    <div className={theme} style={gridStyle}>
                    <AgGridReact
                        ref={null}
                        suppressRowClickSelection={true}
                        pagination={false}
                        readOnlyEdit={true}
                        onCellEditRequest={onCellEditRequest}
                        columnDefs={columns}
                        rowHeight={100}
                        rowData={imageList}></AgGridReact>
                </div>
                </TabPane>
                <TabPane tab="UnLinked Images" key="unlinkedImages" style={{maxWidth:660}}>
                    <div className={theme} style={gridStyle}>
                        <AgGridReact
                            ref={null}
                            suppressRowClickSelection={true}
                            pagination={false}
                            readOnlyEdit={true}
                            onCellEditRequest={onCellEditRequestNewLink}
                            columnDefs={columns}
                            rowHeight={100}
                            rowData={unlinkedImageList}></AgGridReact>
                    </div>
                </TabPane>
            </Tabs>
                </>
    )
}