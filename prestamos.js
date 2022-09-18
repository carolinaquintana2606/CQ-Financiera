function CalculoTasa(cuotas){
    let tasa = 0;
    
       if (cuotas <= 12){
           tasa = 30;
       }
       else if ((cuotas > 12) && (cuotas <= 48)){
                   tasa = 35;
               }
               else if ((cuotas > 48) && (cuotas <= 72)){
                   tasa = 40;
               }
       else{
           tasa = 45;
       }
       return(tasa);
   }

function CuotasAdeudadas(cuotas, CuotaNum){
    CuotasAdeu = cuotas - CuotaNum;
    return (CuotasAdeu);
}

function SaldoCapital (capital, auxCuotaCap, CuotaNum){
    
    SaldoCap = capital - (auxCuotaCap * (CuotaNum-1));
    SaldoCap = SaldoCap.toFixed(2);
    SaldoCap = parseFloat(SaldoCap)
    return(SaldoCap);
}

function CuotaInteres(SaldoCap, tasa, cuotas){
    CuotaInt = ((SaldoCap * (tasa / 100) * cuotas) / (100 * 12));
    CuotaInt = CuotaInt.toFixed(2);
    CuotaInt = parseFloat(CuotaInt)
    return(CuotaInt);
}

function CalculoIVA(CuotaInt){
    CuotaIVA = CuotaInt * 0.21;
    CuotaIVA = CuotaIVA.toFixed(2);
    CuotaIVA = parseFloat(CuotaIVA)
    return(CuotaIVA);
}

function CuotaTotal(CuotaCap, CuotaInt, CuotaIVA){
    TotCuota = CuotaCap + CuotaInt + CuotaIVA;
    TotCuota = TotCuota.toFixed(2);
    TotCuota = parseFloat(TotCuota)
    return(TotCuota);
}

// Construcción del objeto Cuota que luego será parte del array Desarrollo
class Cuotas {
    constructor(CuotaNum, CuotasAdeu, SaldoCap, CuotaCap, CuotaInt, CuotaIVA, TotCuota){
        this.CuotaNum = CuotaNum;
        this.CuotasAdeu = CuotasAdeu;
        this.SaldoCap = SaldoCap;
        this.CuotaCap = CuotaCap;
        this.CuotaInt = CuotaInt;
        this.CuotaIVA = CuotaIVA;
        this.TotCuota = TotCuota;
    }
}

function CargaDesarrollo() {
    cuotas = document.getElementById("cuotas");
    cuotas = cuotas.value;
    capital = document.getElementById("capital");
    capital = capital.value;

    CuotaCap = capital / cuotas;
    CuotaCap = CuotaCap.toFixed(2);
    CuotaCap = parseFloat(CuotaCap);
   
    let tasa = CalculoTasa(cuotas);
    
    for (let i=1; i<=cuotas; i++){
        CuotaNum++;
        CuotasAdeu= CuotasAdeudadas(cuotas, CuotaNum);
        SaldoCap = SaldoCapital(capital, auxCuotaCap, CuotaNum);
        CuotaInt = CuotaInteres(SaldoCap, tasa, cuotas);
        CuotaIVA = CalculoIVA(CuotaInt);
        TotCuota = CuotaTotal(CuotaCap, CuotaInt, CuotaIVA);
        
        desarrollo.push(new Cuotas (CuotaNum, CuotasAdeu, SaldoCap, CuotaCap, CuotaInt, CuotaIVA, TotCuota));
        auxCuotaCap = CuotaCap;
    }
}

function mostrarDesarrollo(){
    let container = document.getElementById("simulador");
    container.innerHTML = `<thead>
                                <tr> 
                                <th>N° Cuota </th> 
                                <th>Cuotas adeudadas </th> 
                                <th>Saldo Capital </th> 
                                <th>Cuota Capital </th> 
                                <th>Interes </th> 
                                <th>IVA </th> 
                                <th>Total Cuota </th>
                            </tr>
                            </thead>`;

    let tbody = document.createElement("tbody")
    container.appendChild(tbody)
    desarrollo.forEach((cuota) => {
        let row = document.createElement("tr");
        row.innerHTML = `<td> ${cuota.CuotaNum}</td>
                        <td> ${cuota.CuotasAdeu}</td>
                        <td>$ ${cuota.SaldoCap}</td>
                        <td>$ ${cuota.CuotaCap}</td>
                        <td>$ ${cuota.CuotaInt}</td>
                        <td>$ ${cuota.CuotaIVA}</td>
                        <td>$ ${cuota.TotCuota}</td>`
        tbody.appendChild(row);
    });

    let btnSolicitar = document.createElement("button");
    btnSolicitar.setAttribute("id", "btnSolicitar")
    btnSolicitar.setAttribute("class", "btn")
    btnSolicitar.innerHTML = `Solicita tu préstamo`;
    let tablaSim = document.getElementById("tablaSim")
    tablaSim.appendChild(btnSolicitar);
    btnSolicitar.addEventListener("click", solicitarPrestamo)
}

function solicitarPrestamo(){

    let formSolicitar = document.getElementById("FormSolicitar")
    
    formSolicitar.innerHTML = ` <h3 class="fw-bold text-center">SOLICITÁ TU PRÉSTAMO</h3>
                                <div class="mb-3">
                                    <label for="name" class="form-label">Nombre y Apellido</label>
                                    <input type="text" class="form-control" id="nya">
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="text" class="form-control" id="email">
                                </div>
                                <div class="mb-3">
                                    <label for="phone" class="form-label">Celular</label>
                                    <input type="text" class="form-control" id="phone">
                                </div>
                                <div class="mb-3">
                                    <label for="dni" class="form-label">DNI</label>
                                    <input type="number" class="form-control" id="dni">
                                </div>
                                <div>
                                    <label for="staticCap" class="col-form-label">Capital Solicitado</label>
                                    <input type="number" readonly class="form-control-plaintext" id="CapSolicitado" value=${capital}>
                                </div>
                                <div>
                                    <label for="staticCuotas" class="col-form-label">N° de cuotas a devolver el préstamo</label>
                                    <input type="number" readonly class="form-control-plaintext" id="CuoSolicitado" value=${cuotas}>
                                </div>
                                <div>
                                    <label for="Password" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" id="password" aria-describedby="registro">
                                    <div class="form-text mb-3">Con tu DNI y esta contraseña podrás ingresar a realizar tus gestiones</div>
                                </div>
                                <div class="form-check">
                                    <input type="checkbox" class="form-check-input">
                                    <label class="form-check-label pb-0" for="check">Acepto los términos y condiciones</label>
                                </div>`

    formSolicitar.setAttribute("class", "d-inline-block")
    let modalInfoPrestamo = document.getElementById("modalInfoPrestamo")
    modalInfoPrestamo.setAttribute("class", "d-block")
    let btnModal = document.createElement("button")
    btnModal.setAttribute("class", "btn")
    btnModal.setAttribute("id", "btnEnviarSol")
    btnModal.setAttribute("data-bs-toggle", "modal")
    btnModal.setAttribute("data-bs-target", "#SolicitarPrestamoModal")
    btnModal.innerHTML = `Solicitar Préstamo`
    modalInfoPrestamo.appendChild(btnModal)

    modalInfoPrestamo.innerHTML += `
    
    <div class="modal fade modal" id="SolicitarPrestamoModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="SolicitudModalLabel">Solicitud Préstamo</h5>
        
      </div>
      <div class="modal-body">
        ¡Muchas gracias por llenar la solicitud! En breve nos contactaremos contigo. Iniciando sesión podrás ver el detalle del préstamo solicitado.
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" id="btnModalCerrar" data-bs-dismiss="modal">
            <a class="nav-link fw-normal" aria-current="page" href="index.html">Cerrar</a>
        </button>
        
      </div>
    </div>
  </div>
      
    </div>`

    

    let btnEnviarSol = document.getElementById("btnEnviarSol")
    btnEnviarSol.addEventListener("click", infoPrestamos)
    
}

class Clientes{
    constructor(id, CantCuotas, Capital, TotInteres, TotIVA, TotPrestamo){
        this.id = dni;
        this.CantCuotas = CantCuotas;
        this.Capital = Capital;
        this.TotInteres = TotInteres;
        this.TotIVA = TotIVA;
        this.TotPrestamo = TotPrestamo;
    }
}

class Usuarios{
    constructor(id, password){
        this.id = id;
        this.password = password;
    }
}

function infoPrestamos(){

    dni = document.getElementById("dni")
    dni = parseInt(dni.value);
    let CantCuotas = document.getElementById("cuotas")
    CantCuotas = parseInt(CantCuotas.value);
    capital = document.getElementById("capital");
    capital = parseInt(capital.value);
    
    let TotInteres = 0;
    for (acum of desarrollo){
        TotInteres +=acum.CuotaInt;
        TotInteres = TotInteres.toFixed(2)
        TotInteres = parseFloat(TotInteres)
    }
    let TotIVA = 0;
    for (acum of desarrollo){
        TotIVA += acum.CuotaIVA;
        TotIVA = TotIVA.toFixed(2)
        TotIVA = parseFloat(TotIVA)
    }
    let TotPrestamo = capital + TotInteres + TotIVA;

    
    prestamos.push(new Clientes (dni, CantCuotas, capital, TotInteres, TotIVA, TotPrestamo));
    
    localStorage.setItem("prestamos", JSON.stringify(prestamos))

}

function IniciarSesion(){
    user = document.getElementById("usuario")
    user = parseInt(user.value) 
    password = document.getElementById("contrasena")
    password = password.value
    usuarios.push(new Usuarios(user, password))
    localStorage.setItem("users", JSON.stringify(usuarios))
    sessionStorage.setItem("user", user)
}


function PrestamosUsuarios(){
    user = sessionStorage.getItem("user")
    console.log(user)

    let prestamoUsuario = document.getElementById("prestamoUsuario")
    prestamoUsuario.innerHTML = `<thead>
    <tr> 
        <th>DNI     </th> 
        <th>Cantidad de Cuotas      </th> 
        <th>Capital     </th> 
        <th>Intereses       </th> 
        <th>IVA     </th> 
        <th>Total a Devolver    </th>
    </tr>
    </thead>`
    
    let busquedaID = prestamos.filter((elem) => elem.id == user)
    //console.log(busquedaID)

    busquedaID.forEach((prestamo) =>{
        let row = document.createElement("tr");
        row.innerHTML = `<td> ${prestamo.id}</td>
                        <td> ${prestamo.CantCuotas}</td>
                        <td>$ ${prestamo.Capital}</td>
                        <td>$ ${prestamo.TotInteres}</td>
                        <td>$ ${prestamo.TotIVA}</td>
                        <td>$ ${prestamo.TotPrestamo}</td>`
        prestamoUsuario.appendChild(row);

    })
}


let desarrollo = [];
let prestamos = [];
let usuarios = [];
let CuotaNum = 0;
let cuotas = 0;
let CuotasAdeu = cuotas;
let CuotaCap = 0;
let capital = 0;
let SaldoCap = capital;
let dni;
let password;
let id;
let userEnSesion
let CantCuotas
let Capital
let TotInteres
let TotIVA 
let TotPrestamo
CuotaCap = capital / cuotas;
CuotaCap = CuotaCap.toFixed(2);
CuotaCap = parseFloat(CuotaCap);

let auxCuotaCap = 0; //la defino así ya que necesito que la 1° cuota de capital sea igual al capital

//Verifica si es válido la cantidad de cuotas de la simulación
let inputCuotas = document.getElementById("cuotas")
inputCuotas && inputCuotas.addEventListener("input",()=>{
        let inputCuotas2 = inputCuotas.value;
        if(inputCuotas2 > 96){
            Swal.fire({
                title: `Error`,
                text: `El valor ${inputCuotas2} es inválido. Por favor vuelva a completar recordando que puede ser 1 a 96 cuotas.`,
                icon: "error",
                confirmButtonText: "Entendido"
            })
        }
    })


//Carga del array Desarrollo
let btnSimulador =document.getElementById("btnSimular");
btnSimulador && btnSimulador.addEventListener("click", CargaDesarrollo)


// Mostrar desarrollo
btnSimulador && btnSimulador.addEventListener("click", mostrarDesarrollo);


//Enviar solicitud de préstamo
let btnEnviarSol = document.getElementById("btnEnviarSol")

btnEnviarSol && btnEnviarSol.addEventListener("click", infoPrestamos)

//trae la infomación del storage de los prestamos solicitados
localStorage.getItem("prestamos") ? prestamos = JSON.parse(localStorage.getItem("prestamos")) : prestamos.push(new Clientes (dni, CantCuotas, Capital, TotInteres, TotIVA, TotPrestamo))


//guarda en el storage usuario y contraseña
let login = document.getElementById("login")
login && login.addEventListener("click", IniciarSesion)

//Verifica si es un usuario "registrado"
let inputUsuario = document.getElementById("usuario")

inputUsuario && inputUsuario.addEventListener("change", ()=>{
        let inputUsuario2 = inputUsuario.value;
        
        let busqueda = prestamos.some((elem) =>elem.id == inputUsuario2)
       
       if(busqueda == false){
        Swal.fire({
            title: `Usuario Inválido`,
            text: `El usuario ${inputUsuario2} no existe. Por favor vuelva a completarlo.`,
            icon: "error",
            confirmButtonText: "Entendido"
        })
        }

    })


//trae la información del storage de los usuarios 
localStorage.getItem("users") ? usuarios = JSON.parse(localStorage.getItem("users")) : usuarios.push(new Usuarios(dni, password))

//mostrar prestamos del usuario
let VerPrestamos = document.getElementById("VerPrestamos")
VerPrestamos && VerPrestamos.addEventListener("click", PrestamosUsuarios)


