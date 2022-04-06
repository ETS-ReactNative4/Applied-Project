![alt text](https://learnonline.gmit.ie/pluginfile.php/1/theme_adaptable/logo/1639119443/Transparent%20new.png)

|  **Project Title**  | Allergy Scanner                        | 
| --------------------|:------------------------------------:  |
| **Module:**         |  Applied Project And Minor Dissertation| 
| **Student No:**     | G00375321                              | 
| **Author:**         | Gareth O' Leary                        |  
| **Supervisor:**     | Joseph Corr                            |
| **Year:**           | 4                                      |

## Project Description
Having someone close to you with severe food allergies is never easy, spending countless times at the grocery store, scrutinizing every inch of the ingredients on the back of a product label becomes part of your life. At the beginning of the year, when the final project was announced, the goal was to come up with a project idea that could be used in everyday life and that would be related to aiding sufferers of food allergies. 

Allergy Scanner is a mobile application that can scan a barcode of a product whether it be at the grocery store or in your kitchen at home, notifying the user if the food they are about to purchase is free from any allergenic foods. This application would be beneficial for people with food allergies as well as family/friends of people with food allergies who want to keep them safe.

## Features
- Allow users to register an account, login and update their credentials.
- The application would give the user the opportunity to enter, update and delete their allergens. 
- Allow users to scan the barcode of a product of their choice and cross reference the result against the allergens selected.
- Allow users to favourite a scanned product.
- Allow users to view a list of their previous scans and access each scan individually.

### Future Implementations
As this project was built using an api, further developments are needed for products that are not available. Implementing an option to scan the text of the ingredients would be a massive improvement to the application, if there are allergens present in the ingredients, they will be highlighted with a green box.

## Environment
- Expo (v4.13.0+)
- Npm (v6.14.4+)
- Node (v12.18.0+)
- MongDB (v4.4+)

## Built With 
- react-native
- react-navigation
- react-native-animatable
- react-native-async-storage
- react-native-elements
- react-native-swipe-list-view
- expo
- expo-app-loading
- expo-constants
- expo-barcode-scanner
- axios
- bcryptjs
- cors
- mongoose
- express
- mongoDB
- open food facts api

## Installation 
1. Clone Repository
```sh
   git clone https://github.com/GarethOLeary/Applied-Project
```
2. Navigate into the AllergyScanner folder
```sh
  Run npm install
``` 
3. To start the client side 
```sh
  Run npm start or expo start
``` 
4.  Download the expo app from the app store 
```sh
  Scan the QR code or run the project from the expo app
``` 
5. Navigate into the Backend folder 
```sh
  Run npm install
``` 
6. Navigate into .env file
```sh
 Enter mongo key
```
7. To start the server 
```sh
  Run npm start
``` 