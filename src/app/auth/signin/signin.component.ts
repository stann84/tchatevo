import { Component, OnInit, OnDestroy } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  errorMessage: string;

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private router: Router) { }


  ngOnInit() {
    // on créer identification
    this.signInForm = this.formBuilder.group ({
      email: ['', [Validators.required, Validators.email]],
      password : ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value;
    this.auth.signInUser(email, password).then(
      () => {
        this.router.navigate(['listusers']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
