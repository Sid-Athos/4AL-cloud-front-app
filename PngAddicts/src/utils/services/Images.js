import axiosInstance from './AxtiosInstance.js';

// Login and logout service
const getAllImages = () => {
    return axiosInstance.get();
};

const uploadImage = (image) => {
    return axiosInstance.post('/create', image);
};

const linkImageToText = (imageAndText) => {
    return axiosInstance.post('/create-linked-image', imageAndText);
};


const ImageService = {
    retrieveImages: getAllImages,
    saveImage: uploadImage,
    saveImageText: linkImageToText
};

export default ImageService;