

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
	region: {},
	location: {},
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

	    case 'SET_LOCALISATION':
	  		curentState = {...curentState, region: action.data.region, location: action.data.location}
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
	    case 'ADD_DATA':
	    	let slice = state.data.diagnostiques.slice();
	    	console.log('after op', slice.length)
	    	slice.push(action.data.diagnostique)
	    	console.log('before op', slice.length)
	    	console.log('before op slice', slice)
	    	console.log('data', slice.diagnostique)
	  		curentState = {...curentState,  
	  			data: {...curentState.data, 
	  			user: {...curentState.data.user,
	  			diagnostiques: slice
	  			}
	  		  }
	  		}
	      	return curentState;
	    case 'UPDATE_PROFILS':
	    	let personne = state.data.personne;
	    	personne.nom = action.data.nom;
	    	personne.prenom = action.data.prenom;
	    	personne.telephone = action.data.telephone;
	    	personne.email = action.data.email;
	  		curentState = {...curentState,  
	  			data: {...curentState.data, 
	  			user: {...curentState.data.user,
	  			personne: personne
	  			}
	  		  }
	  		}
	      	return curentState; 
	    case 'SET_IMAGE':
	    	let perss = state.data.personne;
	    	perss.image = action.data;
	  		curentState = {...curentState,  
	  			data: {...curentState.data, 
	  			user: {...curentState.data.user,
	  			personne: perss
	  			}
	  		  }
	  		}
	      	return curentState;
	    case 'ADD_CASCONTACT':
	    	let slices = state.data.personnes.slice();
	    	console.log('slice', slices.length)
	    	slices.push(action.data)
	    	console.log('before op', slices.length)
	    	console.log('before op slice', slices)
	    	console.log('data', slices.diagnostique)
	  		curentState = {...curentState,  
	  			data: {...curentState.data, 
	  			user: {...curentState.data.user,
	  			personnes: slices
	  			}
	  		  }
	  		} 
	      	return curentState;
	    case 'UPDATE_CASCONTACT':
	    	let pers = state.data.personnes.filter(per => per.id  === action.id)
	    	const items = state.data.personnes.slice();
	    	console.log('item', items)
	    	console.log('pers', pers)
	    	pers = pers[0];
	    	pers.personne.nom = action.data.nom
	    	pers.personne.prenom = action.data.prenom
	    	pers.personne.email = action.data.email
	    	pers.personne.sexe = action.data.sexe
	    	pers.lieurencontre = action.data.lieurencontre
	    	pers.daterencontre = action.data.daterencontre
	    	// console.log('pers after', pers)
	    	items.reverse().map((ss,i)=>{
			  if(ss.id===action.id){
			    items[i]=pers
			    console.log('mog ok')
			  }
			})
	    	console.log('item after', items)

	  		curentState = {...curentState,  
	  			data: {...curentState.data, 
	  			user: {...curentState.data.user,
	  			personnes: items
	  			}
	  		  }
	  		}
	      	return curentState;
	  	default:
    		return curentState;
  }
}
export default app;