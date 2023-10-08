import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('chatContainer') chatContainer: ElementRef | null = null;
  private unsubscribe$ = new Subject<void>();
  
  constructor(
    private apiServe: ApiService,
    public authServe: AuthService,
    private router: Router,
    @Inject(DOCUMENT) public document: Document
  ) {
    // Check if the user is authenticated when the component is constructed
    this.authServe.isAuthenticated$.subscribe((isAuthenticated) => {
      this.loggedIn = isAuthenticated; // Update loggedIn flag based on authentication state
      if (isAuthenticated) {
        // If authenticated, also fetch user data and save it in local storage
        this.authServe.user$.subscribe((data: any) => {
          this.googleId = data?.sub?.split("|")[1];
          this.name = data?.name;
          this.email = data?.email;
          this.picture = data?.picture;
          const userData = {
            googleId: this.googleId,
            name: this.name,
            email: this.email,
            picture: this.picture,
          };
          localStorage.setItem('userData', JSON.stringify(userData));
          this.placeH = "Please enter your prompt here...";
          this.getChats();
        });

      } else {
        // If the user is not authenticated, check local storage for user data
        const userData = localStorage.getItem('userData');
        if (userData) {
          this.loggedIn = true;
          const parsedUserData = JSON.parse(userData);
          this.googleId = parsedUserData.googleId;
          this.name = parsedUserData.name;
          this.email = parsedUserData.email;
          this.picture = parsedUserData.picture;
          this.placeH = "Please enter your prompt here...";
          this.getChats();
        }
      }
    });
  }

  internetMode: boolean = false;
  editMode: boolean = false;
  loggedIn: boolean = false;
  showLogoutBtn: boolean = false;
  opened: boolean = false;
  isClicked: boolean = false;
  wholeChat: any[] = [{
    googleId: "",
    id: "",
    response: ""
  }];
  currentChat: any = {
    googleId: "",
    id: "",
    response: ""
  };

  botIsTyping: boolean = false;

  googleId: string = "";
  email!: string;
  picture!: string;
  name!: string;

  value: string = "";
  temp!: string;
  aiRes!: string;
  newc!: boolean;

  dataReq: any = {
    data: this.value,
    type: "text/markdown",
    from: "easy",
    prompt: "text",
    conversationId: "",
    to: "AI",
    status: "sent"
  };

  placeH: string = "You need to login first to be able to prompt...";

  // Signing Form Dialog
  formDialog: boolean = false;
  signer2!: string;
  title!: string;
  subject!: string;
  message!: string;
  cc: string[] = ["", ""];
  addCc: boolean = false;

  autoScrollToBottom() {
    // Scroll to the bottom of the chat container
    if (this.chatContainer)
      this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
  }
  set promptVal(value: string) {
    this.temp = value;
  }

  // pushingChat(id: any) {
  //   let onechat = {
  //     googleId: this.googleId,
  //     id: id,
  //     // request: this.value,
  //     response: this.aiRes
  //   }
  //   this.currentChat = onechat;
  //   this.wholeChat.push(onechat);
  // }
  // generateUniqueId() {
  //   const timestamp = Date.now();
  //   return `chat_${timestamp}`;
  // }
  // newChat() {
  //   this.aiRes = "";
  //   this.value = "";
  //   this.temp = "";
  //   if (this.currentChat.response != "") {
  //     this.pushingChat(this.generateUniqueId());
  //   }
  // }
  // updateChat(word: string) {
  //   var objectToUpdate = this.wholeChat.find(obj => obj.request === this.currentChat.request);
  //   this.currentChat.response = word;
  //   objectToUpdate.response = word;

  //   var indexToUpdate = this.wholeChat.findIndex(obj => obj.request === this.currentChat.request);

  //   if (indexToUpdate !== -1) {
  //     // Replace the object at the specific index with the updated object
  //     this.wholeChat[indexToUpdate].response = this.currentChat.response;
  //   }
  //   console.log(this.wholeChat);
  // }
  // sendprompt() {
  //   var idd = (this.currentChat.id != "")? this.currentChat.id: this.generateUniqueId();

  //   this.botIsTyping = true;
  //   this.value = this.temp;
  //   this.temp = "";
  //   this.dataReq.data = this.value;
  //   this.dataReq.conversationId = idd;
  //   console.log(this.dataReq.conversationId);
  //   console.log(this.currentChat)
    
  //   if (this.value != "\n") {
  //     if (this.value != "") {
  //       this.apiServe.send(this.dataReq).subscribe((response: any) => {
  //         console.log(response);

  //         this.aiRes = response.response;
  //         // if (this.wholeChat.length == 1) {
  //         //   this.pushingChat(idd);
  //         // }
  //         // else {
  //         //   this.currentChat.response = response.response;
  //         //   this.currentChat.id = idd;
  //         //   this.currentChat.googleId = this.googleId;
  //         // }
  //         this.currentChat.id = idd;
  //         this.currentChat.googleId = this.googleId;
  //         this.updateChat(response.response);
  //         this.botIsTyping = false;
  //         this.autoScrollToBottom();
  //       });

  //     }
  //   }
  // }
  // changeConv(chat: any) {
  //   this.aiRes = chat.response;
  //   this.currentChat = chat;
  // }

  internetToggle() {
    this.internetMode = !this.internetMode;
  }

  generateUniqueId() {
    const timestamp = Date.now();
    return `chat_${timestamp}`;
  }

  takeUsHome(data: any) {
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        const array = data[key];
        const lastElement = array[array.length - 1];
        this.wholeChat.push({
          googleId: this.googleId,
          id: key,
          response: lastElement
        });
      }
    }
  }

  getChats() {
    this.apiServe.get_conversations(this.googleId)
      .subscribe((response: any) => {
        console.log(response);
        console.log('get_conversations');
        this.takeUsHome(response);
        this.newChat();
      });
  }

  changeConv(chat: any) {
    this.aiRes = chat.response;
    this.currentChat = chat;
    this.newc = false;
    // Make a new class to make the current chat looks like the chat we clicked on
  }

  newChat() {
    if (this.loggedIn) {
      this.newc = true;
      this.aiRes = "";
      this.value = "";
      this.temp = "";
      this.currentChat = {
        googleId: this.googleId,
        id: "",
        response: ""
      };
    }
  }

  updateChat(word: string) {
    this.currentChat.response = word;
    this.aiRes = word;

    var indexToUpdate = this.wholeChat.findIndex(obj => obj.id === this.currentChat.id);

    if (indexToUpdate !== -1) {
      // Replace the object at the specific index with the updated object
      this.wholeChat[indexToUpdate].response = this.currentChat.response;
    }
    
    this.apiServe.update({
      google_id: this.googleId,
      conv_id: this.currentChat.id,
      response: word,
    })
      .subscribe((response: any) => {
        this.toggleEdit();
      });
  }

  sendprompt() {
    this.botIsTyping = true;
    var idd = "";

    if (this.currentChat.id == "") {
      idd = this.generateUniqueId();
    }
    else {
      idd = this.currentChat.id;
      this.newc = false;
    }

    this.value = this.temp;
    this.temp = "";

    this.dataReq.data = this.value;
    this.dataReq.conversationId = idd;
    console.log(idd);
    if (this.value != "\n") {
      if (this.value != "") {

        if (!this.internetMode) {
          this.apiServe.send(this.dataReq).subscribe((response: any) => {
            console.log(response);
  
            this.currentChat.id = idd;
  
            this.updateChat(response.response);
            this.botIsTyping = false;
            this.autoScrollToBottom();
            
            if(this.newc) {
              this.wholeChat.push(this.currentChat);
              // Make a new class to make the current chat looks like the chat we clicked on
  
            }
          });
        }
        else {
          this.apiServe.internet(this.dataReq).subscribe((response: any) => {
            console.log(response);
  
            this.currentChat.id = idd;
  
            this.updateChat(response.response);
            this.botIsTyping = false;
            this.autoScrollToBottom();
            
            if(this.newc) {
              this.wholeChat.push(this.currentChat);
              // Make a new class to make the current chat looks like the chat we clicked on
  
            }
          });
        }

      }
    }
  }

  risk() {
    this.apiServe.risk({
      conversationId: this.currentChat.id,
      prompt: this.currentChat.response,
    })
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  spell() {
    this.apiServe.spell({
      conversationId: this.currentChat.id,
      prompt: this.currentChat.response,
    })
      .subscribe((response: any) => {
        console.log(response);
      });
  }

  /////////////////////////////////////////////////

  deleteVal() {
    this.temp = "";
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  ngAfterViewInit() {
    if (this.chatContainer) {
      this.autoScrollToBottom();
    }
  }
  
  log(state: any) {
    if(state == "opened") {
      this.hideIcon()
    }
    else {
      this.showIcon()
    }
  }

  hideIcon() {
    let myDiv = document.getElementById('toggle1');
    if(myDiv)
      myDiv.style.display = 'none';
  }

  showIcon() {
    let myDiv = document.getElementById('toggle1');
    if(myDiv)
      myDiv.style.display = 'block';
  }
  
  showLogout() {
    this.showLogoutBtn = !this.showLogoutBtn;
  }
  logout() {
    // Perform the logout action, such as calling your authentication service's logout method
    this.authServe.logout();
  
    // Remove user data from local storage
    localStorage.removeItem('userData');
  
    // Update the loggedIn flag to reflect the user's logout state
    this.loggedIn = false;
  }

  sendSign() {
    this.apiServe.sign({
      signer_1_email: this.email,
      signer_2_email: this.signer2,
      title: this.title,
      subject: this.subject,
      message: this.message,
      cc: this.cc,
      chat: this.currentChat.response,
    })
      .subscribe((response: any) => {
        console.log(response);
      });
  }
  toggleForm() {
    this.formDialog = !this.formDialog;
  }

}
