
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private router: Router) { 

    this.color = 'primary';
    this.mode = 'indeterminate';
    this.value = 50;
  }

  public username: string;
  public password: string;

  public spinner: string;
  public message: string;

  public color: string;
  public mode: string;
  public value: number;

  ngOnInit() {

    this.spinner = null;
    this.message = null;

  }

  login(): void {

    if (this.username == 'admin' && this.password == 'admin') {
      
      this.spinner = "spin";
      this.message = "login";
      setTimeout(() => {
        this.router.navigate(["home"]);
        this.spinner = null;
      },
        12000);
     
        setTimeout(() => {
          this.message = "lol1";
        },
          4000);

          setTimeout(() => {
            this.message = "lol2";
          },
            8000);
  

    } else {

      alert("Invalid credentials");
    }
  }
}

