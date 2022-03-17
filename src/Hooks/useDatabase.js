import addProductService from '../Services/addProductService';
import uploadImageService from '../Services/uploadImageService';
import { useDispatch } from 'react-redux';
import { addProductAction, editProductAction } from '../Context/Actions/ProductsInfoActions';
import editProductService from '../Services/editProductService';

const useDatabase = () => {
  const dispatch = useDispatch();

  const createProduct = async (formData, images) => {
    const { imagesPaths, imagesURLs } = await uploadImageService(formData, images);

    const product = { ...formData, imagesPaths, imagesURLs };
    await addProductService(product);
    dispatch(addProductAction(product));

    return product;
  };

  const editProduct = async (formData, oldProductData, images) => {
    const imagesToUpload = images.filter((el) => el.type !== 'url');
    const existingImages = images.filter((el) => el.type === 'url');
    const existingImagesPaths = existingImages.map((el) => el.imagePath);
    const existingImagesURLs = existingImages.map((el) => el.imageURL);

    const { imagesPaths: newImagesPaths, imagesURLs: newImagesURLs } = await uploadImageService(
      formData,
      imagesToUpload
    );

    const imagesPaths = [...existingImagesPaths, ...newImagesPaths];
    const imagesURLs = [...existingImagesURLs, ...newImagesURLs];

    const newProductData = { ...formData, imagesPaths, imagesURLs };
    await editProductService(newProductData, oldProductData);
    dispatch(editProductAction(oldProductData, newProductData));
  };

  return { createProduct, editProduct };
};

export default useDatabase;
