import { TIMEOUT_SEC } from './config.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};


export const  getJson = async function(URL)
{
    try
    {
      

        const fetchPro = fetch(URL);
        const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
        console.log(fetchPro);

        //Llamada a la API
        const datas = await res.json();
        //console.log( datas.data.recipes)
       // const recipes = datas.data.recipe;
       const recipes = datas.data;

        return recipes;
    }
    catch(err)
    {
      alert(`Se tiene un error al obtener la informacion de la API\n ${err}, ${URL}`);
      throw err;
    }
    
}