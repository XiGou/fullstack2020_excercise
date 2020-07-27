const info = (...params) => {
    if(process.env.NODE_ENV !== 'test'){
        console.log(...params)
    }
}

const error = (...parms)=>{
    console.error(...parms)
}

module.exports = {
    info, error
}