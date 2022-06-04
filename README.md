# Backend-Pet-Camp
Write "npm install" to install additional modules

Write "npm start" to start server

Open http:\\localhost:3000 to see server you started

<details>
  
**Registration**

Returns json about successful registration 
* **Method:** 

  `POST`

* **Successful response**
  ```json
  {
    "message": "User has been successfuly registered"
  }
  ```
* **Error Response:**

  * **Code:** 400 <br />
    **Content:** 
    ```json
      {
        "message": "error message"
      }
    ```
    
**Login**

Returns json jwt token about successful login 
* **Method:**
  
  `POST`

* **Successful response**
  ```json
  jwttoken
  ```

* **Error Response:**

  * **Code:** 400  <br />
    **Content:** 
    ```json
      {
        "message" : "error message"
      }
    ```
    
<details/>
