# acrawebapp
ACRA Web APP is a mobile application created for the NGO Acra as part of the development of a data collection service. It interfaces with ACRA MOBILE APP for configuration and data exchange. 

## MIT License

Copyright (c) Acra [2019] 
[ReptxStudio] [ACRA]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

Initiated by ACRA 
and developped by ReptxStudio
this software is free to use but you must notify the two teams behind the project ACRA and ReptxStudios 
and mention their names when producing your app from this one

this is the web part of a software to collect data 

#it has been developped using FireBase and AmgularFire
# SETUP
  - you need to link a firebase project to this one and the web app to make it work 
  - you will aslo have to provide a google maps key in order to have the map working and display data on it  
## Fichier app.module.ts
here you need to insert the keys from firebaseproject and google maps

Line 49

```javascript
import foobar
//Information de connexion au projet firebase
var config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: ''
};
```


Line 112
```javascript
import foobar
AgmCoreModule.forRoot({
      apiKey: ''  /* apiKey Google Map */
    
    }),
```




## Fichier app.component.ts
here you must create a user form Firebase Authentification screen in Firebase console 
to authenticate your app and insertes the account credentials in the app.component.ts 
file in order to be able to insert or read data  
 et ensuite les rentrer sur le fichier 
app.component.ts


Line 29
```javascript
import foobar
this.email = ''; //UserLogin firebase Auth
this.password = ''; //Password firebase User Auth
```


# AcraApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).





