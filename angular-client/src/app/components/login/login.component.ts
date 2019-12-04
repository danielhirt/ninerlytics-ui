
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
  public authenticated: boolean;
  public errorMessage: string;

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
    this.errorMessage = null;
  }

  login(): void {

    this.APIService.authenticate(this.username, this.password).subscribe(result => {
      console.log("User role: ", result.role);
      this.APIService.role = result.role;  
      this.errorMessage = null; 
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
    }, error => {
      console.log("Error with authentication!", error);
      this.errorMessage = "error";
    });
     console.log("LOGIN COMPLETED");
  }
}

