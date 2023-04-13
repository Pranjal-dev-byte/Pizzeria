import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from '../../services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  person = {
    password: '',
    email: '',
  };
  errorMsg = '';
  constructor(
    private loginRegister: LoginRegisterService,
    public router: Router
  ) {}

  ngOnInit(): void {}
  onSubmit(form: any) {
    this.loginRegister.loginUser(form.value).subscribe(
      (res: any) => {
        this.errorMsg = '';
        console.log(res);
        // localStorage.removeItem('token');
        localStorage.setItem('email', res.email);
        localStorage.setItem('token', res.token);
        // window.location.reload();
        console.log(localStorage.getItem('email'));

        // this.router.navigate(['/']).then(() => {
        //   window.location.reload();
        // });

        // this.getLoggedInName.next('fullName');
      },
      (err) => {
        this.errorMsg = err.Message;
      }
    );
    // console.log(person);
  }

  // loginWithRedirect(): void {
  //   this.auth.loginWithRedirect(); 
  // }

  // logout(): void {
  //   this.auth.logout({ returnTo: window.location.origin });
  // }

  googleClick(){
    window.open('http://localhost:3000/auth/google',"mywindow","location=1,status=1,scrollbars=1, width=800,height=800");
    let listener = window.addEventListener('message', (message) => {
      console.log(message);
      //message will contain facebook user and details
    });
  }
}
