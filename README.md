![uploadbox](http://davidespier.com/github/upload.jpg)

# UPLOADBOX
Save your images in the cloud.  Project made with javascript and firebase.

## Requirements

- Firebase auth.
- Firebase database.
- Firebase storage.
- Domain or firebase hosting.


## Installation

1. You must first add the firebase project information, 
in the file 'core/js/app.js'.


```bash
var firebaseConfig = {
    apiKey: "*************",
    authDomain: "*************",
    databaseURL: "*************",
    projectId: "*************",
    storageBucket: "*************",
    messagingSenderId: "*************",
    appId: "*************"
};
```

2. Activate in firebase auth each of the social networks.

```bash
   Facebook

   Google

   Github

   Yahoo

   Twitter
```

3. Upload the project to your hosting.

4. If the project is loaded into a domain, this domain must be activated in the following Firebase path.

```bash

   4.1 - https://console.firebase.google.com/u/0/

   4.2 - Enter the project.

   4.3 - Firebase authentication.

   4.4 - Login method.

   4.5 - Add domain.

   4.6 - Run.
```
## Website project

[http://davidespier.com/pages/uploadbox/](http://davidespier.com/pages/uploadbox/)


## Authors



 *Developed and designed by*  **David Espier**


[Personal website](https://davidespier.com)

[Alexa skills](https://www.amazon.es/s?k=davidespier&i=alexa-skills)
        
[Other projects](https://github.com/davidespier?tab=repositories)



## License


[MIT License](https://choosealicense.com/licenses/mit/) © davidespier.com
