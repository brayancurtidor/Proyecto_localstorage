//variables
const formulario=document.querySelector('#formulario');
const listadodetwits=document.querySelector('#lista-tweets');


eventosListado();
let tweets=[];  //arreglo para todos los twits que creemos


//eventos
function eventosListado()
{   //vento para cuando se crea un nuevo tweet
    formulario.addEventListener('submit',agregartweet)
    //cuando el docuemnto esta listo
    document.addEventListener('DOMContentLoaded',()=>{
        tweets=JSON.parse(localStorage.getItem('calendario'))||[];
        crearhtml();
    });


}




//funciones
function agregartweet(e)
{
    e.preventDefault(); //si nop se le agrega este evento, como que recarga la pagina asi bien feo 
    const tweetformulario=document.querySelector('#tweet').value;// obtener el valor que se escribe en la etiqueta 
    const tarefehca=document.querySelector('#tweet-fecha').value;
    const tareahora=document.querySelector('#tweet-hora').value;    
    //validacion
 if(tweetformulario.length<40)
 {
   
    //texarea en donde el usuario escribe
    
    if(tweetformulario===''||tarefehca===''||tareahora==='')
    {

        mostrarerroe('No puede ir vacio ');
    }
    else
    {
        const tweetobj={
            id:Date.now(),
            texto:tweetformulario, //pasandole el valor la la etiqueta
            fehaobj:tarefehca,
            horaob:tareahora
        }

             console.log('AGREGANDO ')
          //añadir al arreglo de twits
          tweets=[...tweets,tweetobj] //agregar al tweet anterior lo que el usuario escribe ahora
            console.log(tweets);

    //creando un html
    crearhtml();
    //resetera el formulario
    formulario.reset();
    }
 }
 else
 {
     alert("Ingrese un titulo no mayor a 40 letras");

     
 }
  

}
function mostrarerroe(mensaje)
{
const errormensaje=document.createElement('p');
errormensaje.textContent=mensaje;
errormensaje.classList.add('error');


//insertar en el contenido
const contenido=document.querySelector('#contenido')
//borrar el mensaje con un inervalo de tiempo
contenido.appendChild(errormensaje);
setTimeout(()=>{
errormensaje.remove();
},3000)
}
//creando html
function crearhtml()
{
    limpiarhtml();
    if(tweets.length>0)
    {
        tweets.forEach((tweetarreglo)=>{
            //agregar el boton de eliminar
            /*const btneliminar=document.createElement('a');
            btneliminar.classList.add('borrar-tweet');

            //agregar el evento de al boton de eliminar
            btneliminar.onclick=()=>{
                boorrartweet(tweetarreglo.id);
                
            }
            //crear el html 
            const li=document.createElement('li');
            
            btneliminar.innerText='Eliminar';
            //añadir el texto
            li.innerText=tweetarreglo.texto;
         
            //agregando el boton de eliminar
            li.appendChild(btneliminar);
            //ingresaral html informaion con li
            listadodetwits.appendChild(li);
           */
          


            const row=document.createElement('tr');
            row.innerHTML=`
            <td>
                ${tweetarreglo.texto}
            </td>
            <td>
                ${tweetarreglo.fehaobj}
            </td>
            <td>
                ${tweetarreglo.horaob}
            </td>
            <td>
           
            </td>
         
            `
            const btneliminar=document.createElement('a');
            btneliminar.classList.add('borrar-tweet');
            btneliminar.innerText='Eliminar'

            //agregar el evento de al boton de eliminar
            btneliminar.onclick=()=>{
                boorrartweet(tweetarreglo.id);
                         
            }
            row.appendChild(btneliminar);
            listadodetwits.appendChild(row);
        } );
    }
    sincronizarstorage();
}

//limpiar html
function limpiarhtml()
{
    while(listadodetwits.firstChild)
    {
        listadodetwits.removeChild(listadodetwits.firstChild)

    }

}
//agrega los tewea actuales al storage

function sincronizarstorage()
{
    localStorage.setItem('calendario',JSON.stringify(tweets));
}

function boorrartweet(id)
{   
     tweets=tweets.filter(tweetEliminar=> tweetEliminar.id !== id);      
      //console.log(`tratando de eliminar: ${id}`)      
       console.log(tweets) ; 
       crearhtml();       
}