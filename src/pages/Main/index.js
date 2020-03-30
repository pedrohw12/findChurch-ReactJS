import React, { useState } from 'react';

import { 
  Header, 
  LogoName, 
  ButtonArea, 
  HomeButton, 
  CadastroButton,
  SearchArea, 
  SearchTitle,
  SearchInput,
  SearchButton,
  SearchImg,
  FinalFooter,
  CopyRight,
  ModalArea,
  ModalTitle,
  ModalInput,
  ModalButton,
  ModalClose,
} from './styles';

function Main() {
  const [ openModal, setOpenModal ] = useState(false);

  function turnOnOff() {
    setOpenModal(!openModal);
  }

  return (
    <>
      {openModal &&
      <ModalArea props={openModal}>
        <ModalTitle> Cadastrar igreja </ModalTitle>
          <ModalInput placeholder="Nome da igreja" />
          <ModalInput placeholder="Onde ela está localizada ?" style={{marginTop: 100}} />
          <ModalInput placeholder="Informe o número de membros" style={{marginTop: 150}} />
          <ModalButton>
            Salvar
          </ModalButton>
        <ModalClose onClick={ () => turnOnOff() }>
          X
        </ModalClose>
      </ModalArea>
      }
      <Header>
        <div>
          <LogoName> Find </LogoName>
          <LogoName> Church </LogoName>
        </div>

        <ButtonArea>
          <HomeButton to="/"> 
            Home
          </HomeButton>
          <CadastroButton onClick={()=> turnOnOff()}>
            Cadastrar
          </CadastroButton>
        </ButtonArea>
      </Header>

      <SearchArea>
        <SearchImg src={require("../../assets/praying.png")} />
        <SearchTitle> Informe o nome da igreja </SearchTitle>
        <SearchInput placeholder="Pesquisar igreja..." />
        <SearchButton>
          Procurar
        </SearchButton>
      </SearchArea>

      <FinalFooter>
        <CopyRight>
          @ Copyright 2020 - Find Church
        </CopyRight>
      </FinalFooter>
    </>
  );
}

export default Main;