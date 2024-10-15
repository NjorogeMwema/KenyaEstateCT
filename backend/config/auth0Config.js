import { auth } from 'express-oauth2-jwt-bearer';

const jwtCheck = auth({
    audience: "http://localhost:8000",
    issuerBaseURL: "https://dev-6cf6s5cr3rb52zja.us.auth0.com",
    tokenSigningAlg: "RS256"
})

export default jwtCheck;