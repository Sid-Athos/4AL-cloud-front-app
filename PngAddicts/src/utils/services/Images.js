import axiosInstance from './AxtiosInstance.js';

const getAllImagesWithText = () => {
    return axiosInstance.get("/linked-images");
};

const getAllImages = () => {
    return axiosInstance.get("");
};

const uploadImage = (image) => {
    console.log(image)
    return axiosInstance.post('/create', image,{ headers: {'Content-Type': 'multipart/form-data'}});
};

const linkImageToText = (imageAndText) => {
    console.log(imageAndText)
    return axiosInstance.post('/create-linked-image', imageAndText );
};


const ImageService = {
    retrieveImages: getAllImages,
    retrieveLinkedImages: getAllImagesWithText,
    saveImage: uploadImage,
    saveImageText: linkImageToText
};

export default ImageService;