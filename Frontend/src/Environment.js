let IS_PROD = true;
const server = IS_PROD ?
    "https://makeprice.onrender.com" :

    "http://localhost:3000"


export { server }