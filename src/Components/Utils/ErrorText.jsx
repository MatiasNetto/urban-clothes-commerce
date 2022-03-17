import styled from 'styled-components';
import { useHistory, Link } from 'react-router-dom';

const Text = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
  text-align: center;
  margin-top: 2rem;
  color: #333;
`;

const GoBack = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 200;
  font-size: 1.1rem;
  text-decoration: underline #333 1px;
  margin-top: 1rem;
  color: #000;
  cursor: pointer;
`;

const GoHomeLink = styled(Link)`
  display: block;
  width: 100%;
  text-align: center;
  font-weight: 200;
  font-size: 1.1rem;
  text-decoration: underline #333 1px;
  margin-top: 1rem;
  color: #000;
  cursor: pointer;
`;

const ErrorText = ({ message, goBack = false }) => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return (
    <>
      <Text>{message}</Text>
      {goBack ? (
        <GoBack onClick={handleGoBack}>Volver atrás</GoBack>
      ) : (
        <GoHomeLink to="/">Volver al la tienda</GoHomeLink>
      )}
    </>
  );
};

export default ErrorText;
