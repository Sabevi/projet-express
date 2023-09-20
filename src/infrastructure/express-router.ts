import { Router } from 'express';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { UserRouter } from '../user/user.router';

// incpasulation tous les routers appli
export class ExpressRouter {
    //par défault public, car on l'utilise dans méthode configureRoutes
    router = Router();

    // ! = non null assertion operator
    private userController!: UserController;
    private userRouter!: UserRouter;

    //prend en paramètre un userService pour construire le controlleur
    //car dans une appli Express, pas d'injection de dépendances, à faire à la mano
    constructor(private userService: UserService) {
        this.configureControllers();
        this.configureRouters();
        this.configureRoutes();
    }

    private configureControllers(): void {
        this.userController = new UserController(this.userService);
    }
    //initialiser userRouter de la classe (à terme il y en aura d'autres, avec objet userController)
    private configureRouters(): void {
        this.userRouter = new UserRouter(this.userController);
    }
    //configurations des routes
    private configureRoutes(): void {
        this.router.use('/user', this.userRouter.router);
    }
}
