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
  Info,
  ModalSuccess
} from './styles';

function Main() {
  const [ openModal, setOpenModal ] = useState(true);
  const [ name, setName ] = useState("");
  const [ locale, setLocale ] = useState();
  const [ numberMembers, setNumberMembers ] = useState();
  const [ search, setSearch ] = useState();
  const [ result, setResult ] = useState('zero');
  const [ success, setSuccess ] = useState(false);
  const [ show, setShow ] = useState(true);

  function turnOnOff() {
    setOpenModal(!openModal);
    setShow(true);
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
    try {
      const response = await api.get(`/v1/churces/${search}`);
        const data = response.data;
        console.log(data.name);
        setResult(response.data);
        console.log(result);
        setSearch("");
    } catch (error) {
      setResult("error")
    }
  }

  async function handleSubmit() {
    // try {
      const response = await api.post('/v1/churces', {
        name,
        locale,
        numberMembers
      });

      if (response.status === 200) {
        console.log('RES: ', response.data);
      }

      setName("");
      setLocale("");
      setNumberMembers("");
      setSuccess(true);
      setShow(false);
      if ( response.status === 400) {
        setSuccess(false);
        setShow(false);
      }
    // } catch({response}) {
    //   console.log(response, ' ERROR');
    //   setSuccess(false)
    //   setShow(false);
    // }
  }

  useEffect(() => {
    getChurces()
  }, [])

   return (
    <>
      {openModal &&
      <ModalArea props={openModal}>
        <ModalTitle> Cadastrar igreja </ModalTitle>
          <ModalInput onChange={ e => setName(e.target.value) } placeholder="Nome da igreja" value={name} />
          <ModalInput onChange={ e => setLocale(e.target.value) } placeholder="Onde ela está localizada ?" value={locale} style={{marginTop: 100}} />
          <ModalInput onChange={ e => setNumberMembers(e.target.value) } placeholder="Informe o número de membros" value={numberMembers} style={{marginTop: 150}} />
          {success && !show &&
            <ModalSuccess> Cadastro realizado com sucesso ! </ModalSuccess>
          }
          {!success && !show &&
            <ModalSuccess> Erro. ! </ModalSuccess>
          }
          {show &&
            <ModalButton type="submit" onClick={() => handleSubmit()}>
              Salvar
            </ModalButton>
          }
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
        <SearchInput onChange={e => setSearch(e.target.value)} placeholder="Pesquisar igreja..." value={search} />
        <SearchButton type="submit" onClick={()=> getChurceSearch()}>
          Procurar
        </SearchButton>
      </SearchArea>

      
        {result !== "error" && result !== "zero" &&
        <ResultArea>
        
          <h1 style={{color: "#00a8ff", marginBottom: 25}}> Igrejas encontradas </h1>
          <ItemArea>
            <Info>Nome: </Info>
            <p style={{marginLeft: 4, marginBottom: 8}}> { result.name } </p>
            <Info>Região: </Info>
            <p style={{marginLeft: 4, marginBottom: 8}}> { result.locale } </p>
            <Info>Número de membros: </Info>
            <p style={{marginLeft: 4, marginBottom: 8}}> { result.numberMembers} membros </p>
          </ItemArea>  
        </ResultArea>
        }

        {result === "error" &&
        <ResultArea>
          <h1 style={{color: "#00a8ff", marginBottom: 25}}> Nada encontrado </h1>  
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