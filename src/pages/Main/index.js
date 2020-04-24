import React, { useState, useEffect } from 'react';

import api from '../../services/api';
import logo from '../../assets/logo.svg';

import { 
  Header, 
  ButtonArea,
  ButtonEdit,
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
  const [ openModal, setOpenModal ] = useState(false);
  const [churceId, setChurceId] = useState('');
  const [ name, setName ] = useState("");
  const [ locale, setLocale ] = useState();
  const [ numberMembers, setNumberMembers ] = useState();
  const [ search, setSearch ] = useState();
  const [ churces, setChurces ] = useState([]);
  const [ isUpdate, setIsUpdate ] = useState(false);
  const [ searchResult, setSearchResult ] = useState([]);
  const [ success, setSuccess ] = useState(false);
  const [ show, setShow ] = useState(true);
  const [getError, setGetError] = useState(false);
  const [showAllChurch, setShowAllChurch] = useState(true);

  function toggleModal() {
    setOpenModal(!openModal);
    // setShow(true);
  }

  function updateChurceModal(churce) {
    setOpenModal(true);
    setIsUpdate(true);
    setChurceId(churce._id);
    setName(churce.name);
    setLocale(churce.locale);
    setNumberMembers(churce.numberMembers);
  }

  async function getChurceSearch() {
  try {
    const response = await api.get(`/v1/churces/${search}`);
      // const { name } = response.data;
      setSearchResult([response.data]);
      setSearch("");
      setShowAllChurch(false)
      setGetError(false);
    } catch (error) {
      setSearchResult([]);
      setSearch("");
      setGetError(true);
    } 
}

  async function updateChurce() {
    try {
      const response = await api.put(`/v1/churces/${churceId}`, {
        name,
        locale,
        numberMembers
      })

      if(response.status === 200) {
        console.log('UPDATE: ', response.data);
      }
    } catch({ response }) {
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
        setName("");
        setLocale("");
        setNumberMembers("");
        setSuccess(true);
        setShow(false);
      }
      
    } catch({response}) {
      if ( response.status === 400) {
        setShow(false);
      }
    }
  }

  useEffect(() => {
    api.get('/v1/churces').then(response => {
      setChurces(response.data)
    });
  }, [])

   return (
    <>
      {openModal &&
      <ModalArea props={openModal}>
        <ModalTitle> Cadastrar igreja </ModalTitle>
          <ModalInput onChange={ e => setName(e.target.value) } placeholder="Nome da igreja" value={name} />
          <ModalInput onChange={ e => setLocale(e.target.value) } placeholder="Onde ela está localizada ?" value={locale} style={{marginTop: 100}} />
          <ModalInput onChange={ e => setNumberMembers(e.target.value) } placeholder="Informe o número de membros" value={numberMembers} style={{marginTop: 150}} />
          {success &&
            <ModalSuccess> Cadastro realizado com sucesso ! </ModalSuccess>
          }
          {!success && !show &&
            <ModalSuccess> Erro. ! </ModalSuccess>
          }
          {show &&
            isUpdate ?
            <ModalButton type="submit" onClick={() => updateChurce()}>
              Salvar alterações
            </ModalButton> :
            <ModalButton type="submit" onClick={() => handleSubmit()}>
              Salvar
            </ModalButton>
          }
        <ModalClose style={{ color: '#fff' }} onClick={ () => toggleModal() }>
          X
        </ModalClose>
      </ModalArea>
      }
      <Header>
        <div>
          <img alt="logo" src={logo} style={{width: 120, marginLeft: 60}} />
        </div>

        <ButtonArea>
          <HomeButton to="/"> 
            Home
          </HomeButton>
          <CadastroButton onClick={()=> toggleModal()}>
            Cadastrar
          </CadastroButton>
        </ButtonArea>
      </Header>

      <SearchArea>
        <SearchImg src={require("../../assets/praying.png")} />
        <SearchTitle> Informe o nome da igreja </SearchTitle>
        <SearchInput onChange={e => setSearch(e.target.value)} placeholder="Pesquisar igreja..." value={search} />
        <SearchButton type="submit" onClick={() => getChurceSearch()}>
          Procurar 
        </SearchButton>
      </SearchArea>
        {churces && showAllChurch && !getError &&
          <ResultArea>
            <h1 style={{color: "#00a8ff", marginBottom: 25}}> Igrejas encontradas</h1>
            {
              churces.map(churce => (
                <ItemArea key={churce._id}>
                  <ButtonEdit onClick={() => updateChurceModal(churce)}>Editar</ButtonEdit>
                  <Info>Nome: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.name } </p>
                  <Info>Região: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.locale } </p>
                  <Info>Número de membros: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.numberMembers} membros </p>
                </ItemArea>
              ))
            }
          </ResultArea>
        }
        {searchResult && !showAllChurch && !getError &&
          <ResultArea>
            <h1 style={{color: "#00a8ff", marginBottom: 25}}> Igrejas encontradas</h1>
            {
              searchResult.map(churce => (
                <ItemArea key={churce._id}>
                  <ButtonEdit onClick={() => updateChurceModal(churce)}>Editar</ButtonEdit>
                  <Info>Nome: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.name } </p>
                  <Info>Região: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.locale } </p>
                  <Info>Número de membros: </Info>
                  <p style={{marginLeft: 4, marginBottom: 8}}> { churce.numberMembers} membros </p>
                </ItemArea>
              ))
            }
          </ResultArea>
        }

        {getError &&
        <ResultArea>
          <h1 style={{color: "#00a8ff", marginBottom: 25}}>Nada encontrado </h1>  
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