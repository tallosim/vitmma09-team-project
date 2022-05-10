import React, { useState } from 'react'
import {
    Container,
    Typography,
    CircularProgress,
    Button,
} from '@mui/material'

import Product from './Product'

const Basket = ({ basketID }) => {
    const styles = {
        contanier: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        circularProgress: {
            marginTop: '50%'
        },
        products: {
            margin: '15px',
            overflowY: 'scroll',
            height: '50vh'
        },
        noProducts: {
            margin: '15px',
            height: '50vh',
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
        button: {
            margin: '5px'
        }
    }

    const [loading, setLoading] = useState(false)
    const data = JSON.parse('{"basket":{"basketID":"ff23cb4d-57c9-4099-8cbf-30dd10d7cc4a","name":"#001"},"products":[{"name":"Test Product","description":"This a very nice product","price":1000,"items":[{"lastReadTime":"2022-05-09T15:38:03.002Z","tagID":"046198CA3F5B81","status":"InBasket"}]}]}')

    return (
        <React.Fragment>
            {!loading
                ? <Container style={styles.contanier}>
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
                        SUM: {data.products.reduce((acc, product) => acc + product.price, 0)} Ft
                    </Typography>
                    <Button variant='contained' size='large' style={styles.button}>Check out!</Button>
                </Container >
                : <CircularProgress size={80} style={styles.circularProgress} />
            }
        </React.Fragment>

    )
}

export default Basket