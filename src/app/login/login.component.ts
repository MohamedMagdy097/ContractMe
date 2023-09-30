import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements  OnInit {
  constructor(private apiServe: ApiService, 
    public authServe: AuthService,
    @Inject(DOCUMENT) public document: Document) { }
  ngOnInit(): void { 

  }

  


  // signIn() {  
  //   this.apiServe.useGoogle().subscribe((data: any) => {
      
  //   });
  // }

  

}
