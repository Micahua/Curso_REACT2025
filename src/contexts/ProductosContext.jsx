import React, { createContext, useState, useContext } from 'react';
import { crearProducto, editarProductoFirebase, eliminarProductoF, obtenerProductoEnFirebase, obtenerProductosF } from '../auth/firebase';
// Crear el contexto de de los productos
const ProductosContext = createContext();
export function ProductosProvider({ children }) {
    const [productos, setProductos] = useState([])
    const [productoEncontrado, setProductoEncontrado] = useState([])
    const [productosOriginales, setProductosOriginales] = useState([])

    function obtenerProductos() {
        return(
            new Promise((res, rej) => {
                fetch('https://68100d8b27f2fdac24101ef5.mockapi.io/productos')
                    .then((respuesta) =>
                        respuesta.json()
                    )
                    .then((datos) => {
                        console.log(datos)
                        setProductos(datos)
                        res(datos)
                        //setCargando(false);
                    })
                    .catch((error) => {
                        console.log("Error", error)
                        //setError('Hubo un problema al cargar los productos.');
                        //setCargando(false);
                        rej(error)
                    })
                ;
            })
        )
    }

    const agregarProducto = (producto) => {
        return(
            new Promise(async (res, rej) => {
                try {
                    const respuesta = await fetch('https://68100d8b27f2fdac24101ef5.mockapi.io/productos', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(producto),
                    });

                    if (!respuesta.ok) {
                            throw new Error('Error al agregar el producto.');
                    }
                    const data = await respuesta.json();
                            console.log('Producto agregado:', data);
                            res(data)
                            //alert('Producto agregado correctamente');
                    } catch (error) {
                        console.error(error.message);
                        //alert('Hubo un problema al agregar el producto.');
                        rej(error.message)
                    }
            })
        )
    };

    function obtenerProducto(id){
        return(
            new Promise((res, rej) => {
               fetch("https://68100d8b27f2fdac24101ef5.mockapi.io/productos")
                .then((res) => res.json())
                .then((datos) => {
                    const productoEncontrado = datos.find((item) => item.id === id);
                    if (productoEncontrado) {
                    setProductoEncontrado(productoEncontrado);
                    res(datos)
                    } else {
                        rej("Producto no encontrado")
                    }
                })
                .catch((err) => {
                    console.log("Error:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
            })
        )
    }

    function obtenerProductosFirebase(){
        return(
            new Promise((res, rej) => {
                obtenerProductosF().then(productos => {
                    setProductos(productos)
                    setProductosOriginales(productos)
                    res()
                }).catch(error => {
                    rej(error)
                })
            })
        )
    }

    function obtenerProductoFirebase(id){
        console.log("test1")
        return(
            new Promise((res, rej) => {
                obtenerProductoEnFirebase(id).then((producto) => {
                    setProductoEncontrado(producto)
                    console.log(producto)
                    res()
                }).catch((err) => {

                    console.log("Error:", err);
                    rej("Hubo un error al obtener el producto.");
                }); 
            })
        )
    }

    function editarProductoF(producto){
        return(
            new Promise((res, rej) => {
                editarProductoFirebase(producto).then(producto => {
                    setProductoEncontrado(producto)
                    //console.log(producto)
                    res()
                }).catch(error => {
                    rej (error)
                })
            })
        )
    }

    function eliminarProductoFirebase(id){
        return(
            new Promise((res, rej) => {
                eliminarProductoF(id).then(() => {
                    res()
                }).catch(error => {
                    rej(error)
                })
            })
        )
    }

    function editarProducto(producto){
        return(
            new Promise(async(res, rej) => {
            try {
                const respuesta = await fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${producto.id}`, {
                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(producto),
                });
                if (!respuesta.ok) {
                    throw new Error('Error al actualizar el producto.');
                }
                const data = await respuesta.json();
                res(data)
            } catch (error) {
                console.error(error.message);
                rej(error)
            }
            })
        )
    }

    const eliminarProducto = (id) => {
        const confirmar = window.confirm('¿Estás seguro de eliminar?');
        if (confirmar) {
            return(
                new Promise(async (res, rej) => {
                    try {
                        const respuesta = await fetch(`https://68100d8b27f2fdac24101ef5.mockapi.io/productos/${id}`, {
                        method: 'DELETE',
                        });
                        if (!respuesta.ok) throw new Error('Error al eliminar');
                        alert('Producto eliminado correctamente.');
                        res()
                    } catch (error) {
                        console.error(error.message);
                        alert('Hubo un problema al eliminar el producto.');
                        rej(error)
                    }
                })
            )
        }
    }

    function agregarProductoFirebase(producto){
        return(
            new Promise((res, rej) => {
                try{
                    crearProducto(producto)
                }catch(error){
                    console.log(error)
                    rej()
                }
            })
        )
    }

    function filtrarProductos(filtro){
        if(filtro.length < 0){
            setProductos(productosOriginales)
            return;
        }

        const productosFiltrados = productosOriginales.filter((producto) =>
            producto.name.toLowerCase().includes(filtro.toLowerCase())
        );
        setProductos(productosFiltrados)
    }

    return (
        <ProductosContext.Provider value={{ agregarProductoFirebase, filtrarProductos, eliminarProductoFirebase, editarProductoF, obtenerProductosFirebase, obtenerProductoFirebase, obtenerProductos, productos, agregarProducto, obtenerProducto, productoEncontrado, editarProducto, eliminarProducto }}>
        {children}
        </ProductosContext.Provider> 
    );
}
export const useProductosContext = () => useContext(ProductosContext);