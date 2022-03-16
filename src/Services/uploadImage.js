import { ref, uploadBytes, getDownloadURL } from '@firebase/storage';
import { storage } from '../Firebase';
import Reziser from 'react-image-file-resizer';

const compressImage = (file) =>
  new Promise((resolve) => {
    Reziser.imageFileResizer(
      file,
      650,
      650,
      'JPEG',
      60,
      0,
      (uri) => {
        resolve(uri);
      },
      'file'
    );
  });

const getImgURL = async (imagePath) => {
  const reference = ref(storage, imagePath);
  const downloadURL = await getDownloadURL(reference);
  return downloadURL;
};

//Return paths and urls
const uploadImage = async (formProductData, images) => {
  let imagesPaths = [];
  let imagesURLs = [];

  const UUID = Date.now();
  for (let i = 0; i < images.length; i++) {
    let thubnailPath = formProductData.category + '/' + formProductData.id + '-' + UUID + '/IMG-' + i;

    let reference = ref(storage, thubnailPath);
    imagesPaths[i] = thubnailPath; //guarda la ubicacion de la imagen en el indice i
    const compressedImage = await compressImage(images[i]);

    await uploadBytes(reference, compressedImage);

    imagesURLs[i] = await getImgURL(thubnailPath); //genera la direccion URL de la imagen
  }

  return { imagesPaths, imagesURLs };
};

export default uploadImage;
