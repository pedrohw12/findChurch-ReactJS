import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Header = styled.div`
  height: 70px;
  background: #00a8ff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LogoName = styled.h1`
  margin-left: 180px;
  color: #fff;
`;

export const ButtonArea = styled.div`
  display: flex;
  margin-right: 180px;
  background: #00a8ff;
  align-items: center;
`;

export const HomeButton = styled(Link)`
  background: #00a8ff;
  margin-right: 20px;
  border: none;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const CadastroButton = styled.button`
  background: #00a8ff;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const SearchArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #aaa;
  height: 400px;
`;

export const SearchImg = styled.img`
  width: 100%;
  height: 400px;
  z-index: 5;
  position: relative;
`;

export const SearchTitle = styled.h1`
  position: absolute;
  margin-top: 100px;
  font-weight: bold;
  color: #fff;
  z-index: 10;
`;

export const SearchInput = styled.input`
  position: absolute;
  margin-top: 160px;
  border-radius: 18px;
  width: 40%;
  border-style: none;
  padding: 10px;
  z-index: 10;
  background: #eee;
`;

export const SearchButton = styled.button`
  position: absolute;
  margin-top: 210px;
  background: #00a8ff;
  width: 150px;
  height: 40px;
  border-radius: 18px;
  border-style: none;
  color: #fff;
  font-weight: bold;
  font-size: 18px;
  z-index: 10;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const FinalFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 180px;
  margin-bottom: 20px;
`;

export const CopyRight = styled.h1`
  font-size: 12px;
`;

export const ModalArea = styled.div`
  display: flex;
  justify-content: center;
  border-radius: 4px;
  margin-left: 400px;
  margin-top: 174px;
  padding: 10px;
  width: 600px;
  height: 280px;
  background: #0097e6;
  position: absolute;
  z-index: 15;
`;

export const ModalTitle = styled.h1`
  position: absolute;
  z-index: 50;
  color: #fff;
  font-weight: bold;
`;

export const ModalInput = styled.input`
  position: absolute;
  margin-top: 50px;
  border-radius: 18px;
  width: 70%;
  border-style: none;
  padding: 10px;
  z-index: 15;
`;

export const ModalButton = styled.button`
  width: 300px;
  height: 50px;
  margin-top: 200px;
  margin-right: 0px;
  background: #00a8ff;
  z-index: 20px;
  border-radius: 25px;
  border-style: none;
  color: #fff;
  font-weight: bold;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

export const ModalClose = styled.button`
  width: 10px;
  height: 10px;
  z-index: 90;
  border-style: none;
  background: #0097e6;
  margin-left: 280px;
  position: absolute;
`;

export const ResultArea = styled.div`
  background: #fff;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemArea = styled.div`
  background: #eee;
  border-width: 1px;
  border-radius: 4px;
  width: 50%;
  margin: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const Info = styled.h1`
  margin: 5px;
  font-size: 14px;
`;
