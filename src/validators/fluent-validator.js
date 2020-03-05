'use strict';

let errors = [];

function ValidationContract() {     //Cria string de erros
    errors = [];
}
                                                                        //Testes abaixo: 
ValidationContract.prototype.isRequired = ( value, message) => {        //Item requirido
    if( !value || value.length <= 0 )
    errors.push({message: message});
}

ValidationContract.prototype.hasMinLen = ( value, min, message) => {    //Tamanho minimo
    if( !value || value.length < min )
    errors.push({message: message});
}

ValidationContract.prototype.hasMaxLen = ( value, max, message) => {    //Tamanho maximo
    if( !value || value.length > max )
    errors.push({message: message});
}

ValidationContract.prototype.isFixedLen = ( value, len, message) => {   //Tamanho fixo
    if( value.lenght != len)
    errors.push({message: message});
}

ValidationContract.prototype.isEmail = ( value, message) => {           //Valida email input
    var reg = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if( !reg.test(value))
        errors.push({message:message});
}

ValidationContract.prototype.errors = () =>{   //Mostra erros
    return errors;
}

ValidationContract.prototype.clear = () =>{     //Limpa erros
    errors = [];
}

ValidationContract.prototype.isValid = () =>{    //valida erros
    return errors.length ==0;
}

module.exports = ValidationContract;