import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router'
import { Row, Col, Breadcrumb, Input, Button, Modal } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { storeMyPokemonList, storeTotalOwnedPokemon } from '../../action.js'

import { useGetPokemonDetail } from '../../graphQl/pokemon-detail'
import Pokeball from '../../assets/pokeball.gif'
import NoImage from '../../assets/pokemon/no-image.jpg'

import Break from '../../components/break'
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


const LabelValue = ({ span, lable, value }) => {
    return (
        <Col span={ span } className="" style={{ marginBottom: 5 }}>
            <h5 style={{ textTransform: 'uppercase', color: 'rgba(0,0,0,0.25)' }}>{ lable }</h5>
            <p style={{ textTransform: 'capitalize' }}>{ value }</p>
        </Col>
    )
}

function PokemonDetail() {
    const state = useSelector(state => state)
    const dispatch = useDispatch()
    const history = useHistory()
    const titleContext = useContext(TitleContext);

    const [loading, setLoading] = useState(false)
    const [nickname, setNickname] = useState("")
    const [buttonDisabled, setButtonDisabled] = useState(true)
    const [modalVisible, setModalVisible] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    
    const url = window.location.hash.split('/')
    const pokemonName = url[url.length-1] !== "" ? url[url.length-1] : url[url.length-2]

    // Get Pokemon Detail data from GraphQl
    const data = useGetPokemonDetail(pokemonName)

    // Set Page Title
    useEffect(() => {
        titleContext.changeTitle("Pokemon Detail")
        // eslint-disable-next-line 
    }, [])
    
    // Scroll to the top of the page
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    let timeout;
    const checkNickname = (input) => {
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
    
        timeout = setTimeout(fake, 500);
    }

    const savePokemon = () => {
        // input a nickname for caught pokemon and add to MyPokemonList
        if(nickname !== "") {
            const myPokemonList = [{
                pokemonId: data.id,
                pokemonName: data.name,
                nickname: nickname
            }]
            dispatch(storeMyPokemonList(myPokemonList))
            
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
  
    // Function when "Catch Pokemon!" button clicked
    const catchPokemon = () => {
        setLoading(true)

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
            setLoading(false)
        }, 2000);
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

    // Loading animation
    if(loading) return (
        <div className="loading">
            <img src={Pokeball} className="loading-img" alt="loading" />
        </div>
    )

    return (
        <div className="pokemon-detail">
            <Breadcrumb>
                <Breadcrumb.Item>
                    <LeftOutlined />
                    <LinkText onClick={() => history.goBack()} id="breadcrumb">{titleContext.titleBefore}</LinkText>
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
                                <LabelValue lable="Pokemon Name" value={ data.name ? data.name : "-" } />
                                <LabelValue lable="Height" value={ data.height ? `${data.height} inch` : "-" } />
                                <LabelValue lable="Weight" value={ data.weight ? `${data.weight} gram` : "-" } />
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
                                data.moves.map(function(item){
                                    return(
                                        <Col xs={{ span: 12 }}>
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
                                        <Col xs={{ span: 24 }}>
                                            <DetailListItem>{item.type.name} (slot: {item.slot})</DetailListItem>
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
            <Break height={50} />
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
                        loading={loading}
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