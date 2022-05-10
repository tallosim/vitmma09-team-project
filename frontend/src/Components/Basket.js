import React, { useState } from 'react'
import {
    Container,
    Typography,
    Button,
} from '@mui/material'

import Product from './Product'

const Basket = ({ data, reset }) => {
    const styles = {
        contanier: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
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
                SUM: {data.products.reduce((acc, product) => acc + product.price, 0)} Ft
            </Typography>
            <Button
                variant='contained'
                size='large'
                style={styles.button}
            >
                Check out!
            </Button>
        </Container >
    )
}

export default Basket