

export const passwordTokenTemplate = (link : string) => {
    return  `
    <!DOCTYPE html>
    <html lang="en">
  
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TaskCollab Forgetten Password</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          text-align: center;
        }
  
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        h1 {
          color: #333;
        }
  
        p {
          color: #555;
        }
  
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <h1>Welcome back to TaskCollab!</h1>
        <p>Please click the button below to change your password</p>
        <a class="button" href="${link}">Change Your Password</a>
      </div>
    </body>
  
    </html>
  `
}


export const confirmMessageTemplate = (link : string) => {
    return  `
    <!DOCTYPE html>
    <html lang="en">
  
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>TaskCollab Email Confirmation</title>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
          text-align: center;
        }
  
        .container {
          background-color: #ffffff;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
  
        h1 {
          color: #333;
        }
  
        p {
          color: #555;
        }
  
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
      </style>
    </head>
  
    <body>
      <div class="container">
        <h1>Welcome to TaskCollab!</h1>
        <p>Thank you for signing up. Please click the button below to confirm your email address.</p>
        <a class="button" href="${link}">Confirm Email</a>
      </div>
    </body>
  
    </html>
  `
}