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
        console.log(URL);

        //Llamada a la API
        const data = await res.json();
        const recipes = data.data.recipe;


        return recipes;
    }
    catch(err)
    {
      alert(`Se tiene un error al obtener la informacion de la API\n ${err}`);
      throw err;
    }
    
}