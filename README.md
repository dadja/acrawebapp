# acrawebapp
ACRA Web APP is a mobile application created for the NGO Acra as part of the development of a data collection service. It interfaces with ACRA MOBILE APP for configuration and data exchange. 

## MIT License

Copyright (c) [2019] [ReptxStudio] [ACRA]

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

# this is the mobile part of a software to collect data 

#it has been developped using FireBase and Flutter

# you need to link a firebase project to this one and the web app to make it work 

# you will aslo have to provide a google maps key in order to have the map working and display data on it 


##to set things up this is the process to follow 
  -  First from FireBase console importe the google_service.json file from you project
   and drop it in this project at "mobileapp/android/app/google_service.json"
  -  Second add your google maps key at 
  "mobileapp/android/app/src/main/AndroidManifest". Inside that file loof for "DROPGOOGLEMAPSKEYHERE" and replace it by your key. 
  -  You need to create an FireBase Authentification Account if you didnt done it yet and insert the right credentials in this project at
  "mobileaqpp/lib/services/auth_service.dart".Inside that file go at line 31 and 32 to provide the creadentials of the account you previously created.




