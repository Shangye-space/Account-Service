# Account Service

## How to run service
<span>Make sure you have docker and nvm installed.</span>
<a href="https://www.docker.com/get-started">install Docker here!</a>
<a href="https://github.com/nvm-sh/nvm#installing-and-updating"> install nvm here!</a>
<p>run following commands in order:</p>
<ul>
    <li><h5>nvm install 12</h5></li>
    <li><h5>nvm use 12</h5></li>
    <li><h5>npm install</h5></li>
    <li><h5>docker-compose build</h5></li>
    <li><h5>docker-compose up</h5></li>
</ul>

## How to test
<p>run following command:</p>
<ul>
    <li><h5>npm run test</h5></li>
</ul>

### Description
This is one of microservices for "Shangye.space" project. 

<h4>Account service is responsible for:</h4>
<ol>
    <li>Authentication</li>
        <ul>
            <li>Sign Up</li>
            <ul>
                <li>With personal info</li>
                    <ul>
                      <li>Name</li>
                      <li>Last Name</li>
                      <li>Phone number</li>
                      <li>Email</li>
                        <ul>
                          <li>Verification</li>
                        </ul>
                      <li>Password</li>
                      <li>Confirm password</li>
                    </ul>
                <li>OAuth</li>
                    <ul>
                      <li>Using Facebook account</li>
                      <li>Using Google account</li>
                    </ul>      
            </ul>
            <li>Sign In</li>
                <ul>
                    <li>With email and password</li>
                    <li>Using Facebook account</li>
                    <li>Using Google account</li>
                    <li>With cookies</li>
                </ul>
            <li>Sign Out</li>
                  <ul>
                     <li>Auth token gets removed</li>
                  </ul>
                </ul>
            </ul>
        </ul>
    <li>Account Management</li>
        <ul>
          <li>Update</li>
            <ul>
               <li>Name</li>
                      <li>Last Name</li>
                      <li>Phone number</li>
                      <li>Email</li>
                        <ul>
                          <li>Verification</li>
                        </ul>
                      <li>Password</li>
                      <li>Billing info</li>
                      <li>Shipping information</li>
            </ul>
          <li>Delete</li>
              <ul>
                   <li>All user data is deleted</li>
              </ul> 
        </ul>
    <li>List of Favourites</li>
        <ul>
          <li>User can add items to the list</li>
          <li>User can delete items from the list</li>
          <li>User can see the availability of the items in the list</li>
        </ul>
  
</ol>
        
