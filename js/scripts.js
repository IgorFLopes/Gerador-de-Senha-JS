// Seleção de elementos
const generatePasswordButton = document.querySelector("#generate-password")
const generatedPasswordElement = document.querySelector("#generated-password")

// Seleção de elementos parte 2

const openCloseGeneratorButton = document.querySelector("#open-generate-password")
const generatePasswordContainer = document.querySelector("#generate-options")
const lengthInput = document.querySelector("#length")
const lattersInput = document.querySelector("#letters")
const numbersInput = document.querySelector("#numbers")
const symbolsInput = document.querySelector("#symbols")
const copyPasswordButton = document.querySelector("#copy-password")


// Funções
// Letras, Números e Símbolos

const getLetterLowerCase = () => {
    return (String.fromCharCode(Math.floor(Math.random() * 26) + 97))
    // "Math.random" está gerando um número aleatório, porém gera numero quebrado.
    // "fromCharCode" é utilizado para converter valores Unicode (números) em caracteres.
    // Math.floor trás numeros inteiros e não quebrados.
    // Essa função foi feita para letras Minisculas,logo abaixo fou fazer as Maiuscula.
}

const getLetterUpperCase = () => {
    return (String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    // "Math.random" está gerando um número aleatório, porém gera numero quebrado.
    // "fromCharCode" é utilizado para converter valores Unicode (números) em caracteres.
    // Math.floor trás numeros inteiros e não quebrados.
    // Essa função foi feita para letras Maiusculas,logo abaixo fou fazer as numerações.
}

const getNumber = () => {
    return Math.floor(Math.random() * 10).toString()
    // "toString" transforma senha em string
}

const getSymbol = () => {
    const symbols = "(){}[]=*!?<>/#@.,$&+-%"
    return symbols[Math.floor(Math.random() * symbols.length)]
    // fazer com que a funçaõ retorne simbolos aleatórios com o "Math.random"
    // E vai ser multiplicado pela quantidade de caracteres que contém em minha string. "length" 
    // Como deu um numero quebrado vamos utilizar o "Math.floor"
}

// Agora vamos criar a função que junta todas essas para gerar a senha! 

const generatePassword = (getLetterLowerCase, getLetterUpperCase, getNumber,getSymbol) => {

    let password = ""

// 2 - Segunda versão, na qual vamos selecionar se  usuário quer "letras", "números" ou "Símbolos".
// Vamos criar uma função para ele poder escolher qual ele quer ou não em sua senha. Mapeando os dados que o mesmo quer.

    // const passwordLength = 10    -> estava assim antes, porém deixamos como está abaixo:
    // o (+) foi para somar a quantidade de caracteres, seja 10, 15, 20, a quantidade que o usuário quiser.
    const passwordLength = +lengthInput.value

    // const generators = [             -> estava dessa forma, vou deixar da maneira abaixo
    //     getLetterLowerCase,  
    //     getLetterUpperCase,
    //     getNumber,
    //     getSymbol
    // ]   obs: criei uma array vazia, pois não sabemos quais o usuário deseja selecionar.

    const generators = []

    if(lattersInput.checked) {
        generators.push(getLetterLowerCase, getLetterUpperCase)
    }
    // O método push em JavaScript é utilizado para adicionar um ou mais elementos ao final de um array. Ele modifica o array original e retorna o novo comprimento do array após a adição dos elementos.
    
    if(numbersInput.checked) {
        generators.push(getNumber)
    }

    if(symbolsInput.checked) {
        generators.push(getSymbol)
    }

    console.log(generators.length)

// no final vamos fazer uma chek, pois se o usuário não marcar nada ele não gera a senha e trás um retorno de nada.
    if(generators.length === 0) {
        return
    }

// for(i = 0; i < passwordLength; i = i + 4) {  -> estava dessa forma, porém alterei o (+ 4) para o "generators.length"
    for(i = 0; i < passwordLength; i = i + generators.length) {
        generators.forEach(() => {

            const randomValue = generators[Math.floor(Math.random() * generators.length)] ();

            password += randomValue


        })
    }
    password = password.slice(0, passwordLength)

    // vamos dizer que o  vai ter o style.display inalterado, quero exibir esse elemento.
    generatedPasswordElement.style.display = "block"
    generatedPasswordElement.querySelector("h4").innerText = password;
}

// Funções parte 2



// Eventos
generatePasswordButton.addEventListener("click", () => {
    generatePassword(
        getLetterLowerCase,
        getLetterUpperCase,
        getNumber,
        getSymbol)
})

// Eventos parte 2

// Esse evento vai alterar a classe do nosso "generatePasswordContainer" -> (generate-options no HTML)
// Vamos usar o "toggle" para ele mostrar ou não esse container. A classe em questão é "hide".
openCloseGeneratorButton.addEventListener("click", () => {
    generatePasswordContainer.classList.toggle("hide")
})

//  Para copiar a senha vamos criar um novo evento de click.

copyPasswordButton.addEventListener("click", (e) => {
    e.preventDefault()

    const password = generatedPasswordElement.querySelector("h4").innerText

    // console.log(password)
    // como vou colocar no control C ? "navigator" como se fosse uma api do js. Como se fosse uma promise.

    navigator.clipboard.writeText(password).then(() => {
        copyPasswordButton.innerText = "Senha copiada com sucesso!"


        // quero que volte para copiar, assim como o botão estava antes! 

        setTimeout(() => {
            copyPasswordButton.innerText = "Copiar"
        }, 1000)
    })
})
