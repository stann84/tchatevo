// import { AngularFireDatabase } from 'angularfire2/database';
export class User {
    photo: string;
    constructor(
                public pseudo: string,
                 public ville: string,
                 public age: string) {
    }
  }
