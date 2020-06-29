import * as axios from 'axios';

export const baseUri = "https://covid19.mamed.care";
export const urlMedia = baseUri + "/bundles/mamedcovid/assets/images/pictures/";

export const getPersonalData = async (uri) => {
  console.log('before getJournale')
	return await axios.get(baseUri+uri)  
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}
export const getArrondissementData = async () => {
  const uri = "/api_v1/api/regions.json"
  return await axios.get(baseUri+uri) 
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}

export const updateCasContact = async (idUpdate, idPer, obj) => {
  const _com = '/api_v1/updates/'+idUpdate+'/cas/'+idPer+'/contacts.json';
  console.log('url', _com)
  return await axios.post(baseUri+_com, obj , { headers: { "Content-type": "application/json" } }) 
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}
export const updateProfils = async (idPer, obj) => {
  const _com = '/api_v1/updates/'+idPer+'/profils.json';
  console.log('url', _com)
  return await axios.post(baseUri+_com, obj , { headers: { "Content-type": "application/json" } }) 
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}
export const setImageRest = async (idPer, pic) => {
  const _com = '/api_v1/pictures/'+idPer+'/profileforapis.json';
  console.log('url', _com)
  return await axios.post(baseUri+_com, pic , { headers: { "Content-type": "multipart/form-data" } }) 
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}
export const updatePersonneUrgence = async (id, obj) => {
  const _com = '/api_v1/edits/'+id+'/urgences.json';
  return await axios.post(baseUri+_com, obj , { headers: { "Content-type": "application/json" } }) 
    .then( (response) => { 
      console.log(" =================",response.data);
      return response.data
    }) 
    .catch( (error) => {
      console.log(error);  
    });  
 
}

export const login = async (obj) => {
	return await axios.post(baseUri+'/api_v1/connects.json', obj , { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" =================",response); 
      return response
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}
export const onRegister = async (obj) => {
  return await axios.post(baseUri+'/api_v1/apis/registers.json', obj , { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" =================",response); 
      return response.data
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}

export const getAllMessages = async (id) => {
  return await axios.get(baseUri+'/api_v1/apis/'+id+'/pagemessage.json', { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" =================",response); 
      return response.data;
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}
export const onSendMessage = async (obj) => {
  console.log('obg', obj)
  return await axios.post(baseUri+'/api_v1/messages.json', obj , { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" =================",response); 
      return response.data;
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}
export const getOneMessages = async (id1,id2) => {
  console.log(baseUri+'/api_v1/conversations/'+id1+'/recepteurs/'+id2+'.json')
  return await axios.get(baseUri+'/api_v1/conversations/'+id1+'/recepteurs/'+id2+'.json', { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" ====== response messages ===========",response); 
      return response.data
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}
export const onSaveActivity = async (id, obj) => {
  console.log('in sactiviter', baseUri+'/api_v1/diagnostiques/'+id+'.json')
  return await axios.post(baseUri+'/api_v1/diagnostiques/'+id+'.json', obj , { headers: { "Content-type": "application/json" } })
    .then( async (response) => {
      // let response = await getPersonalData(idpers);
      return response
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}

export const onSaveCasContact = async (id, obj) => {
  console.log('in sactiviter', baseUri+'/api_v1/contacts/'+id+'.json')
  return await axios.post(baseUri+'/api_v1/contacts/'+id+'.json', obj , { headers: { "Content-type": "application/json" } })
    .then( async (response) => {
      // let response = await getPersonalData(idpers);
      return response
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}




//covid.mamed.care/api_v1/diagnostiques/2.json


