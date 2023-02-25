import {useCallback, useEffect, useMemo, useState} from "react";
import {AgGridReact} from "ag-grid-react";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {Image} from "antd";
import ImagesService from "../../utils/services/Images.js";

const data =
    [{'lien':"https://storage.googleapis.com/images-4al-cloud-gr2/chat_sniper.jpg", 'description':' sqds qdsqd sqdsq dsqd' },{'lien':"https://storage.googleapis.com/images-4al-cloud-gr2/1676666488723-pdp.jpg", 'description':'sdsqd sqdsqd sqd '}];

export default function ImageViewer(){
    const [imageList, setImageList] = useState([]);
    const theme = 'ag-theme-alpine';
    const columns =[{
        field: 'lien',
        editable: false,
        height:200,
        cellRenderer: params => {
            return <Image src={params.value} height={200}></Image>
        }
    }
        ,{
            field: 'description',
            editable: true

        }];

    useEffect(() => {
        ImagesService.retrieveImages().then(response => {
            console.log(response)
        })
        setImageList(data);
    },[]);

    const onCellEditRequest = useCallback(async (event) => {
        const imageWithText = {
            link : event.data.lien,
            text: event.newValue
        }
        let listToModify = imageList;
        let imageToModify = imageList.findIndex(image => image.lien === event.data.lien);
        listToModify[imageToModify].description = event.newValue;

        setImageList([...listToModify]);
        const postResult = await ImagesService.saveImageText(imageWithText)
    }, [imageList]);



    const gridStyle = useMemo(() => ({
        height: imageList.length > 2 ? 600: 200,
        width:500,
        color: 'black'
    }), []);

    return (
        <>
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
        </>
    )
}