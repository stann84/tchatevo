import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CoreModule } from './core/core.module' ;
import { AngularFireDatabaseModule,  } from 'angularfire2/database';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { BookListComponent } from './book-list/book-list.component';
import { SingleBookComponent } from './booklist/single-book/single-book.component';
import { BookFormComponent } from './booklist/book-form/book-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { BooksService } from './services/books.service';
import { AuthGuardService } from './services/auth-guard.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './profil/profil.component';
import { MessagesComponent } from './messages/messages.component';
import { SalonsComponent } from './salons/salons.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UsersService } from './services/users.service';
import { SingleUserComponent } from './single-user/single-user.component';
import { environment } from '../environments/environment';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { UpdateUserComponent } from './user-form/update-user/update-user.component';
import { NotifyService } from './services/notify.service';

const appRoutes: Routes = [
  {path: 'auth/signup' ,  component: SignupComponent},
  {path: 'auth/signin' , component: SigninComponent},
  {path: 'user-form' , canActivate: [AuthGuardService], component: UserFormComponent},
  {path: 'profil' , canActivate: [AuthGuardService], component: ProfilComponent},
  {path: 'listusers' ,  component: ListUsersComponent},
  {path: 'user-profil' ,  component: UserProfilComponent},
  {path: 'user-form/update-user' ,  component: UpdateUserComponent},
  {path: 'salons' , component: SalonsComponent},
  {path: 'messages' ,  component: MessagesComponent},
  {path: 'users/view/:id', canActivate: [AuthGuardService], component: SingleUserComponent},
  {path: '', redirectTo: 'auth/signup', pathMatch: 'full'},
  {path: '**', redirectTo: 'auth/signup'}
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    BookListComponent,
    SingleBookComponent,
    BookFormComponent,
    HeaderComponent,
    ProfilComponent,
    MessagesComponent,
    SalonsComponent,
    ListUsersComponent,
    UserFormComponent,
    SingleUserComponent,
    UserProfilComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    HttpModule,
    CoreModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    BooksService,
    UsersService,
    AuthGuardService,
    NotifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
