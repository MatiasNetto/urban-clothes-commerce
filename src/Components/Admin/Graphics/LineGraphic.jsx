import { CartesianGrid, Label, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';
import { desktopMediaQuery } from '../../../styles';

const Container = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  /* padding-right: 30px; */

  ${desktopMediaQuery} {
    overflow: hidden;
  }
`;

const CustomLineChart = styled(LineChart)`
  transform: translateX(-30px);
`;

const LineGraphic = ({ data }) => {
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
      <CustomLineChart
        width={graphicWidth}
        height={graphicHeigth}
        data={data}
        layout="horizontal"
        margin={{ right: 30, top: 30 }}
      >
        <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} />
        <XAxis dataKey="day">{/* <Label value="Dias" offset={0} position="bottom" /> */}</XAxis>
        <CartesianGrid stroke="#ccc5" strokeDasharray="10 10" />
        <YAxis dataKey="amount" name="visitas">
          <Label value="Visitas" offset={-25} position="insideTopRight" />
        </YAxis>
        <Tooltip animationDuration={0} />
      </CustomLineChart>
      {/* <p>Analytics</p> */}
    </Container>
  );
};

export default LineGraphic;
