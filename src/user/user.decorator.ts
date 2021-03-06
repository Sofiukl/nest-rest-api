import { createParamDecorator } from "@nestjs/common";

export const User = createParamDecorator((data, req) => {
    console.log(data);
    console.log(req.user);
    return data ? req.user[data] : req.user;
});