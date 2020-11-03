function validarCaracter(valor, tipo)
{
  switch (tipo) {
    case 1:
      string = valor.value.replace(/[^a-zA-Zà-úÀ-Ú ]/g,'');
      valor.value = string;
      break;
    case 2:
      string = valor.value.replace(/[^a-zA-Z0-9 ]/g,'');
      valor.value = string;
      break;
    case 3:
      string = valor.value.replace(/[^a-zA-Z0-9à-úÀ-Ú ]/g,'');
      valor.value = string;
      break;
    case 4:
      string = valor.value.replace(/[^a-zA-Z ]/g,'');
      valor.value = string;
      break;
  }
}

function validarCPF(cpf) {  
  cpf = cpf.replace(/[^\d]+/g,'');  
  if(cpf == '') return false; 
  // Elimina CPFs invalidos conhecidos  
  if (cpf.length != 11 || 
    cpf == "00000000000" || 
    cpf == "11111111111" || 
    cpf == "22222222222" || 
    cpf == "33333333333" || 
    cpf == "44444444444" || 
    cpf == "55555555555" || 
    cpf == "66666666666" || 
    cpf == "77777777777" || 
    cpf == "88888888888" || 
    cpf == "99999999999")
      return false;   
  // Valida 1o digito 
  add = 0;  
  for (i=0; i < 9; i ++)    
    add += parseInt(cpf.charAt(i)) * (10 - i);  
    rev = 11 - (add % 11);  
    if (rev == 10 || rev == 11)   
      rev = 0;  
    if (rev != parseInt(cpf.charAt(9)))   
      return false;   
  // Valida 2o digito 
  add = 0;  
  for (i = 0; i < 10; i ++)   
    add += parseInt(cpf.charAt(i)) * (11 - i);  
  rev = 11 - (add % 11);  
  if (rev == 10 || rev == 11) 
    rev = 0;  
  if (rev != parseInt(cpf.charAt(10)))
    return false;   
  return true;   
}

function validaCpf(cpf)
{
  let cpfCandidato = validarCPF(cpf.value);
  let btnConfirmar = document.getElementById('id-btn-confirmar-cadastro');

  if (cpfCandidato) {
    cpf.classList.remove("border-danger");
    btnConfirmar.disabled = false;
  } else {
    cpf.classList.add("border-danger");
    btnConfirmar.setAttribute("disabled", false);
    alert("CPF: "+cpf.value+" está invalido. Digite um CPF válido novamente.");
  }
}

function calcIdade(data) {
  var d = new Date,
      ano_atual = d.getFullYear(),
      mes_atual = d.getMonth() + 1,
      dia_atual = d.getDate(),
      split = data.split('/'),
      novadata = split[1] + "/" +split[0]+"/"+split[2],
      data_americana = new Date(novadata),
      vAno = data_americana.getFullYear(),
      vMes = data_americana.getMonth() + 1,
      vDia = data_americana.getDate(),
      ano_aniversario = +vAno,
      mes_aniversario = +vMes,
      dia_aniversario = +vDia,
      quantos_anos = ano_atual - ano_aniversario;
  if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
      quantos_anos--;
  }
  return quantos_anos < 0 ? 0 : quantos_anos;
}

function menorIdade(inputData) {

  result = calcIdade(inputData.value);
  let btnConfirmar = document.getElementById('id-btn-confirmar-cadastro');

  if (result < 18) {
    inputData.classList.remove("border-danger");
    btnConfirmar.disabled = false;
  } else {
    inputData.classList.add("border-danger");
    btnConfirmar.setAttribute("disabled", false);
    alert("Seu filho possui "+result+" anos ele é maior de idade, não pode ser adicionado.");
  }
}

function retiraAcentos(palavra) { 
  com_acento = 'áàãâäéèêëíìîïóòõôöúùûüçÁÀÃÂÄÉÈÊËÍÌÎÏÓÒÕÖÔÚÙÛÜÇ'; 
  sem_acento = 'aaaaaeeeeiiiiooooouuuucAAAAAEEEEIIIIOOOOOUUUUC'; 
  nova=''; 
  for(i=0;i<palavra.length;i++) { 
      if (com_acento.search(palavra.substr(i,1))>=0) { 
          nova+=sem_acento.substr(com_acento.search(palavra.substr(i,1)),1); 
      } 
      else { 
          nova+=palavra.substr(i,1); 
      } 
  } 
  return nova; 
}
