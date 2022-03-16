import { useEffect, useState } from 'react';
import styled from 'styled-components';
import getDayVisits from '../../Analytics/getDayVisits';
import getLastFiveMonths from '../../Analytics/getLastFiveMonths';
import getMonthVisits from '../../Analytics/getMonthVisits';
import getWeekVisits from '../../Analytics/getWeekVisits';
import BarGraphics from '../../Components/Admin/Graphics/BarsGraphic';
import Box from '../../Components/Admin/Graphics/Box';
import LineGraphic from '../../Components/Admin/Graphics/LineGraphic';
import SubtittleDivider from '../../Components/Texts/SubtittleDivider';
import Loader from '../../Components/Utils/Loader';
import { desktopMediaQuery } from '../../styles';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from '../../Firebase';
import useAuth from '../../auth/useAuth';
import useGetProductSells from '../../Hooks/useGetProductSells';
import SellsItem from '../../Components/Admin/Graphics/SellsItem';

const Tittle = styled.p`
  padding: 5px 0;
  margin: 0.5em 0 0 0;
  font-size: 1.8em;
  color: #222;
  text-align: center;
`;

const GraphicsContainer = styled.div`
  width: 92%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  ${desktopMediaQuery} {
    /* box-shadow: 0px 5px 7px #0004; */
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
    padding-left: 10px;
    margin-bottom: 10vh;
  }
`;

const BoxesContainer = styled.div`
  width: 100%;
  height: auto;

  ${desktopMediaQuery} {
    width: 92%;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
  }
`;

const SellsListContainer = styled.table`
  width: 92%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 8px #0001;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
`;

const SelectContainer = styled.div`
  width: 90vw;
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 1.3em;
`;

const SelectText = styled.p`
  font-size: 1.2em;
  margin-right: 10px;
`;

const SellsProductSelect = styled.select`
  width: fit-content;
  height: fit-content;
  font-size: 1.35em;
  background: transparent;
  border: none;
  border-bottom: 2px solid #000;
  cursor: pointer;
  outline: none;
`;

const AnalyticsAdminPage = () => {
  const [weekData, setWeekData] = useState();
  const [monthData, setMonthData] = useState();
  const [boxData, setBoxData] = useState({ todayVisits: 0, monthVisits: 0, productsAmount: 0 });
  const [categorySellsRequested, setCategorySellsRequested] = useState('all');
  const { setAdminMenu } = useAuth();
  const {
    productSells,
    loading: productSellsLoading,
    error: productSellsError,
  } = useGetProductSells(categorySellsRequested);

  const getProductsAmount = async (categorys) => {
    const requests = [...categorys.map((category) => getDocs(collectionGroup(db, category)))];
    const res = await Promise.all([...requests]);
    let total = 0;
    res.forEach((el) => (total += el.size));
    return total;
  };

  useEffect(() => {
    setAdminMenu(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    /*  [0] WeekVisits
        [1] MonthVisits
        [2] TodayViews
        [3] MonthViews
        [4] TotalProducts
        [5] AllSells
    */
    Promise.all([
      getWeekVisits(),
      getLastFiveMonths(),
      getDayVisits(new Date()),
      getMonthVisits(new Date()),
      getProductsAmount(['vinos', 'vodka', 'espumantes']),
    ]).then((res) => {
      setWeekData(res[0].reverse());
      setMonthData(res[1].reverse());
      setBoxData({ todayVisits: res[2].amount, monthVisits: res[3].amount, productsAmount: res[4] });
    });
  }, [setAdminMenu]);

  const handleChangeCategorySells = (e) => {
    setCategorySellsRequested(e.target.value);
  };

  if (!weekData) return <Loader />;

  return (
    <>
      <Tittle>Analytics</Tittle>
      <BoxesContainer>
        <Box data={{ tittle: 'Productos:', amount: boxData.productsAmount, logo: 'fas fa-tags' }} />
        <Box data={{ tittle: 'Visitas Hoy:', amount: boxData.todayVisits, logo: 'fas fa-user' }} />
        <Box data={{ tittle: 'Visitas Mes:', amount: boxData.monthVisits, logo: 'fas fa-users' }} />
      </BoxesContainer>
      <GraphicsContainer>
        <div>
          <SubtittleDivider text="Visitas Semanal" />
          <LineGraphic data={weekData} />
        </div>
        <br />
        <div>
          <SubtittleDivider text="Visitas Mensual" />
          <BarGraphics data={monthData} />
        </div>
      </GraphicsContainer>
      <SubtittleDivider text="Top productos vendidos" />

      <SelectContainer>
        <SelectText>Category: </SelectText>
        <SellsProductSelect onChange={handleChangeCategorySells} value={categorySellsRequested}>
          <option value="all">Todos</option>
          <option value="vinos">Vinos</option>
          <option value="vodka">Voka</option>
          <option value="espumantes">Espumantes</option>
        </SellsProductSelect>
      </SelectContainer>

      {productSellsLoading ? (
        <div style={{ height: '100vh' }}>
          <Loader />
        </div>
      ) : productSellsError?.error ? (
        <p>{productSellsError.message}</p>
      ) : (
        <>
          <SellsListContainer>
            <thead style={{ padding: '10px 0.5em', borderRadius: '3px', color: '#222' }}>
              <tr>
                <th style={{ textAlign: 'left', width: '10%', fontWeight: '500' }}>Top</th>
                <th style={{ textAlign: 'left', width: '100%', paddingLeft: '0.5em', fontWeight: '500' }}>Producto</th>
                <th style={{ textAlign: 'center', width: '100%', fontWeight: '500' }}>Ventas</th>
              </tr>
            </thead>
            <tbody>
              {productSells.map((sell, index) => (
                <SellsItem data={sell} key={index} dark={index % 2 === 0 ? false : true} index={index} />
              ))}
            </tbody>
          </SellsListContainer>
        </>
      )}
    </>
  );
};

export default AnalyticsAdminPage;
