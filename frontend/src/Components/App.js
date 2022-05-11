import React, { useState } from 'react'
import {
	Container,
	Typography,
	CircularProgress,
	Button
} from '@mui/material'
import { BrowserQRCodeReader } from '@zxing/browser'
import Webcam from 'react-webcam'

import Basket from './Basket'
import { apiServices, socketService } from '../Services'
import { isUUID } from '../Helpers'

const codeReader = new BrowserQRCodeReader()

const ErrorView = ({ styles, errorMsg, reset }) => (
	<div style={styles.error}>
		<Typography style={styles.error.text} variant='h4'>
			{errorMsg}
		</Typography>
		<Button variant='contained' size='large' style={styles.error.button} onClick={reset}>
			Retry!
		</Button>
	</div>
)

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
		error: {
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
	const [errorMsg, setErrorMsg] = useState(null)

	const reset = () => {
		setBasket(null)
		setLoading(false)
		setErrorMsg(null)

		socketService.dispairSocket()
	}

	const getProducts = (basketID) => {
		apiServices.getProducts(basketID)
			.then(response => {
				setLoading(false)
				setBasket(response.data)
			})
			.catch(reason => {
				console.log(reason)

				const message = reason.response
					&& reason.response.status
					&& reason.response.status === 404
					? 'Basket not found this QR code.'
					: reason.message
				setLoading(false)
				setErrorMsg(message)
			})
	}

	const onResult = (result) => {
		console.log('QR code scanned!')
		console.log(result.text)

		if (result.text && isUUID(result.text) && !basket) {
			setLoading(true)
			socketService.pairSocket(result.text)
			socketService.listenSocket('RDID_READ', (data) => getProducts(result.text))
			getProducts(result.text)
		}
		else {
			setErrorMsg('Invalid QR code.')
		}
	}

	const startScanning = mediaStream => setTimeout(() => {
		const videoElement = document.querySelector('video')
		if (videoElement) {
			codeReader.decodeFromVideoElement(videoElement, (result, error, controls) => {
				if (result) {
					controls.stop()
					onResult(result)
				}
			})
		}
	}, 100)

	return (
		<Container style={styles.contanier}>
			<Typography variant='h2' style={styles.title} align='center'>
				Smart Basket
			</Typography>
			{basket && <Basket data={basket} reset={reset} setLoading={setLoading} />}
			{!basket && !errorMsg && <Webcam style={styles.camera} onUserMedia={startScanning} videoConstraints={{ video: { facingMode: 'environment' } }} />}
			{loading && <CircularProgress size={100} style={styles.circularProgress} />}
			{errorMsg && <ErrorView styles={styles} errorMsg={errorMsg} reset={reset} />}
			<Typography variant='h6' style={styles.copyright} align='center'>
				Máté Tallósi &copy; 2022
			</Typography>
		</Container >
	)
}

export default App
