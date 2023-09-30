import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent implements  OnInit{
  constructor(private apiServe: ApiService,
              public authServe: AuthService,
              @Inject(DOCUMENT) public document: Document) {}

  ngOnInit(): void {
    this.toggleTheme();
  }
  allChat: any[] = [];

  currentTheme: boolean = true; // (false = light, true = dark) -> at initial state
  botIsTyping: boolean = false;
  prompt!: [string];

  googleId!: string;
  email!: string;
  picture!: string;
  name!: string;

  value: string = "";
  value2 : string = "omk ar3a";
  temp!: string;

  dataReq: any = {
    data : this.value,
    type: "text/markdown",
    from: "easy",
    prompt: "text",
    conversationId: "easy2",
    to: "AI",
    status: "sent"
  };
  response: string = "asd";

  loguser() {
    this.authServe.user$
      .subscribe((data: any) => {
        this.googleId = data?.sub?.split("|")[1];
        this.name = data?.name;
        this.email = data?.email;
        this.picture = data?.picture;

        this.apiServe.login({
          googleId: this.googleId,
          name: this.name,
          email: this.email,
          picture: this.picture
        })
          .subscribe((response: any) => {
            console.log(response);
          });
      });
  }
  
  sendprompt() {
    this.botIsTyping = true;
    this.value = this.temp;
    this.temp = "";
    this.dataReq.data = this.value;
    
    if (this.value != "\n") {
      if (this.value != "") {
        this.apiServe.send(this.dataReq).subscribe((response: any) => {
          console.log(response);
        
          this.botIsTyping = false;
        });
      }
    }

    let onechat = {
      request: this.value,
      response: this.response
    }
    this.allChat.push(onechat);
  }

  set promptVal(value: string) {
    this.temp = value;
  }

  deleteVal() {
    this.temp = "";
  }

  toggleTheme() {
    this.currentTheme = !this.currentTheme;
    if (this.currentTheme) {
      this.document.body.classList.add('light-mode');
    } else {
      this.document.body.classList.remove('light-mode');
    }
  }
}
