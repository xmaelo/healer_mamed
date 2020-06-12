

initialState = {
	data: null,
	casContact: null,
	id: 0,
	idMed: null,
	mess: null,
	header: false,
	infos: {},
	nameOb: {},
	date: null,
}

function app(state = initialState, action) {

	console.log('in redurecer', action)
	let curentState = state;
  	switch (action.type) {
	  	case 'PUBLISH_JOURNAL':
	  		curentState = {...curentState, data: action.data}
	  		console.log('curentState', curentState);
	      	return curentState;
	    case 'DISPACT_BASE_INFOS':
	  		curentState = {...curentState, infos: action.infos}
	  		console.log('curentState', curentState);
	      	return curentState;
	    case 'DISPATCH_NAME':
	  		curentState = {...curentState, nameOb: action.nameOb}
	  		console.log('curentState', curentState);
	      	return curentState;
	    case 'SET_DATE':
	  		curentState = {...curentState, date: action.date}
	  		console.log('curentState', curentState);
	      	return curentState;
	  	default:
    		return curentState;
  }
}
export default app;