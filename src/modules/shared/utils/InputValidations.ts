export default {
  required,
  email,
  telefone,
  cpf_cnpj,
  cep,
  numero,
  cidade,
  estado,
  bairro,
  rua
};

function required(value: string): string | boolean {
  return !!value || "Campo obrigatório.";
}

function email(value: string): string | boolean {
  const emailPattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailPattern.test(value) || "E-mail inválido.";
}

function telefone(value: string): string | boolean {
  const  telefonePattern =
  /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}-[0-9]{4}$/;
  return  telefonePattern.test(value) || "Telefone inválido.";
}


 function cpf_cnpj(value: string): string | boolean {
  const cpfOrCnpjPattern = 
  /(^\d{3}\.\d{3}\.\d{3}-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$)/;
  return cpfOrCnpjPattern.test(value) || "CPF/CNPJ  inválido.";
 }

 function cep(value: string): string | boolean {
  const cepPattern = 
  /^[0-9]{5}-[0-9]{3}$/;
  return cepPattern.test(value) || "CEP inválido.";
 }

 //function numero(^[0-9]*$)
 function numero(value: string): string | boolean {
  const numeroPattern = 
  /^[0-9]*$/;

  return numeroPattern.test(value) || "Número inválido.";
 }

 function cidade(value: string): string | boolean {
  const caracterPattern = 
  /^[A-Za-z ]+$/;

  return caracterPattern.test(value) || "Cidade inválida.";
 }

 function bairro(value: string): string | boolean {
  const caracterPattern = 
  /^[A-Za-z ]+$/;

  return caracterPattern.test(value) || "Bairro inválido";
 }

 function rua(value: string): string | boolean {
  const caracterPattern = 
  /^[A-Za-z ]+$/;

  return caracterPattern.test(value) || "Rua inválida";
 }

 
 function estado(value: string): string | boolean {
  const caracterPattern = 
  /^[A-Za-z]+$/;
  

  return caracterPattern.test(value) || "Estado inválido.";
 }

 
