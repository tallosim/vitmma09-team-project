import React, { useState, useRef } from 'react'
import {
	Container,
	Typography,
	CircularProgress,
	Button
} from '@mui/material'
import { QrReader } from 'react-qr-reader'
//import { BrowserQRCodeReader } from '@zxing/browser'

import Basket from './Basket'
import { apiServices } from '../Services'
import { isUUID } from '../Helpers'

const App = () => {
	const styles = {
		contanier: {
			backgroundColor: '#282c34',
			minHeight: '100vh',
			color: '#ffffff',
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		title: {
			fontWeight: 'bold',
			lineHeight: '1',
			maxWidth: '70%',
			margin: '5%',
		},
		circularProgress: {
			marginTop: '70%'
		},
		copyright: {
			justifyContent: 'flex-end',
			position: 'fixed',
			bottom: '3%'
		},
		camera: {
			width: '80%',
			maxHeigth: '70vh'
		},
		invalidBasket: {
			margin: '15px',
			height: '70vh',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			flexDirection: 'column',
			text: {
				fontVariant: 'small-caps',
				textAlign: 'center',
				maxWidth: '70%'
			},
			button: {
				margin: '30px'
			}
		}
	}
	const [basket, setBasket] = useState(null)
	const [loading, setLoading] = useState(false)

	const qrRef = useRef(null) //to stop use camaera

	const refresh = () => setBasket(null)

	const onResult = (result) => {
		console.log('QR code scanned!')
		console.log(result.text)

		if (result.text && isUUID(result.text) && !basket) {
			setLoading(true)
			apiServices.getProducts(result.text)
				.then(response => {
					setLoading(false)
					setBasket(response.data)
				})
				.catch(reason => {
					console.log('No bucket found!')
					setBasket('INVALID')
				})
		}
		else {
			console.log('Not valid UUID!')
			setBasket('INVALID')
		}
	}

	return (
		<Container style={styles.contanier}>
			<Typography variant='h2' style={styles.title} align='center'>
				Smart Basket
			</Typography>
			{!loading ?
				!basket
					? <div style={styles.camera}>
						<QrReader
							scanDelay={10}
							ref={qrRef}
							onResult={(result, error) => {
								if (result && !basket) {
									onResult(result)
									try {
										qrRef.current.stopCamera()
									}
									catch (error) {
									}
								}
							}}
						/>
						<video id='video' />
					</div>
					: basket === 'INVALID'
						? <div style={styles.invalidBasket}>
							<Typography style={styles.invalidBasket.text} variant='h4'>
								INVALID QR CODE
							</Typography>
							<Button
								variant='contained'
								size='large'
								style={styles.invalidBasket.button}
								onClick={refresh}
							>
								Retry!
							</Button>
						</div>
						: <Basket data={basket} refresh={refresh} />
				: <CircularProgress size={80} style={styles.circularProgress} />
			}
			<Typography variant='h6' style={styles.copyright} align='center'>
				Máté Tallósi &copy; 2022
			</Typography>
		</Container >
	)
}

export default App
