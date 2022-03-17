import { ref, deleteObject } from 'firebase/storage';
import { storage } from '../Firebase';

const deleteImageService = async (imagePath) => {
  try {
    const reference = ref(storage, imagePath);
    await deleteObject(reference);
    return true;
  } catch (err) {
    console.error(err);
    alert(`Error, no se pudo eliminar la imagen, error in console`);
    return false;
  }
};

export default deleteImageService;
