import { SignatureLevelEnum, TokenEnum } from "../Utils/Enums/user.enum.js";
import { BadRequestError, NotFoundError } from "../Utils/Errors/error.helpers.js";
import { getSignature, verifyToken } from "../Utils/Security/token.js";
import { findById } from "../DB/database.repository.js";
import { UserModel } from "../DB/Models/user.model.js";
import { get, revokeTokenKey } from "../DB/Redis/redis.repository.js";

export const decodeToken = async ({ authorization, tokenType = TokenEnum.AccessToken }) => {
    const [Bearer, token] = authorization.split(" ");
    let level;
    if (!Bearer || !token) throw BadRequestError({ message: "Invalid token" });
    if (Bearer === "admin") {
        level = SignatureLevelEnum.Admin;
    } else if (Bearer === "user") {
        level = SignatureLevelEnum.User;
    } else {
        throw BadRequestError({ message: "Invalid token Bearer" });
    }



    let signature = await getSignature({ signatureLevel: level });

    if (!signature) throw BadRequestError({ message: "Invalid token " });

    const decodedToken = await verifyToken({ token, secretKey: tokenType === TokenEnum.AccessToken ? signature.accessSignature : signature.refreshSignature });

    // check if token is revoked
    const isRevoked = await get({ key: revokeTokenKey({ userId: decodedToken.id, jti: decodedToken.jti }) });
    if (isRevoked) throw BadRequestError({ message: "Invalid token please login again {redis cache}" });


    const user = await findById({ model: UserModel, id: decodedToken.id });
        
    if (!user) throw NotFoundError({ message: "User not found" }); 

    // check if user is changed credentials

    if ((user.changeCredentialsAt?.getTime() / 1000 || 0) > decodedToken.iat) throw BadRequestError({ message: "Invalid token please login again {User Loged Out From All Device}" });








    return { user, decodedToken };
}
// modelware to check if user is authenticated
export const authentication = ({ tokenType = TokenEnum.AccessToken }) => {
    return async (req, res, next) => {

        const { user, decodedToken } = await decodeToken({ authorization: req.headers.authorization, tokenType });
        req.user = user;
        req.decodedToken = decodedToken;
        next();

    }
}