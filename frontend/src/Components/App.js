import React, { useState, useRef } from 'react'
import {
	Container,
	Typography
} from '@mui/material'
import { QrReader } from 'react-qr-reader'

import Basket from './Basket'

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
		copyright: {
			justifyContent: 'flex-end',
			position: 'fixed',
			bottom: '3%'
		},
		camera: {
			width: '80%',
			maxHeigth: '70vh'
		}
	}

	const refresh = () => setQrData(null)

	const [qrData, setQrData] = useState(null)
	const qrRef = useRef(null) //to stop use camaera
	const basketID = 'ff23cb4d-57c9-4099-8cbf-30dd10d7cc4a'

	return (
		<Container style={styles.contanier}>
			<Typography variant='h2' style={styles.title} align='center'>
				Smart Basket
			</Typography>
			{!qrData
				? <div style={styles.camera}>
					<QrReader
						ref={qrRef}
						onResult={(result, error) => {
							if (result) {
								console.log('QR code scanned!')
								console.log(result)
								setQrData(result)
								this.qrRef.current.stopCamera()
							}
						}}
					/>
				</div>
				: <Basket basketID={basketID} refresh={refresh} />
			}
			<Typography variant='h6' style={styles.copyright} align='center'>
				Máté Tallósi &copy; 2022
			</Typography>
		</Container >
	)
}

export default App
