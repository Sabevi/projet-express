import express from 'express';
import { ExpressRouter } from './express-router';
import bodyParser from 'body-parser';

//bonne pratique: mettre méthodes privées au fin de la classe
export class ExpressServer {
    private express = express();

    //on donne expressRouter dans constructeur d ExpressServer
    constructor(
        private expressRouter: ExpressRouter,
        private port: string,
    ) {
        this.configureBodyParser();
        this.configureRoutes();
    }
    //parser le body des requêtes envoyées ou recus
    //transforme en json données envoyées ou reçues
    private configureBodyParser(): void {
        this.express.use(bodyParser.json());
    }

    bootstrap(): void {
        this.express.listen(this.port, () => {
            console.log(`> Listening on port ${this.port}`);
        });
    }
    //pour toutes routes /api on utilise expressRouter
    private configureRoutes(): void {
        this.express.use('/api', this.expressRouter.router);
    }
}
