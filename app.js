const items =$('#items')
const carritoContainer = $('#carritoContainer')
const templateCards = $('#template-card').contents()
const templateCompras = $('#template-compras').contents()
var fragment = document.createDocumentFragment()
let carrito ={}

$(document).ready( () =>{
    fetchData()
})

const fetchData = async () => {
    try {
        const res = await fetch('api.json')
        const data = await res.json()
        paintCard(data)
    } catch (e) {
        console.log(e)
    }
}


const paintCard = data => {
    data.forEach(p => {
        $(templateCards).find('img').attr('src', `${p.img}`)
        $(templateCards).find('h4').html(`${p.title}`)
        $(templateCards).find('p').html(`${p.precio} CAD`)
        $(templateCards).find('img').attr('src', `${p.img}`)

        const clone = templateCards.clone(true)
        $(fragment).append(clone)
    })
    $(items).append(fragment)
}

$(items).click( (e) => {
    e.preventDefault()
    addCarrito(e)
})

const addCarrito = (e) => {
    if(e.target.classList.contains('card-img-top')){
        setCarrito(e.target.parentElement)
    }
    e.stopPropagation()
}

const setCarrito = objeto => {
    const producto = {
        id: $(objeto).find('img').attr('id'),
        title: $(objeto).find("h4").text(),
        precio: $(objeto).find("p").text().slice(0,3),
        cantidad: 1
    }
    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[producto.id].cantidad +1
    }
    carrito[producto.id] = {...producto}
    paintCarrito()
}

const paintCarrito = () => {
    $(carritoContainer).html("")
    Object.values(carrito).forEach(p => {
        $(templateCompras).find("p").html(`${p.cantidad}`)
        $(templateCompras).find("p").eq(1).html(`${p.title}`)
        $(templateCompras).find("p").eq(2).html(`${p.precio}`)
        $(templateCompras).find("p").eq(3).html(p.precio * p.cantidad)

        const clone = templateCompras.clone(true)
        $(fragment).append(clone)
    })
    $(carritoContainer).append(fragment)
}
