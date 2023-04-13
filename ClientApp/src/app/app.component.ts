import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pizzera-frontend';
  public secureMessage:any;

  constructor( private http: HttpClient) {
    // this.getGoogleAuthUrl();
  }

  // getGoogleAuthUrl(){
  //   const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";

  //   const options = {
  //     redirect_uri : 'http://localhost:1337/api/sessions/oauth/google',
  //     client_id:'508931036772-agflq43lkua9lhjp8571lovoo884743o.apps.googleusercontent.com',
  //     access_type:'offline',
  //     response_type:'code',
  //     prompt:'consent',
  //     scope:[
  //       'https://www.googleapis.com/auth/userinfo.profile',
  //       'https://www.googleapis.com/auth/userinfo.email'
  //     ].join(" ")
  //   };

  //   console.log({options})

  //   const qs = new URLSearchParams(options);

  //   console.log(qs.toString());

  //   return `${rootUrl}?${qs.toString()}`;
  // }

  // login(){
  //   window.open(this.getGoogleAuthUrl())
  // }

}
