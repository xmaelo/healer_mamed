import * as axios from 'axios';

export const baseUri = "https://covid.mamed.care";
export const urlMedia = baseUri + "/bundles/mamedcovid/assets/images/pictures/";
export const getPersonalData = async (uri) => {
	return await axios.get(baseUri+uri) 
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
      return response
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
export const getOneMessages = async (id1,id2) => {
  console.log(baseUri+'/api_v1/conversations/'+id1+'/recepteurs/'+id2+'.json')
  return await axios.get(baseUri+'/api_v1/conversations/'+id1+'/recepteurs/'+id2+'.json', { headers: { "Content-type": "application/json" } })
    .then( (response) => {
      console.log(" ====== response messages ===========",response); 
      return response
    })
    .catch( (error) => {
      console.log(error);    
    }); 
}
export const onSaveActivity = async (id, obj, idpers) => {
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


//covid.mamed.care/api_v1/diagnostiques/2.json


