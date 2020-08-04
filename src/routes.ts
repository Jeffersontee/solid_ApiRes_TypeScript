import { Router } from "express";
import { createUserController } from "./UseCases/CreateUser";

const router = Router()



router.post('/users', (request, response) => {
  return createUserController.handle(request,response)
  //response.status(201).send();
});


export { router }