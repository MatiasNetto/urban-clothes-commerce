import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../auth/useAuth';
import { desktopMediaQuery } from '../../styles';

//assets
// import logoIMG from '../../assets/logos/Logo-V2.png';
// import homeIMG from '../../assets/buttons/Home-BTN.png';

const Container = styled.div`
  height: 90vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 80%;
  width: 90%;
  background: #eaeaff;
  box-shadow: 0 5px 30px #0005;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  ${desktopMediaQuery} {
    height: 70%;
    width: 40%;
  }
`;

const Logo = styled.img`
  height: 10vh;
  transform: translateY(20px) scale(180%);
`;

const InputContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const Label = styled.label`
  font-size: 2em;
`;

const Input = styled.input`
  height: 7vh;
  font-size: 2em;
  padding-left: 10px;
  border: 1px solid #009eff;

  &:focus {
    border: 3px solid #009eff;
    outline: none;
  }

  &::placeholder {
    font-size: 0.8em;
    opacity: 30%;
  }
`;

const InputSubmit = styled.input`
  height: 7vh;
  width: 80%;
  font-size: 2em;
  margin: 0 auto;
  cursor: pointer;
  background: #009eff;
  border: none;
`;

const HomeBtn = styled.img`
  width: 38px;
  position: absolute;
  top: 5px;
  left: 5px;
  cursor: pointer;
`;

// ${desktopMediaQuery} {
//     width: 50px;
//     top: 20px;
//     left: 20px;
//   }

const LoginPage = () => {
  const { login } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //hace login, en caso de ser correcto redirecciona a admin, si no muestra un error
    try {
      setLoading(true);
      await login(credentials.user, credentials.password);
      history.push('/admin');
    } catch (err) {
      switch (err.code) {
        case 'auth/user-not-found':
          alert('Usuario o contrasena incorrecta');
          break;
        default:
          alert(err.message);
          break;
      }
      console.log(err);
      setLoading(false);
    }
  };

  const handleHome = () => {
    history.push('/');
  };
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Logo src="" />
        <InputContainer>
          <Label htmlFor="user">Usuario</Label>
          <Input onChange={handleChange} type="text" name="user" id="user" placeholder="e-mail" />
        </InputContainer>
        <InputContainer>
          <Label htmlFor="password">Contrasena</Label>
          <Input onChange={handleChange} type="password" name="password" id="password" placeholder="password" />
        </InputContainer>

        <InputSubmit type="submit" value="Log In" disabled={loading} />
      </Form>

      <HomeBtn src="" onClick={handleHome} />
    </Container>
  );
};

export default LoginPage;
