import { Bar, BarChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { desktopMediaQuery } from '../../../styles';

const Container = styled.div`
  overflow: hidden;
  /* padding-right: 30px; */
  transform: translateX(-10px);

  ${desktopMediaQuery} {
    transform: translateX(0);
  }
`;

const BarGraphics = ({ data }) => {
  let graphicWidth;
  let graphicHeigth;

  if (window.innerWidth <= 996) {
    graphicWidth = window.innerWidth;
  } else {
    graphicWidth = window.innerWidth / 2.2;
  }

  if (window.innerWidth <= 996) {
    graphicHeigth = 300;
  } else {
    graphicHeigth = window.innerHeight / 2;
  }

  return (
    <Container>
      <BarChart width={graphicWidth} height={graphicHeigth} data={data} margin={{ right: 30, top: 30 }}>
        {/* <Line type="monotone" dataKey="amount" stroke="#8884d8" /> */}
        <XAxis dataKey="month" />
        {/* <CartesianGrid strokeDasharray="5 5" /> */}
        <YAxis dataKey="amount" />
        <Tooltip animationDuration={0} />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
      {/* <p>Analytics</p> */}
    </Container>
  );
};

export default BarGraphics;
