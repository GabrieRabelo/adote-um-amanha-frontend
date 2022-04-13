export default {
    required,
    email
}

function required(value: string): string | boolean {
    return !!value || 'Campo obrigatório.';
}

function email(value: string): string | boolean {
    const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailPattern.test(value) || 'E-mail inválido.'
}