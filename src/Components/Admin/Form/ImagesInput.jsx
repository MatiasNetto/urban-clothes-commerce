import { memo } from 'react';
import styled, { keyframes } from 'styled-components';
import { InputContainer, Label } from '../../../Pages/AdminPages/AddProductPage';
import imageHouse from '../../../Assets/Images/Icons/house-solid.svg';
import imageTrash from '../../../Assets/Images/Icons/trash-solid.svg';

const AddImageButton = styled.button`
  height: 4rem;
  width: 4rem;
  position: relative;
  margin: auto 0;
  cursor: pointer;
  background: #eee8;
  border: 1px dashed #ccc;
  border-radius: 4px;
  overflow: hidden;
`;

const AddImageSign = styled.p`
  font-size: 1.2em;
`;

const AddImageText = styled.p`
  font-size: 1em;
`;

const AddImageInput = styled.input`
  position: absolute;
  top: -2em;
  left: -2em;
  height: 500%;
  width: 500%;
  cursor: pointer;
  opacity: 0%;
`;

const imagePreviewApear = keyframes`
  0% {
    opacity: 10%;
  }
  100% {
    opacity: 100%;
  }
`;

const ImagePreviewContainer = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border: 1px solid #999;
  border-radius: 4px;
  margin-bottom: 1em;

  animation: ${imagePreviewApear} 0.5s;
`;

const HouseLogo = styled.img`
  height: 1.3em;
  width: 1.3em;
  margin-right: 10px;
  opacity: 85%;
`;

const HouseLogoDisabled = styled(HouseLogo)`
  opacity: 40%;
  transition: background 0.1s;
`;

const ImagePreviewSubcontainer = styled.div`
  width: 70%;
  display: flex;
  align-items: center;
  overflow-wrap: break-word;
`;

const ImageContainer = styled.div`
  height: 3.5em;
  width: 3.5em;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const ImageName = styled.p`
  color: #1890ff;
  font-size: 0.8em;
  margin-left: 1em;
  white-space: nowrap;
`;

const DeleteButton = styled.img`
  margin-right: 5px;
  height: 1.2em;
  width: 1.2em;
  opacity: 85%;
`;

const ImagesInput = ({ images, setImages }) => {
  const handleInputChange = (e) => {
    setImages([...images, ...e.target.files]);
    const files = [...e.target.files];
    files.forEach((file) => console.log(file));
    e.target.value = null;
  };

  const genPreview = (file) => {
    console.log(file);
    if (file.type === 'url') {
      return file.imageURL;
    } else {
      return URL.createObjectURL(file);
    }
  };

  const changeThumbnailImage = (name) => {
    const newThumbnail = images.filter((el) => el.name === name)[0];
    const rest = images.filter((el) => el.name !== name);

    setImages([newThumbnail, ...rest]);
  };

  const deleteImage = async (name, type) => {
    if (type === 'url') {
      const { imagePath } = images.filter((el) => el.name === name)[0];
      const status = await deleteImage(imagePath);
      if (!status) return;
    }
    setImages((images) => images.filter((el) => el.name !== name));
  };

  //TODO Cuando le haces click a una imagen que se abra el modal con la previsualizacion en grande

  return (
    <InputContainer>
      <Label htmlFor="imgs">Imagenes</Label>
      {images.length !== 0 &&
        images.map((image, i) => (
          <ImagePreviewContainer key={i}>
            {i === 0 && <HouseLogo src={imageHouse} />}
            {i !== 0 && <HouseLogoDisabled src={imageHouse} onClick={() => changeThumbnailImage(image.name)} />}
            <ImagePreviewSubcontainer>
              <ImageContainer>
                <Image src={genPreview(image)} alt={image.name} />
              </ImageContainer>
              {/* <ImageNameContainer> */}
              <ImageName>{image.name.slice(0, 10)}</ImageName>
              {/* </ImageNameContainer> */}
            </ImagePreviewSubcontainer>
            <DeleteButton src={imageTrash} onClick={() => deleteImage(image.name, image.type)} />
          </ImagePreviewContainer>
        ))}
      <AddImageButton type="button">
        <AddImageSign>+</AddImageSign>
        <AddImageText>Agregar</AddImageText>
        <AddImageInput type="file" name="image" multiple="multiple" onChange={handleInputChange} />
      </AddImageButton>
    </InputContainer>
  );
};

export default memo(ImagesInput);
