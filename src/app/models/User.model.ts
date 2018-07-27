export class User {
    // photo: string;

    constructor(public uid: string,
      public email: string,
      public photoURL?: string,
      public displayName?: string,
      public photo?: string,
      // public  statut?: string,
      public pseudo?: string,
      public ville?: string,
      public age?: string) {}
  }
