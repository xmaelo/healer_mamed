

initialState = {
	data: null,
	casContact: null,
	id: 0,
	idMed: null,
	mess: null,
	header: false,
}

function app(state = initialState, action) {

	console.log('in redurecer', action)
	let curentState = state;
  	switch (action.type) {
	  	case 'PUBLISH_JOURNAL':
	  		curentState = {...curentState, data: action.data}
	  		console.log('curentState', curentState);
	      	return curentState;
	  	default:
    		return curentState;
  }
}
export default app;