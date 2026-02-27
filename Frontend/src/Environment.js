let IS_PROD = false;
const server = IS_PROD ?
    "https://video-call-backend-8pt8.onrender.com" :

    "http://localhost:3000"


export { server }