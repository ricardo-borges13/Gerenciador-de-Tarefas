let obrigatorioNum = document.getElementById('obrigatorioNumero') 
let obrigatorioDesc = document.getElementById('obrigatorioDesc')
let obrigatorioData = document.getElementById('obrigatorioData')
let obrigatorioStatus = document.getElementById('obrigatorioStatus')
let inputNum = document.getElementById('inputNumero')
let inputDescricao = document.getElementById('inputDesc')
let inputData = document.getElementById('inputData')
let inputStatus1 = document.getElementById('selectStatus')


let obrigatorioUser = document.getElementById('obrigatorioUser')
let obrigatorioEmail = document.getElementById('obrigatorioEmail')
let obrigatoriosenha = document.getElementById('obrigatorioSenha')
let inputUser = document.getElementById('inputUser')
let inputEmail = document.getElementById('inputEmail')
let inputsenha = document.getElementById('inputSenha')

let obrUserEntrar = document.getElementById('obrigatorioUserEntrar')
let obrSenhaEntrar = document.getElementById('obrigatorioSenhaEntrar')
let inputUserEntrar = document.getElementById('inputUserEntrar')
let inputSenhaEntrar = document.getElementById('inputSenhaEntrar')


let idGlobal = -1
let ord = true
var pagina = 1
let dataAtual = new Date()
let mudarPagina = true
var userLogado = 'em branco'
let ip = '3.235.3.172'


function abrirModal(){  
    modal.style.display = 'block'            
}

function abrirModalCadastro(){  
  inputUserEntrar.value = ''
  inputSenhaEntrar.value = ''
  modal2.style.display = 'block'
  modal3.style.display = 'none'          
}

function abrirModalLogin(){
  modal3.style.display = 'block'
  inputUserEntrar.value = ''
  inputSenhaEntrar.value = ''
}

function fecharModalLogin(){  
  modal3.style.display = 'none'
}
//Função para fechar Modal Tarefas
function fecharModal(){   
    inputNum.value = ''
    inputDescricao.value = ''
    inputData.value = ''
    inputStatus1.value = ''
    //limpar os campos obrigatórios
    obrigatorioNum.innerHTML = ''    
    document.getElementById('inputNumero').style.backgroundColor = 'white' 
    obrigatorioDesc.innerHTML = ''    
    document.getElementById('inputDesc').style.backgroundColor = 'white'  
    obrigatorioData.innerHTML = ''    
    document.getElementById('inputData').style.backgroundColor = 'white' 
    obrigatorioStatus.innerHTML = ''    
    document.getElementById('selectStatus').style.backgroundColor = 'white'  
 
    modal.style.display = 'none' 
    //Alteração título Modal
    document.getElementsByTagName('h4')[0].innerHTML = 'Adicionar nova tarefa'
}
function fecharModalCadastro(){   
  //limpar input ao sair do modal
  inputUser.value = ''
  inputEmail.value = ''
  inputSenha.value = ''
  
  //limpar os campos obrigatórios
  obrigatorioUser.innerHTML = ''    
  document.getElementById('inputUser').style.backgroundColor = 'white' 
  obrigatorioEmail.innerHTML = ''    
  document.getElementById('inputEmail').style.backgroundColor = 'white'  
  obrigatorioSenha.innerHTML = ''    
  document.getElementById('inputSenha').style.backgroundColor = 'white' 
  modal2.style.display = 'none' 
  modal3.style.display = 'block'
}

//Função para validar o campo como obrigatório
function campoObrigatorio(campoInput,p){
    if(campoInput.value.length === 0){    
      p.innerHTML = '*Campo obrigatório'
      p.style.color = 'red'
      campoInput.style.backgroundColor = '#fafac9'      
    } 
}

// Função para retirar a msg de campo obrigatório quando clicar no input. 
function validarCampo(valorInput,valorP){ 
  document.getElementById(valorInput).style.backgroundColor = 'white'
  document.getElementById(valorP).innerHTML = ''
}

function logoff(){
  userLogado = 'xxx'
  document.getElementById('menu-entrar').innerHTML = `Entrar`
  document.getElementById('menu-entrar').style.color = '#694FA0'
  sair.style.display = 'none'
  cadastrar.style.display = 'block'
  pagina = 1
  modal3.style.display = 'block'
  inputUserEntrar.value = ''
  inputSenhaEntrar.value = '' 
  carregarTarefasVazia()
 }

//buscar as tarefas no API
const buscarTarefas = async (campo,param2) => {  
  const response = await fetch(`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&_sort=${campo}&_order=${param2}&_page=${pagina}&_limit=5`)
  const tarefas = await response.json()  
  return tarefas
}

//Função de Pesquisa rápida (botões)
const buscarTarefasPesquisa = async (cp1,cp2,cp3,cp4,operador,val1,val2,val3,val4) => {
  
  if ((val1.length>0) && (val2.length ===0) && (val3.length===0) ){
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp1}${operador}${val1}`)
   const tarefas = await response.json()
   return tarefas
  }

  if ((val1.length>0) && (val2.length >0) && (val3.length===0) ){    
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp1}${operador}${val1}&${cp2}${operador}${val2}`)
   const tarefas = await response.json()
   return tarefas
  }

  if ((val1.length>0) && (val2.length >0) && (val3.length>0) ){   
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp1}${operador}${val1}&${cp2}${operador}${val2}&${cp3}${operador}${val3}`)
   const tarefas = await response.json()
   return tarefas
  }

  if ((val1.length===0) && (val2.length >0) && (val3.length===0) ){   
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp2}${operador}${val2}`)
   const tarefas = await response.json()
   return tarefas
  }

  if ((val1.length===0) && (val2.length ===0) && (val3.length>0) ){   
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp3}${operador}${val3}`)
   const tarefas = await response.json()
   return tarefas
  }

  if (val4.length > 0){
   const response = await fetch (`http://${ip}:8000/vetorTarefas/?usuario=${userLogado}&${cp4}${operador}${val4}`)
   const tarefas = await response.json()
   return tarefas
  } 
}

//buscar os LOGIN no API 
const buscarLogin = async () =>{
 
  const response = await fetch(`http:${ip}:8000/login`)
  const login = await response.json()
  return login
}

//Função para validar login digitado
const validarLogin = async () =>{
  pagina = 1
  let verificarAcesso = true
  campoObrigatorio(inputUserEntrar,obrUserEntrar)
  campoObrigatorio(inputSenhaEntrar,obrSenhaEntrar)
  const logins = await buscarLogin()
  
  logins.forEach( (login) =>{
    if(login.user === inputUserEntrar.value && login.senha === inputSenhaEntrar.value){
      verificarAcesso = false    
      userLogado = login.user
      modal3.style.display = 'none'     
      document.getElementById('menu-entrar').innerHTML = `Olá, ${userLogado}`
      document.getElementById('menu-entrar').style.color = '#f39a2c'
      carregarTarefas()
      sair.style.display = 'block'
      cadastrar.style.display = 'none'
    }    
  }
  )
  
  if(verificarAcesso === true){ 
    alert('Usuário ou senha incorreta!')    
  } 
}

//Função para carregar tela vazia ao fazer logoff
const carregarTarefasVazia = () =>{ 
  let linha = ''
  let tbody = '' 
      tbody = document.getElementById('corpo-tabela')  
      linha =  `
      <tr>
          <td></td>
          <td></td>
          <td></td>
          <td </td>
          <td > 
              <a class="editar-deletar" href="#" > <img src="assets/imagens/editar ícone arnia .png"> </a> 
              <a class="editar-deletar" href="#" > <img src="assets/imagens/excluir ícone arnia.png"> </a> 
          </td>          
      </tr>    
      `       
      tbody.innerHTML = linha         
  }

//Função para carregar/mostrar as tarefas na página principal
const carregarTarefas = async (param1,param2) =>{  

  document.getElementById('grupo-avancar').style.display = 'block' 
  document.getElementById('seta-up').style.display = 'none'
   document.getElementById('paginas').innerHTML = `Página ${pagina}`
  mudarPagina = true
  let linha = ''
  let tbody = ''
  const tarefas = await buscarTarefas(param1,param2)
 
  tarefas.forEach((tarefa) => {
          let cor
          if(tarefa.status === 'Concluido'){
            cor = 'verde'
          }else {
            if(tarefa.status === 'Em andamento'){
              cor = 'laranja'
            } else {cor = 'vermelho'}      
          } 
      tbody = document.getElementById('corpo-tabela')  
      linha +=  `
      <tr>
          <td>${tarefa.numero}</td>
          <td>${tarefa.descricao}</td>
          <td>${tarefa.data.split('-').reverse().join('/')}</td>
          <td class='${cor}' >${tarefa.status}</td>
          <td > 
              <a class="editar-deletar" href="#" onclick="editar(${tarefa.id})"> <img src="assets/imagens/editar ícone arnia .png"> </a> 
              <a class="editar-deletar" href="#" onclick="deletarTarefas(${tarefa.id})"> <img src="assets/imagens/excluir ícone arnia.png"> </a> 
          </td>          
      </tr>    
      `             
  });
  tbody.innerHTML = linha    
  
  //Condição para não deixar avançar as páginas com resultado zerado
  if(tarefas.length ===0){
    if (pagina > 1){
    pagina --
     document.getElementById('paginas').innerHTML = `Página ${pagina}`  
    }  
  }
  // document.getElementById('paginas').innerHTML = `Página ${pagina}`
  
 
}
//Função para carregar/mostrar as tarefas na página principal
const carregarTarefasPesquisa = async (cp1,cp2,cp3,cp4,operador,val1,val2,val3,val4) =>{  
  let linha = ''
  let tbody = ''
  const tarefas = await buscarTarefasPesquisa(cp1,cp2,cp3,cp4,operador,val1,val2,val3,val4)
 
  tarefas.forEach((tarefa) => {
          let cor
          if(tarefa.status === 'Concluido'){
            cor = 'verde'
          }else {
            if(tarefa.status === 'Em andamento'){
              cor = 'laranja'
            } else {cor = 'vermelho'}      
          } 
      tbody = document.getElementById('corpo-tabela')  
      linha +=  `
      <tr>
          <td>${tarefa.numero}</td>
          <td>${tarefa.descricao}</td>
          <td>${tarefa.data.split('-').reverse().join('/')}</td>
          <td class='${cor}' >${tarefa.status}</td>
          <td > 
              <a class="editar-deletar" href="#" onclick=editar(${tarefa.id})> <img src="assets/imagens/editar ícone arnia .png"> </a> 
              <a class="editar-deletar" href="#" onclick=deletarTarefas(${tarefa.id})> <img src="assets/imagens/excluir ícone arnia.png"> </a> 
          </td>          
      </tr>    
      `             
  });
  tbody.innerHTML = linha    
  
  //Condição para não deixar avançar as páginas com resultado zerado
  if(tarefas.length ===0){
    alert('Resultado não encontrado')      
  }    
}

//Função para salvar e modificar uma tarefa
const salvarItem = async () => {  
  
       campoObrigatorio(inputNum, document.getElementById('obrigatorioNumero') );
       campoObrigatorio(inputDescricao, document.getElementById('obrigatorioDesc') );
       campoObrigatorio(inputData, document.getElementById('obrigatorioData') );
       campoObrigatorio(inputStatus1, document.getElementById('obrigatorioStatus') );
       
      //Se todas as condições abaixo forem diferente de vazio, salva os dados. 
      if (inputNum.value.length !== 0 && inputDescricao.value.length !==0 && inputData.value.length !==0 && inputStatus1.value.length !==0){   
        
        if (idGlobal < 0){ 
              
              const tarefas = {
              numero: parseInt(inputNum.value) ,
              descricao: inputDescricao.value,
              data: inputData.value,
              status: inputStatus1.value,
              usuario: userLogado              
            }

            const cadastrarTarefas = await fetch(`http://${ip}:8000/vetorTarefas`, {
              method: 'POST',  
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(tarefas)
              
          })      
        } else {              
                const tarefas = {
                numero: parseInt(inputNum.value) ,
                descricao: inputDescricao.value,
                data: inputData.value,
                status: inputStatus1.value,
                usuario: userLogado 

              }
              const alterarTarefas = await fetch(`http://${ip}:8000/vetorTarefas/${idGlobal}`, {
                  method: 'PUT',  
                  headers:{
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(tarefas)
              })    
              
              idGlobal = -1
              alert('Documento salvo com sucesso!')
        } 
         //após salvar limpar os campos do modal
         inputNum.value = ''
         inputDescricao.value = ''
         inputData.value = ''
         inputStatus1.value = ''            
      }    
      modal.style.display = 'none'      
      carregarTarefas()          
}
//Salvar Cadastro USUÁRIO 
const salvarCadastro = async () => {  

  campoObrigatorio(inputUser, document.getElementById('obrigatorioUser') );
  campoObrigatorio(inputEmail, document.getElementById('obrigatorioEmail') );
  campoObrigatorio(inputSenha, document.getElementById('obrigatorioSenha') );

   //Se todas as condições abaixo forem diferente de vazio, salva os dados. 
 if (inputUser.value.length !== 0 && inputEmail.value.length !==0 && inputSenha.value.length !==0 ){   
         const login = {
         user: inputUser.value,
         email: inputEmail.value,
         senha: inputSenha.value
       }

       const logins = await buscarLogin()
       let condicaoSalvar = true
       logins.forEach((login) =>{
         if((login.user===inputUser.value) || (login.email===inputEmail.value)){
          condicaoSalvar = false 
          
         } 
       })

       if (condicaoSalvar === true){
        const cadastrarTarefas = await fetch(`http://${ip}:8000/login`, {
              method: 'POST',  
              headers:{
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(login)              
          })  
          alert('Cadastro salvo com sucesso!')
          modal2.style.display = 'none'
          modal3.style.display = 'block'
       } else alert('Usuário ou E-mail já cadastrado!')
                
   
    //após salvar limpar os campos do modal
    inputUser.value = ''
    inputEmail.value = ''
    inputSenha.value = ''    
 } 
           
}

//Função para levar as informações para o modal e podermos editar.
const editar = async (id) =>{
  abrirModal() 
  idGlobal = id
  document.getElementsByTagName('h4')[0].innerHTML = 'Editar tarefa'
         
  const carregarModal = await fetch(`http://${ip}:8000/vetorTarefas/${id}`)    
  const tarefa = await carregarModal.json()
  console.log(tarefa)  

  inputNum.value = tarefa.numero
  inputDescricao.value = tarefa.descricao
  inputData.value = tarefa.data
  inputStatus1.value = tarefa.status        
}

const deletarTarefas = async (id) =>{
  const resultado = window.confirm('Certeza que deseja excluir o item?')  
  if(resultado === true){
    const deletar = await fetch(`http://${ip}:8000/vetorTarefas/${id}`, {
    method: 'DELETE',  
    headers:{
      'Content-Type': 'application/json'
    },      
  })   
  }  
  carregarTarefasVazia()
      carregarTarefas()
}

//Função para ordenar campos clicando no título
const ordenacao = (param1, param2) =>{
  if (param2 === 'true'){   
    carregarTarefas(param1, 'asc')
    ord = false    
  } else{   
    carregarTarefas(param1, 'desc')
    ord = true    
  }
}

//Função para abrir pesquisa avançada
const abrirFiltro = () => {
   document.getElementById('expandir-filtro').style.display = 'block'  
   document.getElementById('seta-up').style.display = 'block'  
   document.getElementById('seta-down').style.display = 'none'
    
}
//Função para fechar a pesquisa avançada
const recolherFiltro = () => {
  document.getElementById('expandir-filtro').style.display = 'none'  
  document.getElementById('seta-up').style.display = 'none'  
  document.getElementById('seta-down').style.display = 'block'
}

//Funções para mudar de página
const anterior = () => {
 if(pagina > 1){
  pagina -- 
 }
 if(mudarPagina ===true){
  carregarTarefas() 
 } else {
  carregarTarefasPesquisa()  
 }
  
}

const proximo = () =>{
  pagina ++  
  if(mudarPagina ===true){    
    carregarTarefas() 
   } else {
    carregarTarefasPesquisa()  
   }
 }

//Todas as funções abaixo são de filtros
const hoje = () =>{
  pagina = 1
  mudarPagina = false
  const operador = '='
  const dia = String(dataAtual.getDate()).padStart(2,'0')
  const mes = String(dataAtual.getMonth()+1).padStart(2, '0')
  const ano = dataAtual.getFullYear()
  const dataString = (`${ano}-${mes}-${dia}`)  
   carregarTarefasPesquisa('numero','descricao','data','status', `${operador}` ,'','', `${dataString}`,'') 
   document.getElementById('grupo-avancar').style.display = 'none'
}

const emAndamento = () => {
  pagina = 1
  mudarPagina = false
  const operador = '='
  carregarTarefasPesquisa('numero','descricao','data','status',`${operador}`,'','','','Em andamento')
  document.getElementById('grupo-avancar').style.display = 'none'
}

const concluido = () => {
  pagina = 1
  mudarPagina = false
  const operador = '='
  carregarTarefasPesquisa('numero','descricao','data','status',`${operador}`,'','','','Concluido')
  document.getElementById('grupo-avancar').style.display = 'none'
}

const parada = () => {
  pagina = 1
  mudarPagina = false
  const operador = '='
  carregarTarefasPesquisa('numero','descricao','data','status',`${operador}`,'','','','Parada')
  document.getElementById('grupo-avancar').style.display = 'none'
}

const atrasada = () =>{
  pagina = 1
  mudarPagina = false
  const operador = '_lte='
  const dia = String(dataAtual.getDate()).padStart(2,'0') - 1
  const mes = String(dataAtual.getMonth()+1).padStart(2, '0')
  const ano = dataAtual.getFullYear()
  const dataString = (`${ano}-${mes}-${dia}`)  
   carregarTarefasPesquisa('numero','descricao','data','status',`${operador}`,'','',`${dataString}`,'')
   document.getElementById('grupo-avancar').style.display = 'none'  
}

const filtrar = () => {  
  let operador = '='
  let numero = document.getElementById('FiltroNum').value
  let descricao = document.getElementById('FiltroDesc').value
  let data = document.getElementById('FiltroDate').value
  let status = ''

  if (numero.length === 0 && descricao.length === 0 && data.length === 0){
    carregarTarefas()
  } else {
    carregarTarefasPesquisa('numero','descricao','data','status',`${operador}`,`${numero}`,`${descricao}`,`${data}`,`${status}`) 
  }  
}

carregarTarefas()