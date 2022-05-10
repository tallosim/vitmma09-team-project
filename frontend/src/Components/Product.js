import React from 'react'
import {
    Typography,
    Paper,
    Divider
} from '@mui/material'

const Product = ({ product }) => {
    const styles = {
        paper: {
            height: '70px',
            width: '80vw',
            margin: '10px',
            padding: '5px 10px',
            display: 'flex',
            alignItems: 'center'
        },
        details: {
            name: {
                fontSize: '1.5rem',
                fontWeight: 'bold'
            },
            price: {
                fontSize: '1.1rem',
            },
            text: {
                width: '100%'
            },
            pice: {
                fontSize: '3rem',
                textAlign: 'center',
                width: '80px'
            }
        }
    }

    return (
        <Paper elevation={3} style={styles.paper}>
            <div style={styles.details.text}>
                <Typography style={styles.details.name}>{product.name}</Typography>
                <Typography style={styles.details.price}>{`${product.price} Ft`}</Typography>
            </div>
            <Divider orientation='vertical' flexItem />
            <Typography style={styles.details.pice}>{product.items.length}</Typography>
        </Paper>
    )
}

export default Product