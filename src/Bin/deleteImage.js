import { ref, deleteObject } from 'firebase/storage';
import { db } from '../Firebase';

const deleteImage = async (imagePath) => {
  const reference = ref(db, imagePath);
  try {
    await deleteObject(reference);
    return true;
  } catch (err) {
    console.error(err);
    alert(`No se pudo eliminar, error in console`);
    return false;
  }
};

export default deleteImage;
