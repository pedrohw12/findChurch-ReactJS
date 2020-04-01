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
  ResultArea,
  ItemArea,
  Info
} from './styles';

function Main() {
  const [ openModal, setOpenModal ] = useState(false);
  const [ name, setName ] = useState();
  const [ locale, setLocale ] = useState();
  const [ numberMembers, setNumberMembers ] = useState();
  const [ search, setSearch ] = useState();
  const [ result, setResult ] = useState('zero');

  function turnOnOff() {
    setOpenModal(!openModal);
  } 

  async function getChurces() {
    try {
      const response = await api.get('/v1/churces');

      if (response.status === 200) {
        // console.log(response.data)
      }
    } catch ({ response }) {
      console.log(response, ' ERROR')
    }
  }

  async function getChurceSearch() {
      const response = await api.get(`/v1/churces/${search}`);

        const data = response.data;
        console.log(data.name);
        setResult(response.data);
        console.log(result);
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
        <SearchInput onChange={e => setSearch(e.target.value)} placeholder="Pesquisar igreja..." />
        <SearchButton type="submit" onClick={()=> getChurceSearch()}>
          Procurar
        </SearchButton>
      </SearchArea>

      
        {result !== "zero" &&
        <ResultArea>
        
          <h1 style={{color: "#0097e6", marginBottom: 25}}> Igrejas encontradas </h1>
          <ItemArea>
            <Info>Name: { result.name } </Info>
            <Info> Localization: { result.locale } </Info>
            <Info> Members: { result.numberMembers } </Info>
          </ItemArea>  
        
        </ResultArea>
        }
      

      <FinalFooter>
        <CopyRight>
          @ Copyright 2020 - Find Church
        </CopyRight>
      </FinalFooter>
    </>
  );
}

export default Main;