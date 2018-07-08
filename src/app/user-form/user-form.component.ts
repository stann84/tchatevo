import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';
import {User} from '../models/User.model';
import { Observable  } from 'rxjs/observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})

@Injectable()
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      ville: ['', Validators.required],
      age: ['', Validators.required],
    });
    }
    onSaveUser () {
      const pseudo = this.userForm.get('pseudo').value;
      const ville = this.userForm.get('ville').value;
      const age = this.userForm.get('age').value;
      const newUser = new User(pseudo, ville, age);
      if (this.fileUrl && this.fileUrl !== '') {
        newUser.photo = this.fileUrl;
        console.log(' file url ' + this.fileUrl);
      }
      this.usersService.createNewUser(newUser);
      this.router.navigate(['/listusers']);
  }

  onUpdateUser() {
    const pseudo = this.userForm.get('pseudo').value;
    const ville = this.userForm.get('ville').value;
    const age = this.userForm.get('age').value;
    const newUser = new User(pseudo, ville, age);
    if (this.fileUrl && this.fileUrl !== '') {
      newUser.photo = this.fileUrl;
      console.log(' file url ' + this.fileUrl);
    }
    this.usersService.updateUsers();
    this.router.navigate(['/profil']);
   }

    onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.usersService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
        }
    );

      this.fileIsUploading = true;
      this.usersService.uploadFile(file).then(
        (url: string) => {
          this.fileUrl = url;
          this.fileIsUploading = false;
          this.fileUploaded = true;
        }
      );
    }

    detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
    }

    onViewUser(id: number) {
      this.router.navigate(['/users', 'view', id]);
     }


    /*onUpdate(user: User): Observable<User> {
      console.log('update' + user);
      return this.http.put<User>(this.userUrl, user, httpOptions)
      .pipe(
        catchError(this.handleError('updateUser', user))
      );
      this.router.navigate(['/listUsers']);
    }*/
}
