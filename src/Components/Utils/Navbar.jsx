import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import styled, { css } from 'styled-components';
import { desktopMediaQuery } from '../../styles';
import useAuth from '../../auth/useAuth';
import { Link } from 'react-router-dom';
import cartShoppingImage from '../../Assets/Images/Icons/cart-shopping-solid.svg';
import { CartContext } from '../../Context/CartContext';

const Container = styled.div`
  width: 100%;
  height: 8vh;
  position: sticky;
  top: 0;
  z-index: 9999;
  background-color: #23394d; ;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: auto;

  ${desktopMediaQuery} {
    justify-content: space-between;
  }
`;

const BackArrow = styled.div`
  width: 8vh;
  height: 8vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding-left: 5px;

  & span {
    height: 3vh;
    width: 3vh;
    border-bottom: 3px solid #fff;
    border-right: 3px solid #fff;
    transform: rotate(135deg);
  }

  ${desktopMediaQuery} {
    display: none;
  }
`;

const LogoContainer = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  font-family: sans-serif;

  p {
    &:nth-child(2) {
      color: #fff;
    }
    &:nth-child(3) {
      font-size: 1.5rem;
      font-weight: 500;
      color: #e07924;
    }
  }
  svg {
    fill: #e07924;
    margin-right: 0.5rem;
  }
`;

const ShoppingCartContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 1.5vh;
  transform: translateY(4px);

  ${desktopMediaQuery} {
    margin: 0 2.5rem;
  }
`;

const CartShoppingImage = styled.img`
  height: 1.8em;
  width: 1.8em;
`;

const ShoppingCartPoint = styled.div`
  height: 1rem;
  width: 1rem;
  position: absolute;
  top: 0;
  right: -0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #dd2828;
  border-radius: 100%;
  color: #fff;
  font-size: 0.8rem;

  ${desktopMediaQuery} {
    top: 0.5em;
  }
`;

const Tittle = styled.h1`
  text-align: center;
  font-size: 1.2em;
  /* padding-right: 10px; */
  cursor: pointer;
  color: #fff;
`;

const Hamburger = styled.button`
  height: 8vh;
  width: 8vh;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  background: transparent;
  border: none;
  padding: 1.5vh 1.5vh;
  margin-left: 0px;
  cursor: pointer;

  ${desktopMediaQuery} {
    display: none;
  }
`;

const HamburgerCross = css`
  transform: translateX(-20px);
  background: transparent;
  &::after {
    transform: translateY(0) translateX(20px) rotate(45deg);
  }
  &::before {
    transform: translateY(0) translateX(20px) rotate(-45deg);
  }
`;

const HamburgerLinesClose = styled.div`
  height: 4px;
  width: 100%;
  position: relative;
  background-color: #fff;
  border-radius: 100px;
  transition: all 0.4s ease-in-out;
  &::before,
  &::after {
    content: '';
    display: inline-block;
    height: 4px;
    width: 100%;
    position: absolute;
    left: 0;
    background-color: #fff;
    border-radius: 100px;
    transition: all 0.4s ease-in-out;
  }
  &::after {
    transform: translateY(1.5vh);
  }
  &::before {
    transform: translateY(-1.5vh);
  }

  ${desktopMediaQuery} {
    height: 8px;
    &::before,
    &::after {
      height: 8px;
    }
    &::after {
      transform: translateY(1.8vh);
    }
    &::before {
      transform: translateY(-1.8vh);
    }
  }
  ${({ isOpen }) => {
    if (isOpen === true) {
      return HamburgerCross;
    }
  }}
`;

const Menu = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-between;
  list-style: none;

  @media screen and (max-width: 960px) {
    background-color: #23394d;
    position: absolute;
    top: 8vh;
    left: ${({ open }) => (open ? '0' : '-100%')}; //Import
    width: 100%;
    height: 93vh;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: 0.5s all ease;
  }
`;

const MenuItem = styled.li`
  height: 100%;
  @media screen and (max-width: 960px) {
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: ce;
    align-items: center;
  }
`;

const MenuItemLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0.5rem 2.5rem;
  color: #64b2ff;
  font-family: sans-serif;
  font-size: 1rem;
  font-weight: 300;
  cursor: pointer;
  text-decoration: none;
  transition: 0.5s all ease;
  &:hover {
    color: #fff;
    background-color: #e0792a;
    transition: 0.5s all ease;
    div {
      svg {
        fill: #23394d;
      }
    }
  }
  div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      display: none;
      fill: #e0792a;
      margin-right: 0.5rem;
    }
  }
  @media screen and (max-width: 960px) {
    width: 100%;
    div {
      width: 30%;
      justify-content: left;
      svg {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 880px) {
    div {
      width: 40%;
      justify-content: left;
      svg {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 500px) {
    div {
      width: 60%;
      justify-content: left;
      svg {
        display: flex;
      }
    }
  }
  @media screen and (max-width: 260px) {
    div {
      width: 100%;
      justify-content: left;
      svg {
        display: flex;
      }
    }
  }
`;

// const MobileIcon = styled.div`
//   display: none;
//   @media screen and (max-width: 960px) {
//     display: flex;
//     align-items: center;
//     cursor: pointer;
//     svg {
//       fill: #e07924;
//       margin-right: 0.5rem;
//     }
//   }
// `;

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const history = useHistory();
  const { logOut, adminMenu, setAdminMenu } = useAuth();
  const { cartProducts } = useContext(CartContext);

  // useEffect(() => {
  //   if (history.location.pathname.split('/').some((el) => el === 'dashboard')) {
  //     setAdminMenu(true);
  //   } else if (adminMenu) {
  //     setAdminMenu(false);
  //   }
  // }, [history]);
  const calcProductsAmount = () => {
    let total = 0;
    cartProducts.forEach((el) => {
      total = Number(total) + Number(el.amount);
    });
    return total;
  };

  const toggleMenu = () => {
    setShowMobileMenu((value) => !value);
  };

  const linkClick = (category) => {
    toggleMenu();
    history.push(`/category/${category}`);
  };

  const handleTittleClick = () => {
    history.push('/');
  };

  const adminLinkClick = (path) => {
    toggleMenu();
    history.push(path);
  };

  const handleLogOutClick = () => {
    toggleMenu();
    logOut();
    history.push('/');
  };

  return (
    <Container>
      <Wrapper>
        {/* <BackArrow onClick={goBack}>
          <span></span>
        </BackArrow> */}
        <Hamburger onClick={toggleMenu} isOpen={showMobileMenu}>
          <HamburgerLinesClose isOpen={showMobileMenu} />
        </Hamburger>
        <LogoContainer>
          <Tittle onClick={handleTittleClick}>Urban Clothes</Tittle>
        </LogoContainer>

        {window.innerWidth <= 996 && (
          <ShoppingCartContainer>
            <Link to="/cart">
              <CartShoppingImage src={cartShoppingImage} />
            </Link>
            <ShoppingCartPoint>{calcProductsAmount()}</ShoppingCartPoint>
          </ShoppingCartContainer>
        )}

        {/* <MobileIcon onClick={>{showMobileMenu ? 'close' : 'open'}</MobileIcon> */}

        {!adminMenu && (
          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink onClick={() => linkClick('remeras')}>
                <div>
                  {/* <FaHome /> */}
                  REMERAS
                </div>
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => linkClick('pantalones')}>
                <div>
                  {/* <FaUserAlt /> */}
                  PANTALONES
                </div>
              </MenuItemLink>
            </MenuItem>
            {window.innerWidth > 996 && (
              <MenuItem>
                <ShoppingCartContainer>
                  <Link to="/cart">
                    <CartShoppingImage src={cartShoppingImage} />
                  </Link>
                  <ShoppingCartPoint>{calcProductsAmount()}</ShoppingCartPoint>
                </ShoppingCartContainer>
              </MenuItem>
            )}
          </Menu>
        )}

        {adminMenu && (
          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink
                onClick={() => {
                  adminLinkClick('/');
                  setAdminMenu(false);
                }}
              >
                Home
              </MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => adminLinkClick('/dashboard/products')}>Products</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={() => adminLinkClick('/dashboard/analytics')}>Analytics</MenuItemLink>
            </MenuItem>
            <MenuItem>
              <MenuItemLink onClick={handleLogOutClick}>Cerrar sesion</MenuItemLink>
            </MenuItem>
          </Menu>
        )}
      </Wrapper>
    </Container>
  );
};

export default Navbar;
