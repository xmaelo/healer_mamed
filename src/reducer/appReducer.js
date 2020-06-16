

initialState = {
	data: null,
	casContact: null,
	id: 0,
	idMed: [],
	mess: null,
	header: false,
	infos: {},
	nameOb: {},
	date: null,
	converations: {},
	nom_contact_urgence: null,
	telephone_contact_urgence: null,
	contact: null,
}

function app(state = initialState, action) {

	console.log('in redurecer', action)
	let curentState = state;
  	switch (action.type) {
	  	case 'PUBLISH_JOURNAL':
	  		curentState = {...curentState, data: action.data}
	  		console.log('curentState', curentState);
	      	return curentState;
	    case 'UP_CONTACT_URGENCE':
	  		curentState = {
	  				...curentState, 
	  				nom_contact_urgence: action.data.nom_contact_urgence,
	  				telephone_contact_urgence: action.data.telephone_contact_urgence,
	  			}
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
	    case 'SET_CONTACT':
	  		curentState = {...curentState, contact: action.data}
	  		console.log('curentState', curentState);
	      	return curentState;
	    case 'ADD_CONVERT':
	    	let converation = action.data.converation;
	    	let idMedecin = action.data.idMed;
	    	if(state.idMed.indexOf(idMedecin) == -1){
		  		curentState = {...curentState, converations: {...state.converations, [idMedecin] : converation}}
		  		console.log('curentState', curentState);
		      	return curentState;
	    	}
	    	return;
	    case 'ACTU_CONVERT':
	    	console.log('actu covert')
	    	let converations = action.data.converation;
	    	let idMedecins = action.data.idMed;
	  		curentState = {...curentState, converations: {...state.converations, [idMedecins] : converations}}
	  		console.log('curentState', curentState);
	      	return curentState;
	  	default:
    		return curentState;
  }
}
export default app;