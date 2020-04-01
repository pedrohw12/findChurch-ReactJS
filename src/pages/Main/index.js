import React, { useState, useEffect } from 'react';

import api from '../../services/api';

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
  const [ name, setName ] = useState();
  const [ locale, setLocale ] = useState();
  const [ numberMembers, setNumberMembers ] = useState();

  function turnOnOff() {
    setOpenModal(!openModal);
  } 

  async function getChurces() {
    try {
      const response = await api.get('/v1/churces');

      if (response.status === 200) {
        console.log(response.data)
      }
    } catch ({ response }) {
      console.log(response, ' ERROR')
    }
  }

  async function handleSubmit() {
    try {
      const response = await api.post('/v1/churces', {
        name,
        locale,
        numberMembers
      });

      if (response.status === 200) {
        console.log('RES: ', response.data);
      }

    } catch({response}) {
      console.log(response, ' ERROR');
    }
  }

  useEffect(() => {
    getChurces()
  }, [])

   return (
    <>
      {openModal &&
      <ModalArea props={openModal}>
        <ModalTitle> Cadastrar igreja </ModalTitle>
          <ModalInput onChange={ e => setName(e.target.value) } placeholder="Nome da igreja" />
          <ModalInput onChange={ e => setLocale(e.target.value) } placeholder="Onde ela está localizada ?" style={{marginTop: 100}} />
          <ModalInput onChange={ e => setNumberMembers(e.target.value) } placeholder="Informe o número de membros" style={{marginTop: 150}} />
          <ModalButton type="submit" onClick={() => handleSubmit()}>
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