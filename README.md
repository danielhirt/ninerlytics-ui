# Wifi Data Visualization and Analytics Tool UI
Upsteam repository for user interface and front-end functionality. 

Documentation Author: Daniel Hirt, dhirt@uncc.edu

## Initial Setup & Dependencies

UI Development Version: **v1.0.2-SPRT-1**

API Development Version: **v1.0.2-SPRT-1**

#### Initial Development Environment Setup

Setting up the front-end for development requires a few steps:

1) Make sure you have the latest source code by pulling the upstream repository.

2) Change directory to "ui-4155" and then change directory again to "angular-client".

3) Run `npm install` to install dependencies and frameworks.

4) Run `ng build` to generate a `dist/` folder and verify the project builds successfully.

5) If the previous step was successful, run `ng serve` to launch an Angular development server.

You should see this output in the terminal:

```
** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **
i ｢wdm｣: Compiled successfully.
```

Please refer to this document for further information: [Front-end Setup and Dependencies](https://docs.google.com/document/d/1LZwoXO3JTNJLqEHj2jZYzslkOiTGoj5hiWzTbbcIewk/edit?usp=sharing "Front-end Setup")


## HTTP Requests & API Configuration

This Angular client makes use of a Springboot API, as documented [here](https://github.com/danielhirt/back-end-4155 "API Docs").

On load of components, requests are made to the API in sequence to retrieve data in JSON format. This is facilitated by a service layer, `api-service.ts`.

### API Endpoint Configuration

The endpoint strings are configured by default for both production and development versions of the UI. This configuration can be found in the `environments/` directory in the application root.

#### Development Environment

The development environment variables are configured as follows in `environment.ts`:

```
export const environment = {
  production: false,
  backendUrl: 'http://localhost:8080/api/v1',
  fileUploadAPIUrl: 'http://localhost:8080/api/v1/files'
};
```
By default, the API listens on port 8080 and serving the project using `ng serve` will assume these variables when executing method calls that make a request to the API. 

For example:

```
 // Retrieve connection data for a specific campus building
  public getConnectionDataForBuilding(building: string): Observable<UsersPoint[]> {
    return this.http.get<UsersPoint[]>(environment.backendUrl + '/connectionsByBuilding/b=' + building);
  }
```
The code above makes an GET request to the API, using the format `{environment.backendUrl} + {endpoint} + {variable}` where:

`backendUrl` = API Gateway defined in the environment file(s).

`endpoint` = The endpoint to hit in the API. The example above retrieves connection data for a specific building. 

`variable` = The variable passed into the method as needed by the API, if any. 

#### Production Environment

The production environment for this project is currently configured use server addresses rather than local instances. This can be achieved by running `ng serve --prod`. 

Note: Serving the project in this way is only for use when Dockerizing and building the client for deployment. Avoid using this command. 

## Reference Links and Documentation

* [Agile Board & User Stories](https://docs.google.com/spreadsheets/d/1dm9sP_mIdLl37zeNOCKmncDMO0HoIxjeewmiFUyAlhI/edit?usp=sharing "Agile Board")


* [Project Proposal & Problem Statement](https://docs.google.com/presentation/d/1fxfAZ-zVOSKzFW1SE5DlYFFz0uJsrnEZB4Wij7uvN5M/edit?usp=sharing "Proposal")


* [Git Process & Project Architecture](https://docs.google.com/document/d/1HAwwUEqxKyuCf5BHwdLaAdD1ZKnvuG_bWOq9BIKS4ek/edit?usp=sharing "Project Management")


## Team and Roles

* Daniel Hirt: Scrum Master, Back-end Development, UI/UX Development	
* Carson Leedy: Database Development, UI/UX Development
* Austin Young: UI/UX Development, Front-end Development	
* Abhinav Kasu: Back-end Development
* Matthew Walter: Back-end Development
* Aaron Yow: Back-end Development
* Andre Raposo: Back-end Development
* Seth Frady: Front-end Development			
* Aasim Munshi: Front-end Development				
* Matthew Shangle: Front-end Development			
			

