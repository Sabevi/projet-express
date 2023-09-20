export class User {
    constructor(
        //public: on pourra accéder d'une autre classe et à l'extérieur
        //getter et setter on n'utilise pas ça en typeScript, on fait des fonctions
        public id: number,
        public username: string
    ) {}

}