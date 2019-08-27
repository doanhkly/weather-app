import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { useFetchWeather } from '../customHooks'

const Weather = () => {
    const [inputValue, setInputValue] = useState('')
    const [searchValue, setSearchValue] = useState('Seattle')

    const { data, error, loading } = useFetchWeather(
        '/.netlify/functions/getWeather',
        searchValue
      );

    return (
        <Container fluid={ true } className='d-flex align-items-center 
                justify-content-center w-100 flex-column' style={{height: '100vh'}}>   
            <Row>
                <h1 className='mb-5'>Find out the weather in your city</h1>
            </Row>
            <Form className='w-75' onSubmit={e =>
                {e.preventDefault()   
                setSearchValue(inputValue)} }>
                <Form.Group className='d-flex'>
                    <Form.Control 
                        className='mx-3 border-top-0 border-left-0 border-right-0' 
                        type='text' 
                        placeholder="What's the weather like in your city?" 
                        onChange={e => 
                            {e.preventDefault()
                            setInputValue(e.target.value)}}
                        value={inputValue}                      
                    />                
                    <Button variant='secondary' type='submit'>Search</Button>
                </Form.Group>          
                {error && <p style={{color: 'darkred', marginLeft:'15px'}}>Please enter a valid city name (e.g. Seattle)</p>}      
            </Form>  
            <React.Fragment>
                { (!loading && data) ? ( 
                    <Row className='align-items-center border rounded w-50'>
                        <Col className='d-flex flex-column align-items-center'>
                            <h1 className='text-bold mt-3'>{data.temp} °F</h1>
                            <Image className='align-self-center h-25 w-25'
                            src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                            alt='weather-icon' />
                            <h5>{data.weather[0].main}</h5>
                            <h1 className='my-4'>{data.city}, {data.country}</h1>
                        </Col>
                    </Row> 
                ) : (
                    <Row className='align-items-center border rounded w-50'>
                        <Col className='d-flex flex-column align-items-center'>
                            <p>Loading</p>                          
                        </Col>
                    </Row> 
                )}          
            </React.Fragment>           
        </Container>
    )
}

export default Weather;