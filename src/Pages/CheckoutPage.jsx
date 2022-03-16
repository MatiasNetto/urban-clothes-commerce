import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import whatsappIconImage from '../Assets/Images/Icons/whatsapp-brands.svg';
import genWhatsappMessage from '../Services/genWhatsappMessage';
import { desktopMediaQuery } from '../styles';

const CheckoutPageContainer = styled.div`
  ${desktopMediaQuery} {
    width: 40%;
    margin: 0 auto;
    margin-top: 2em;
  }
`;

const Title = styled.h4`
  font-size: 1.4em;
  font-weight: 400;
  padding: 1rem 1.5rem;

  ${desktopMediaQuery} {
    font-size: 1.5em;
  }
`;

const FormGroup = styled.form`
  width: 90%;
  margin: 0 auto;
  background: #fff;
  padding: 1.1rem;
  /* padding: 1rem 1.5rem 0 1.5rem; */
`;

const Subtitle = styled.h6`
  font-weight: 500;
  font-size: 1.1em;
  margin-bottom: 1em;

  ${desktopMediaQuery} {
    font-size: 1.2em;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1em;
  padding-bottom: 0.8rem;
  border-bottom: 1px solid #0003;

  ${desktopMediaQuery} {
    margin-bottom: 1.2em;
  }
`;
const RadioInput = styled.input`
  height: 1.8em;
  width: 1.8em;
  margin-right: 1em;
  cursor: pointer;
`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 1em;

  ${desktopMediaQuery} {
    font-size: 1.05em;
    cursor: pointer;
  }
`;

const CheckoutButton = styled.button`
  width: 90%;
  height: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 1em;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  background: #00e777;
  font-size: 1em;
  color: #fff;
  padding: 0;
  border: none;
  cursor: pointer;
  text-decoration: none;
  text-shadow: 0 0 8px #0008;

  ${desktopMediaQuery} {
    /* height: 4em; */
    width: 35%;
    bottom: 5vh;
    font-size: 1.2rem;
  }
`;

const WhatsappImage = styled.img`
  height: 1.8em;
  width: 1.8em;
  margin-right: 5px;
`;

const CheckoutPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryProducts = JSON.parse(query.get('products'));
  const queryTotal = query.get('total');
  const [formData, setFormData] = useState({ formaDePago: 'Efectivo', formaDeEntrega: 'Retiro en domicilio' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckoutButtonClick = () => {
    const message = genWhatsappMessage(queryProducts, queryTotal, formData);
    window.location.href = `https://wa.me/5491160015808?text=${message}`;
  };

  if (queryProducts === null || queryTotal === null) return <p>Lo sentimos, ocurrio un error</p>;

  return (
    <CheckoutPageContainer>
      <Title>Completa tu pedido</Title>
      <FormGroup>
        <Subtitle>Forma de pago:</Subtitle>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDePago"
            value="Efectivo"
            id="efectivo"
            checked={formData.formaDePago === 'Efectivo' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="efectivo">Efectivo</InputLabel>
        </InputContainer>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDePago"
            value="Transferencia bancaria"
            id="transferencia"
            checked={formData.formaDePago === 'Transferencia bancaria' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="transferencia">Transferencia bancaria</InputLabel>
        </InputContainer>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDePago"
            value="Mercado pago"
            id="mercado-pago"
            checked={formData.formaDePago === 'Mercado pago' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="mercado-pago">Mercado pago</InputLabel>
        </InputContainer>
      </FormGroup>
      <FormGroup>
        <Subtitle>Forma de entrega:</Subtitle>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDeEntrega"
            value="Retiro en domicilio"
            id="domicilio"
            checked={formData.formaDeEntrega === 'Retiro en domicilio' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="domicilio">Retiro en domicilio</InputLabel>
        </InputContainer>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDeEntrega"
            value="Envio por Correo"
            id="correo"
            checked={formData.formaDeEntrega === 'Envio por Correo' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="correo">Envio por correo</InputLabel>
        </InputContainer>
        <InputContainer>
          <RadioInput
            type="radio"
            name="formaDeEntrega"
            value="Punto de encuentro"
            id="punto-de-encuentro"
            checked={formData.formaDeEntrega === 'Punto de encuentro' ? true : false}
            onChange={handleInputChange}
          />
          <InputLabel htmlFor="punto-de-encuentro">Punto de encuentro</InputLabel>
        </InputContainer>
      </FormGroup>
      <CheckoutButton onClick={handleCheckoutButtonClick}>
        <WhatsappImage src={whatsappIconImage} />
        Completar pedido en whatsapp
      </CheckoutButton>
    </CheckoutPageContainer>
  );
};

export default CheckoutPage;
