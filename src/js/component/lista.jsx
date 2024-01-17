import React, { useCallback, useEffect, useState } from "react";


export default function App() {

    const [lista, setLista] = useState(['Nain'])
    const [inputText, setInputText] = useState("")
    function handleChange(e) {
        setInputText(e.target.value)
    }

    function delateTask(i){
        setLista(lista.filter((t,index)=> i != index))
        
        let body = lista.filter((t,index)=> i != index);


        fetch('https://playground.4geeks.com/apis/fake/todos/user/linsenain', {
            method: "PUt",
            body: JSON.stringify(body),
             headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) throw Error('La response no funciona') // Será true (verdad) si la respuesta es exitosa.
                return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                console.log(data);
                setLista(lista.filter((t,index)=> i != index)); //esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
                alert('Ha habido un error intentalo mas tarde')
                console.log(error);
            });

        
    }
    function handleKeyPress(e) {
        if (e.key === 'Enter') {

            /* setLista((prev )=> prev.concat([inputText]));
             setInputText("");*/

            let body = lista.concat([{ "label": inputText, "done": false }]);


            fetch('https://playground.4geeks.com/apis/fake/todos/user/linsenain', {
                method: "PUt",
                body: JSON.stringify(body),
                 headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(resp => {
                    if (!resp.ok) throw Error('La response no funciona') // Será true (verdad) si la respuesta es exitosa.
                    return resp.json() // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
                })
                .then(data => {
                    //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                    console.log(data);
                    setLista((prev) => prev.concat([{ "label": inputText, "done": false }]))
                    setInputText(""); //esto imprimirá en la consola el objeto exacto recibido del servidor
                })
                .catch(error => {
                    //manejo de errores
                    alert('Ha habido un error intentalo mas tarde')
                    console.log(error);
                });
        }

    }






    useEffect(() => {
        fetch('https://playground.4geeks.com/apis/fake/todos/user/linsenain', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                if (!resp.ok) throw Error('La response no funciona')// Será true (verdad) si la respuesta es exitosa.
                return resp.json()// (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
            })
            .then(data => {
                //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
                setLista(data)//esto imprimirá en la consola el objeto exacto recibido del servidor
            })
            .catch(error => {
                //manejo de errores
               alert('error')
                console.log(error)
            });

    }, [])
    return (
        <div className="container" >
            <div className="InputList m-auto">
                <input  className="p-2 m-auto"style={{ borderBottom: " 2px red",width:"21",color:"white" }} onChange={handleChange} value={inputText} onKeyDown={handleKeyPress} type="text "  placeholder="Ingrese su nombre"></input>
            </div>
            <div className="ToDoList m-auto mt-3 " style={{ listStyle: "none", width: "39rem", height: "25rem" }} >
                <ul style={{ listStyle: "none" }}>
                    { lista.map((nombre  , i) => (
                        <div className="ItemsContainer m-auto p-3  mt-2 d-flex justify-content-between  align-items-center " style={{ background: "hsl(227, 19%, 72%)", height: "4rem", width: "21rem", borderRadius: "0.8rem",overflow:"hidden"}} >

                            <li className="text-white" aria-disabled="true" key={i}>{nombre.label}  </li>
                           <button style={{background:"hsl(227, 19%, 72%)",  border:"none"  }}><i className="fas fa-trash-alt"
                                onClick={() =>delateTask(i)}> </i> </button> 
                        </div>
                    )
                    )}
                    
                </ul>
            </div >

        </div >

    )
}
