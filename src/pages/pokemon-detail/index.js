import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { gql, useQuery } from '@apollo/client';
import { Row, Col, Breadcrumb, Input, Button, Modal } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import moment from 'moment'
import { storeMyPokemonList, storeTotalOwnedPokemon } from '../../action.js'

import NoImage from '../../assets/pokemon/no-image.jpg'

import Loading from '../../components/loading'
import Break from '../../components/break'
import LabelValue from '../../components/label-value'
import { LinkText } from '../../components/styled/general'
import {
    PokemonImageSection,
    PokemonImage,
    DetailContent,
    DetailListItem,
    ButtonContainer,
    TotalSection,
    TotalLabel,
    TotalValue,
    ErrorMessage
} from "../../components/styled/pokemon-detail";
import { TitleContext } from '../index'

export const GET_POKEMON_DETAIL = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      sprites {
        front_default
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
    }
  }
`;

function PokemonDetail(props) {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const titleContext = useContext(TitleContext);

    const [catchLoading, setCatchLoading] = useState(false)
    const [nickname, setNickname] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [location, setLocation] = useState()
    
    const url = window.location.hash.split('/')
    const pokemonName = url[url.length-1] !== "" ? url[url.length-1] : url[url.length-2]

    // Get Pokemon Detail data using GraphQl
    const { loading, error, data: result } = useQuery(GET_POKEMON_DETAIL, {
        variables: {name: pokemonName},
    });
    
    // Set Page Title
    useEffect(() => {
        setLocation(history.location.state)
        titleContext.changeTitle("Pokemon Detail")
        // eslint-disable-next-line 
    }, [])
    
    // Scroll to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const data = result?.pokemon
  
    // Function when "Catch Pokemon!" button clicked
    const catchPokemon = () => {
        setCatchLoading(true)

        setTimeout(() => {
            var randNum = Math.random();
      
            if (randNum < 0.5){
                setModalVisible(true)
            }else{
                Modal.warning({
                    title: (
                        <h3><span className="modal-header">{data.name}</span> fled!</h3>
                    ),
                    content: (
                        <div>
                            Better luck next time...
                        </div>
                    ),
                    okText: 'OK'
                });
            }
            setCatchLoading(false)
        }, 2000);
    }

    let timeout;
    // Check if the nickname not duplicate while typing
    const checkNickname = (input) => {
        setButtonDisabled(true)
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        async function fake() {
            if(input === "") {
                setErrorMessage('Nickname must be filled')
                setButtonDisabled(true)
                return
            }
            for(let i = 0; i < state.myPokemonList.length; i++) {
                if(state.myPokemonList[i].nickname.toLowerCase().trim() === input.toLowerCase().trim()){
                    setButtonDisabled(true)
                    setErrorMessage('There is already a pokemon with the same nickname. Please enter a different nickname.')
                    return
                }
            }
            setButtonDisabled(false)
            setNickname(input)
            setErrorMessage("")
        }
    
        timeout = setTimeout(fake, 300);
    }

    const savePokemon = () => {
        if(nickname !== "") {
            // Add the caught pokemon to MyPokemonList
            const myPokemonList = [{
                pokemonName: data.name,
                nickname: nickname,
                caughtTime: moment().format('DD MMM YYYY hh:mm:ss')
            }]
            dispatch(storeMyPokemonList(myPokemonList))
            
            // Set totalOwned of the caught pokemon
            let totalOwned = state.totalOwned

            if(!totalOwned[data.name]) {
                dispatch(storeTotalOwnedPokemon({
                    [data.name]: 1
                }))
            }else {
                dispatch(storeTotalOwnedPokemon({
                    [data.name]: totalOwned[data.name]+1
                }))
            }
            setModalVisible(false)
        }
    }
    
    const back = () => {
        if(location === undefined) {
            history.push('/')
        }else {
            history.goBack()
        }
    }
    
    const NoImageComponent = () => (
        <PokemonImage
            src={NoImage}
            alt="not-found"
        />
    )

    const ButtonSection = () => (
        <ButtonContainer>
            <TotalSection>
                <TotalLabel>Total Owned</TotalLabel>
                <TotalValue>{state.totalOwned[data?.name] ? state.totalOwned[data.name] : 0}</TotalValue>
            </TotalSection>
            <Break height={10} />
            <Button type="primary" onClick={catchPokemon}>Catch Pokemon!</Button>
        </ButtonContainer>
    )
  
    if (loading || catchLoading) return <Loading />
    if (error) return `Error! ${error.message}`

    return (
        <div className="pokemon-detail">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <LeftOutlined />
                    <LinkText onClick={back} id="breadcrumb">{titleContext.titleBefore}</LinkText>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <span>Pokemon Detail</span>
                </Breadcrumb.Item>
            </Breadcrumb>
            <Row gutter={0}>
                <Col xs={{ span: 24 }}>
                    <DetailContent>
                        <Row gutter={0}>
                            <Col xs={{ span: 24 }} md={{ span: 12 }}>
                                <PokemonImageSection>
                                    { data.sprites && data.sprites.front_default ?
                                        <PokemonImage
                                            src={data.sprites.front_default}
                                            alt="pokemon-front"
                                        />
                                    : <NoImageComponent /> }
                                </PokemonImageSection>
                            </Col>
                            <Col xs={{ span: 24 }} md={{ span: 12 }} style={{ marginTop: "20px" }}> 
                                <LabelValue label="Pokemon Name" value={ data.name ? data.name : "-" } />
                                <LabelValue label="Height" value={ data.height ? `${data.height} inch` : "-" } />
                                <LabelValue label="Weight" value={ data.weight ? `${data.weight} gram` : "-" } />
                            </Col>
                        </Row>
                    </DetailContent>
                </Col>
            </Row>
            <Row gutter={0}>
                <Col xs={{ span: 24 }} md={{ span: 12 }} className="border-right-default">
                    <DetailContent>
                        <Row gutter={0}>
                            <h2><strong>Moves</strong></h2>
                        </Row>
                        <Row gutter={0}>
                            {data.moves ?
                                data.moves.map(function(item, index){
                                    return(
                                        <Col xs={{ span: 12 }} key={index}>
                                            <DetailListItem>{item.move.name}</DetailListItem>
                                        </Col>
                                    )
                                })
                            :
                                ""
                            }
                        </Row>
                    </DetailContent>
                </Col>
                <Col xs={{ span: 24 }} md={{ span: 12 }} className="border-right-default">
                    <DetailContent>
                        <Row gutter={0}>
                            <h2><strong>Types</strong></h2>
                        </Row>
                        <Row gutter={0}>
                            {data.types ?
                                data.types.map(function(item, index){
                                    return(
                                        <Col xs={{ span: 24 }} key={index}>
                                            <DetailListItem>{item.type.name}</DetailListItem>
                                        </Col>
                                    )
                                })
                            :
                                ""
                            }
                        </Row>
                    </DetailContent>
                </Col>
            </Row>
            <ButtonSection />
            <Modal
                visible={modalVisible}
                closable={false}
                title={<h3><span className="modal-header">{data.name}</span> caught!</h3>}
                onOk={savePokemon}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setModalVisible(false)}>
                        Let it go
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        onClick={savePokemon}
                        disabled={buttonDisabled}
                        className={buttonDisabled && "btn-disabled"}
                    >
                        Save Pokemon
                    </Button>
                ]}
            >
                <div>
                    <h4>Input a nickname for your Pokemon</h4>
                    <Input
                        placeholder="Nickname"
                        onKeyUp={ e => checkNickname(e.target.value) }
                    />
                    <ErrorMessage>{errorMessage}</ErrorMessage>
                </div>
            </Modal>
        </div>
    )
}

export default PokemonDetail