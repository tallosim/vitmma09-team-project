import React from 'react'
import { createRoot } from 'react-dom/client'

import App from './Components/App'
import { socketService } from './Services'
import './Assets/index.css'

socketService.connectSocket()

createRoot(document.getElementById('app')).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
)
