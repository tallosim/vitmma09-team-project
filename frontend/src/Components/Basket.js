import React from 'react'
import {
    Container,
    Typography,
    Button,
} from '@mui/material'

import Product from './Product'
import { apiServices } from '../Services'

const Basket = ({ data, reset, setLoading }) => {
    const styles = {
        contanier: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        products: {
            margin: '15px',
            overflowY: 'scroll',
            height: '40vh'
        },
        noProducts: {
            margin: '15px',
            height: '40vh',
            display: 'flex',
            alignItems: 'center',
            text: {
                fontVariant: 'small-caps',
                textAlign: 'center'
            }
        },
        price: {
            margin: '5px',
            fontWeight: 'bold',
        },
        buttons: {
            display: 'flex',
            button: {
                margin: '5px',
                width: '150px'
            }
        }
    }

    const checkOut = () => {
        setLoading(true)
        setTimeout(() =>
            apiServices.checkOut(data.basket.basketID)
                .then(response => reset())
                .catch(reason => setLoading(false))
            , 500)
    }

    return (
        <Container style={styles.contanier}>
            <Typography variant='h3' align='center'>{data.basket.name}</Typography>
            <Typography variant='h4' align='center'>Products:</Typography>
            {data.products.length > 0
                ? <div style={styles.products}>
                    {data.products.map((product, index) => (
                        <Product key={index} product={product} />
                    ))}
                </div>
                : <div style={styles.noProducts}>
                    <Typography style={styles.noProducts.text} variant='h4'>NO products</Typography>
                </div>
            }
            <Typography variant='h4' align='center' style={styles.price}>
                SUM: {data.products.reduce((acc, product) => acc + product.price * product.items.length, 0)} Ft
            </Typography>
            <div style={styles.buttons}>
                {data.products.length > 0 &&
                    <Button variant='contained' size='large' style={styles.buttons.button} onClick={checkOut}>
                        Check out
                    </Button>
                }
                <Button variant='contained' color='secondary' size='large' style={styles.buttons.button} onClick={reset}>
                    Cancel
                </Button>
            </div>
        </Container >
    )
}

export default Basket