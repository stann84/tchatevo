import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../services/users.service';
import {Router} from '@angular/router';
import {User} from '../models/User.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  userForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  constructor(private formBuilder: FormBuilder,
              private usersService: UsersService,
              private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      pseudo: ['', Validators.required],
      ville: ['', Validators.required],
      age: ['', Validators.required]
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
      this.router.navigate(['/listUsers']);
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
}
