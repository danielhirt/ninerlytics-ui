
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;
  public spinner: string;
  public message: string;
  public color: string;
  public mode: string;
  public value: number;

  constructor(private router: Router, private APIService: ApiService ) { 
    this.color = 'primary';
    this.mode = 'indeterminate';
    this.value = 50;
  }


  ngOnInit() {
    this.spinner = null;
    this.message = null;
  }

  login(): void {
    if (this.username == 'admin' && this.password == 'admin') {     
      this.APIService.getAllConnectionData().subscribe(result => {
        this.APIService.data = result;
        this.spinner = "spin";
        this.message = "login";
        console.log("Total connection data in service layer: ", this.APIService.data);
      }, error => {
        console.log("Error retrieving data: ", error);
      });

      setTimeout(() => {
        this.spinner = null;
        this.login = null;
        this.router.navigate(['home']);
      },
        6000);
 
    } else {
      alert("Invalid credentials!");
    }
  }
}

