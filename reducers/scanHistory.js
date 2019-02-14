const scanHistory = function(state = {scanHistory:[]}, action) {
	
	switch (action.type) {
		case 'addScan':
			return {
				...state,
				scanHistory: [...state.scanHistory, action.scan]
			}
		case 'popFirstScan':
			state.scanHistory.shift()
			return {
					...state,
					scanHistory: [...state.scanHistory]
			}
			case 'popLastScan':
			state.scanHistory.pop()
			return {
					...state,
					scanHistory: [...state.scanHistory]
			}
		default:
			return state;
	}
	
}


export default scanHistory;
