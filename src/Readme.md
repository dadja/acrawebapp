# Logiciel de gestion de donnée collectée.

# Clé à fournir pour le bon fonctionnement du logiciel


## Fichier app.module.ts
Il faut rentrer les clés du projet firebase et google map

Ligne 49

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


Ligne 112
```javascript
import foobar
AgmCoreModule.forRoot({
      apiKey: ''  /* apiKey Google Map */
    
    }),
```




## Fichier app.component.ts

Il faut creer un compte Firebase Authentication pour authentifier 
l'application sur firebase et ensuite les rentrer sur le fichier 
app.component.ts


Ligne 29
```javascript
import foobar
this.email = ''; //UserLogin firebase Auth
this.password = ''; //Password firebase User Auth
```




## MIT License

Copyright (c) [2019] [ReptxStudio]

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