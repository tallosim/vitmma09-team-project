import React, { useState, useRef } from 'react'
import {
	Container,
	Typography,
	CircularProgress,
	Button
} from '@mui/material'
import { BrowserQRCodeReader } from '@zxing/browser'
import Webcam from 'react-webcam'

import Basket from './Basket'
import { apiServices } from '../Services'
import { isUUID } from '../Helpers'

class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			basket: null,
			loading: false,
			videoInputDeviceId: null
		}

		this.codeReader = new BrowserQRCodeReader()
	}

	component

	render() {
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

		const { basket, loading } = this.state
		const setBasket = (basket) => this.setState({ basket })
		const setLoading = (loading) => this.setState({ loading })

		const reset = () => setBasket(null)

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

		const startScanning = mediaStream => setTimeout(() => {
			const videoElement = document.querySelector('video')
			if (videoElement) {
				this.codeReader.decodeFromVideoElement(videoElement, (result, error, controls) => {
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
				{!loading ?
					!basket
						? <Webcam style={styles.camera} onUserMedia={startScanning} />
						: basket === 'INVALID'
							? <div style={styles.invalidBasket}>
								<Typography style={styles.invalidBasket.text} variant='h4'>
									INVALID QR CODE
								</Typography>
								<Button
									variant='contained'
									size='large'
									style={styles.invalidBasket.button}
									onClick={reset}
								>
									Retry!
								</Button>
							</div>
							: <Basket data={basket} reset={reset} />
					: <CircularProgress size={80} style={styles.circularProgress} />
				}
				<Typography variant='h6' style={styles.copyright} align='center'>
					Máté Tallósi &copy; 2022
				</Typography>
			</Container >
		)
	}
}

export default App
