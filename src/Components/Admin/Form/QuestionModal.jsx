import { useContext } from 'react';
import reactDom from 'react-dom';
import styled from 'styled-components';
import { colorGreen, colorRed, desktopMediaQuery } from '../../../styles';
import { AdminFormContext } from '../../../Context/AdminFormContext';

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999999;
  justify-content: center;
  align-items: center;
  background: #0002;
  backdrop-filter: blur(2px);
`;

const Modal = styled.div`
  width: 90%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0px 2px 10px #0004;
  padding: 2em 1em;

  ${desktopMediaQuery} {
    width: 40%;
    padding: 4vh 6vh;
  }
`;

const Text = styled.p`
  height: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.3em;
  margin-bottom: 2em;
`;

const ButtonsContainer = styled.div`
  height: 30%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Button = styled.button`
  font-size: 1.3em;
  padding: 10px 20px;
  border: transparent;
  border-radius: 5px;
  background: ${({ color }) => color};
  color: #fff;
  cursor: pointer;

  ${desktopMediaQuery} {
    font-size: 1.5em;
    padding: 20px 40px;
  }
`;

const QuestionModal = () => {
  const { dataQuestionModal, closeQuestionModal } = useContext(AdminFormContext);
  const { question, callback } = dataQuestionModal;

  const handleClick = async () => {
    await callback();
    closeQuestionModal();
  };
  return reactDom.createPortal(
    <Container>
      <Modal>
        <Text>{question}</Text>
        <ButtonsContainer>
          <Button color={colorRed} onClick={closeQuestionModal}>
            No
          </Button>
          <Button color={colorGreen} onClick={handleClick}>
            Si
          </Button>
        </ButtonsContainer>
      </Modal>
    </Container>,
    document.getElementById('modal')
  );
};

export default QuestionModal;
