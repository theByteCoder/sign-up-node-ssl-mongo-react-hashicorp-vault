# Steps to generate SSL certificate

## For Node with OPENSSL

1. Install **OPENSSL**. If you are on MAC OS, OPENSSL, you already have it installed. For Windows or Linux users, you can use url __https://slproweb.com/products/Win32OpenSSL.html__

2. Verify OPENSSL has been installed with command **openssl**

3. Launch terminal/ cmd. In the project root directory, create a directory **cert** and cd into the directory

4. __Generate private key__ :
To create a **rsa key file**, run command **openssl genrsa -out key.pem**

5. __Create a CSR (Certificate Signing Request)__ :
To generate a **certificate signing request file** using the above key file, run command **openssl req -new -key key.pem -out csr.pem**
   * Note - If you run into issues regarding **Can't open \openssl.cnf for reading, No such file or directory**, try setting path of **OPENSSL_CONF** env variable. Example - **set "OPENSSL_CONF=C:\Program Files\OpenSSL-Win64\bin\openssl.cfg"**

6. __Generate SSL certificate from CSR__ :
To generate a To generate a **certificate file** run command - **openssl x509 -req -days 3650 -in csr.pem -signkey key.pem -out cert.pem**
   * Note - x509 is format public key certificate

## For React with MKCERT

1. Install **MKCERT**

2. Create a local CA (certificate authority) with command **mkcert --install**

3. Create a directory **cert**, cd into directory

4. Generate certificate and key file with command **mkcert -cert-file cert.pem -key-file key.pem localhost**

5. Create a **.env** file in React app's root directory and make below entries -

    * HTTPS=true
    * SSL_CRT_FILE=<path to cert directory>\cert.pem
    * SSL_KEY_FILE=<path to cert directory>\key.pem

6. Start React
