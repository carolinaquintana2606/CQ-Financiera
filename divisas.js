let cotizacion = document.getElementById("cotizacion")
let divisas = document.getElementById("divisas")
let dolar;
let euro;
let real;
class Cotizaciones{
    constructor (moneda, compra, venta){
        this.moneda = moneda;
        this.compra = compra;
        this. venta = venta;
    }
}

fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/nacion")
.then((response) => response.json())
.then ((dataDolar) => {
    console.log(dataDolar)
    cotizacion.innerHTML += `<tr><td>Dólar </td>
                            <td>${dataDolar.compra} </td>
                            <td>${dataDolar.venta} </td></tr>`
   dolar = new Cotizaciones("dolar", parseFloat(dataDolar.compra), parseFloat(dataDolar.venta))
   

    });

    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/euro/nacion")
    .then((response) => response.json())
    .then ((dataEuro) => {
        console.log(dataEuro)
        cotizacion.innerHTML += `<tr><td>Euro </td>
                                <td>${dataEuro.compra} </td>
                                <td>${dataEuro.venta} </td></tr>`
        euro = new Cotizaciones("euro", parseFloat(dataEuro.compra), parseFloat(dataEuro.venta))
    
        });

    fetch("https://cors-solucion.herokuapp.com/https://api-dolar-argentina.herokuapp.com/api/real/nacion")
        .then((response) => response.json())
        .then ((dataReal) => {
            console.log(dataReal)
            cotizacion.innerHTML += `<tr><td>Real </td>
                                    <td>${dataReal.compra} </td>
                                    <td>${dataReal.venta} </td></tr>`
            let div = document.createElement("div")
            div.innerHTML += `Actualizado a ${dataReal.fecha}`
            divisas.appendChild(div)
        real = new Cotizaciones("euro", parseFloat(dataReal.compra), parseFloat(dataReal.venta))
        
    });



function SimuladorDivisas(){
 operacion = document.getElementById("operacion")
 operacion = operacion.value
 moneda = document.getElementById("moneda")
 moneda = moneda.value
 CantDivisas = document.getElementById("CantDivisas")
 CantDivisas = parseInt(CantDivisas.value)
 console.log(CantDivisas)
 switch (operacion){
    case "compra": 
        switch (moneda){
            case "dolar":
             subtotal = CantDivisas * dolar.compra;
             console.log(subtotal)
                break;
            case "euro":
                subtotal = CantDivisas * euro.compra;
                break;
            case "real":
                subtotal = CantDivisas * real.compra;
                break;
    }
    break;

    case "venta":
        switch (moneda){
            case "dolar":
                subtotal = CantDivisas * dolar.venta;
                break;
            case "euro":
                subtotal = CantDivisas * euro.venta;
                break;
            case "real":
                subtotal = CantDivisas * real.venta;
                break;
        }
        break;
 }

 ImpGanancias = subtotal * 0.35;
 ImpPAIS = subtotal * 0.3;
 total = subtotal + ImpGanancias + ImpPAIS;


 let simDivisas = document.getElementById("simDivisas")
 simDivisas.innerHTML += `<table class="table text-center tablaDivisas">
 <thead>
 <tr>
   <th scope="col">Cantidad</th>
   <th scope="col">Subtotal</th>
   <th scope="col">Imp. a las ganancias</th>
   <th scope="col">Imp. PAIS</th>
   <th scope="col">Total</th>
 </tr>
</thead>
<tbody>
 <tr>
   <th scope="row">${CantDivisas}</th>
   <td>$ ${subtotal}</td>
   <td>$ ${ImpGanancias}</td>
   <td>$ ${ImpPAIS}</td>
   <td>$ ${total}</td>
 </tr>
</tbody>
</table>`

}

let operacion;
let moneda;
let CantDivisas;
let subtotal;
let ImpGanancias
let ImpPAIS
let total;


let btnSimDiv = document.getElementById("btnSimularDiv")
btnSimDiv && btnSimDiv.addEventListener("click", SimuladorDivisas)
