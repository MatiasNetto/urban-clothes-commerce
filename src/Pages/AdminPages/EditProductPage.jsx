import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import ImagesInput from '../../Components/Admin/Form/ImagesInput';
import { AdminFormContext } from '../../Context/AdminFormContext';
import resizeAreaInput from '../../Services/resizeAreaInput';
import uploadImage from '../../Services/uploadImage';
import { colorGreen, desktopMediaQuery } from '../../styles';
import Loader from '../../Components/Utils/Loader';

const Title = styled.h2`
  color: #222;
  margin-left: 5vw;
  margin-top: 5vw;
  font-weight: 400;

  ${desktopMediaQuery} {
    margin-top: 2rem;
    display: block;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
`;

const FormStyle = styled.form`
  height: 100%;
  width: 90%;
  margin: 0 auto;
  margin-top: 5vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
  padding: 1em;

  ${desktopMediaQuery} {
    width: 50%;
    margin-top: 2rem;
  }
`;

const FormInputsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1em;
`;

export const InputContainer = styled.fieldset`
  display: flex;
  flex-direction: column;
  margin: 1em 0;
  border: none;
  outline: none;
`;

const SelectInput = styled.select`
  /* margin-left: 1em; */
  width: fit-content;
  background: transparent;
  border: none;
  font-size: 1.3em;
  cursor: pointer;
  border-bottom: 2px solid #000;
  outline: none;
  padding-right: 0.5em;
`;

const SelectOrderInput = styled(SelectInput)`
  width: 30%;
`;

export const Label = styled.label`
  display: flex;
  align-items: center;
  font-size: 1em;
  color: #222;
  margin-bottom: 0.5em;
`;

const TextInput = styled.input`
  width: 100%;
  height: fit-content;
  padding: 10px 10px;
  outline: none;
  font-size: 1.1em;
  border: 1px solid #999;
  border-radius: 4px;

  &:focus {
    border: 1px solid #000;
  }
`;

const NumberInputFieldset = styled.fieldset`
  width: 100%;
  height: fit-content;
  display: flex;
  align-items: center;
  outline: none;
  font-size: 1.1em;
  border: none;
  border: 1px solid #999;
  outline: none;
  border-radius: 4px;
`;

const PriceInputSign = styled(Label)`
  margin: 0;
  margin-bottom: 1px;
  margin-left: 10px;
  color: #000;
`;

const NumberInput = styled.input`
  width: 100%;
  font-size: 1.1em;
  padding: 10px 10px;
  border: none;
  outline: none;
`;

const AreaInput = styled.textarea`
  width: 100%;
  min-height: 15vh;
  font-size: 1.2em;
  border: 1px solid #999;
  border-radius: 4px;
  padding: 10px 10px;
`;

// const SelectInput = styled.select`
//   width: 100%;
//   height: 5vh;
//   font-size: 1.4em;
// `;

// const PreviewImageButton = styled(UploadImageButton)`
//   margin-left: 1em;
// `;

const TagsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
`;

const CheckContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
`;

const CheckInput = styled.input`
  height: 1.2em;
  width: 1.2em;
  margin-right: 5px;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ButtonInput = styled.button`
  width: 100%;
  height: 6vh;
  background: ${colorGreen};
  border: none;
  border-radius: 4px;
  font-size: 1.2em;
  color: #fff;
  cursor: pointer;
  transition: filter 0.5s;

  &:hover {
    filter: brightness(90%);
  }
`;

const UploadingContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: #0004;
`;

const getParamsObject = (search) => {
  const searchParams = new URLSearchParams(search);
  const object = JSON.parse(searchParams.get('productData'));
  let params = {};
  Object.entries(object).forEach(([key, value]) => (params[key] = value));
  return params;
};

const genOldImages = (imagesURLs, imagesPaths) => {
  let imagesArray = [];
  if (imagesURLs.length === imagesPaths.length) {
    for (let i = 0; i < imagesURLs.length; i++) {
      imagesArray[i] = {
        type: 'url',
        imageURL: imagesURLs[i],
        imagePath: imagesPaths[i],
        name: `IMG-${i}-${Date.now()}`,
      };
    }
  }

  return imagesArray;
};

// COMPONENT

const EditProductPage = () => {
  const history = useHistory();
  const { adminCategory, setAdminCategory, editProduct } = useContext(AdminFormContext);
  const searchQuery = getParamsObject(useLocation().search);
  const [uploading, setUploading] = useState(false);

  const oldProductData = {
    id: searchQuery.id || '',
    name: searchQuery.name || '',
    category: searchQuery.category || adminCategory,
    description: searchQuery.description || '',
    price: searchQuery.price || '',
    offer: searchQuery.offer || { hasOffer: false, price: '' },
    imagesURLs: searchQuery.imagesURLs || [],
    imagesPaths: searchQuery.imagesPaths || [],
    tags: searchQuery.tags || [],
    outOfStock: searchQuery.outOfStock || false,
    order: searchQuery.order || 5,
    subOrder: searchQuery.subOrder || Math.random(),
  };

  setAdminCategory(searchQuery.category);

  const [images, setImages] = useState(genOldImages(oldProductData.imagesURLs, oldProductData.imagesPaths));
  const [formProductData, setFormProductData] = useState(oldProductData);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    let idValue;

    //en caso de que el campo modificado sea el modelo, actualizar tambien el ID
    if (name === 'name') idValue = e.target.value.replace(/ /g, '-').toLowerCase();

    if (name === 'description') resizeAreaInput(e.target);

    if (name === 'offer' && value !== '') {
      setFormProductData({ ...formProductData, offer: { hasOffer: true, price: value } });
      return;
    }
    if (name === 'offer' && value === '') {
      setFormProductData({ ...formProductData, offer: { hasOffer: false, price: value } });
      return;
    }

    //set del formProductData con el campo y valor modificado y, en el caso de que idValue tenga valor, setea el value como tal, en casod e que no lo deja igual
    setFormProductData({ ...{ ...formProductData, [name]: value }, id: idValue ? idValue : formProductData.id });
  };

  const handleCheckboxChange = (e) => {
    //maneja el completado de datos para las checkboxes
    let { name, checked } = e.target;

    if (checked) {
      setFormProductData({ ...formProductData, tags: [...formProductData['tags'], name] });
    } else {
      setFormProductData({ ...formProductData, tags: [...formProductData['tags'].filter((el) => el !== name)] });
    }
  };

  const handleOutOfStockChange = (e) => {
    let value;
    if (e.target.value === 'si') value = true;
    else value = false;
    setFormProductData({ ...formProductData, outOfStock: value });
  };

  const handleCategoryChange = (e) => {
    setAdminCategory(e.target.value);
    setFormProductData({ ...formProductData, category: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const imagesToUpload = images.filter((el) => el.type !== 'url');
    const existingImages = images.filter((el) => el.type === 'url');
    const existingImagesPaths = existingImages.map((el) => el.imagePath);
    const existingImagesURLs = existingImages.map((el) => el.imageURL);

    const { imagesPaths: newImagesPaths, imagesURLs: newImagesURLs } = await uploadImage(
      formProductData,
      imagesToUpload
    );

    const imagesPaths = [...existingImagesPaths, ...newImagesPaths];
    const imagesURLs = [...existingImagesURLs, ...newImagesURLs];

    await editProduct({ ...formProductData, imagesPaths, imagesURLs }, oldProductData);
    setUploading(false);
    alert('producto editado con exito');
    history.goBack();
  };

  if (!searchQuery.id) {
    return <h1>Error</h1>;
  }

  return (
    <>
      <Title>Editar producto</Title>
      <FormStyle onSubmit={handleSubmit} autocomplete="off" action="">
        {/* ******* */}
        {/* PRODUCT */}
        {/* ******* */}

        <FormInputsContainer>
          {/* MODEL */}
          <InputContainer>
            <Label htmlFor="model">Nombre del producto</Label>
            <TextInput
              value={formProductData.name}
              onChange={handleInputChange}
              type="search"
              name="name"
              id="model"
              autoComplete="off"
            />
          </InputContainer>

          {/* CATEGORY */}
          <InputContainer>
            <Label htmlFor="category">Categoria del producto</Label>
            <SelectInput value={adminCategory} name="category" id="category" onChange={handleCategoryChange}>
              <option value="vinos">Vinos</option>
              <option value="vodka">Vodka</option>
              <option value="espumantes">Espumantes</option>
            </SelectInput>
          </InputContainer>

          {/* DESCRIPTION */}
          <InputContainer>
            <Label htmlFor="description">Descripcion del producto</Label>
            <AreaInput
              value={formProductData.description}
              onChange={handleInputChange}
              type="text-area"
              name="description"
              autoComplete="off"
              rows="4"
            />
          </InputContainer>

          {/* PRICE */}
          <InputContainer>
            <Label htmlFor="price">Precio actual</Label>
            <NumberInputFieldset>
              <PriceInputSign htmlFor="price">$</PriceInputSign>
              <NumberInput
                value={formProductData.price}
                onChange={handleInputChange}
                type="number"
                name="price"
                id="price"
                autoComplete="off"
              />
            </NumberInputFieldset>
          </InputContainer>

          {/* OFFER PRICE */}
          <InputContainer>
            <Label htmlFor="price">Precio oferta (opcional)</Label>
            <NumberInputFieldset>
              <PriceInputSign htmlFor="offer">$</PriceInputSign>
              <NumberInput
                value={formProductData.offer.price}
                onChange={handleInputChange}
                type="number"
                name="offer"
                placeholder="opcional"
                id="offer"
                autoComplete="off"
              />
            </NumberInputFieldset>
          </InputContainer>

          {/* IMGS */}
          <ImagesInput images={images} setImages={setImages} />

          {/* ORDER */}
          <InputContainer>
            <Label htmlFor="order">Orden de relevancia</Label>
            <SelectOrderInput value={formProductData.order} onChange={handleInputChange} name="order">
              <option value={5}>5</option>
              <option value={4}>4</option>
              <option value={3}>3</option>
              <option value={2}>2</option>
              <option value={1}>1</option>
            </SelectOrderInput>
          </InputContainer>

          {/* STOCK */}
          <InputContainer>
            <Label htmlFor="outOfStock">Fuera de stock</Label>
            <SelectOrderInput
              value={formProductData.outOfStock ? 'si' : 'no'}
              onChange={handleOutOfStockChange}
              name="outOfStock"
            >
              <option value="si">Si</option>
              <option value="no">No</option>
            </SelectOrderInput>
          </InputContainer>

          {/* **** */}
          {/* TAGS */}
          {/* **** */}

          <InputContainer>
            <Label>Tags</Label>
            <TagsContainer>
              {/* S */}
              <CheckContainer>
                <CheckInput
                  type="checkbox"
                  checked={formProductData.tags.some((el) => el === 'S')}
                  onChange={handleCheckboxChange}
                  name="S"
                />
                <Label htmlFor="S">Talle S</Label>
              </CheckContainer>

              {/* M */}
              <CheckContainer>
                <CheckInput
                  type="checkbox"
                  checked={formProductData.tags.some((el) => el === 'M')}
                  onChange={handleCheckboxChange}
                  name="M"
                />
                <Label htmlFor="M">Talle M</Label>
              </CheckContainer>

              {/* L */}
              <CheckContainer>
                <CheckInput
                  type="checkbox"
                  checked={formProductData.tags.some((el) => el === 'L')}
                  onChange={handleCheckboxChange}
                  name="L"
                />
                <Label htmlFor="L">Talle L</Label>
              </CheckContainer>

              {/* XL */}
              <CheckContainer>
                <CheckInput
                  type="checkbox"
                  checked={formProductData.tags.some((el) => el === 'XL')}
                  onChange={handleCheckboxChange}
                  name="XL"
                />
                <Label htmlFor="XL">Talle XL</Label>
              </CheckContainer>
            </TagsContainer>
          </InputContainer>
        </FormInputsContainer>

        <ButtonsContainer style={{ display: 'flex' }}>
          <ButtonInput type="submit">Editar producto</ButtonInput>
        </ButtonsContainer>
      </FormStyle>

      {uploading && (
        <UploadingContainer>
          <Loader />
        </UploadingContainer>
      )}
    </>
  );
};

export default EditProductPage;
