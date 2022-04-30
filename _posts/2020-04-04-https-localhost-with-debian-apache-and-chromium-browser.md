---
layout: post
title: "HTTPS Localhost with Debian, Apache and Chromium Browser"
description: This article is intended for Debian Linux users who are also web developers. This explains how to setup an https localhost for development of PWA in Apache server.
subject: HTTPS Localhost with Debian, Apache and Chromium Browser
apple-title: HTTPS Localhost with Debian, Apache and Chromium Browser
app-name: HTTPS Localhost with Debian, Apache and Chromium Browser
tweet-title: HTTPS Localhost with Debian, Apache and Chromium Browser
tweet-description: This article is intended for Debian Linux users who are also web developers. This explains how to setup an https localhost for development of PWA in Apache server.
og-title: HTTPS Localhost with Debian, Apache and Chromium Browser
og-url: blog/2020/04/04/https-localhost-with-debian-apache-and-chromium-browser
canonical-url: blog/2020/04/04/https-localhost-with-debian-apache-and-chromium-browser
date: 2020-04-04
keywords: Abhishek Kumar, Software Engineer, Apache, Linux, localhost, Debian, https, SSL, CA, certificate authority, PWA
---

When we talk about local web development servers, they tend to serve web pages through an HTTP protocol. However, with the recent advancement in web development regarding making Progressive Web Apps (PWA), an HTTPS connection is needed with the local web development server. In this article, I will talk about on how to set up this environment using Debian Linux OS, Apache web server and chromium-browser.

Keep in mind that the instructions given in the article work for all OSes which were derived from Debian Linux OS that maintain the same package management system with the `apt` tool, which includes Raspbian for ARM SBCs, Ubuntu and its derivatives also such as Bodhi Linux.

<br>

### Installing Chromium Browser on Debian (or on its derivatives)


To install a chromium-browser on your Debian OS we will use a bunch of commands with `apt` tool.

First off, we need to update our local software package database to ensure we are accessing the latest version of software components during the install. To update the software package database use the following command given below:

```
$ sudo apt update
```

Then, after all the update is done, we could install the chromium-browser with the command that is given below:

```
$ sudo apt install chromium-browser
```

After the installation is done, you could verify it by either typing the following command on your terminal:

```
$ chromium-browser
````

Or open it via going through your system’s main menu. In systems such as Ubuntu you could simply search “chromium” and on a minimal derivative such as taking the example of Bodhi Linux, it would be under “main menu”->”Applications”->”Internet”->”Chromium Web Browser”.

<br>
### Installing Apache Web Server on Debian (or on its derivatives)


Next, we have to install the Apache webserver. Since we have already updated the software package database while installing chromium-browser, we don’t need to do that again. If you had chromium-browser already installed, and have skipped that step then update the software package database with the command mentioned before:

```
$ sudo apt update
```

Installing of Apache web server could be done with a single command given below:

```
$ sudo apt install apache2
```

After the installation is complete you could verify its installation by pointing your chromium-browser to this address, `http://localhost`. A screenshot in Bodhi Linux is given below. Debian/Ubuntu OSes and its derivatives should show a similar result.

[![Installed Apache on Bodhi Linux](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-01-150653_1280x800_scrot.png "Installed Apache on Bodhi Linux")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-01-150653_1280x800_scrot.png)

<br>
### Installing OpenSSL in Debian OS (or in its derivatives)


To have HTTPS protocol in our localhost we need to have Certificate Authority (CA), SSL certificates and its keys. In order to get this done, we will be using a tool called OpenSSL which will let us create these things.

To install OpenSSL, use the command given below:

```
$ sudo apt install openssl
```

For verifying whether the installation of OpenSSL is done properly, on the terminal, give this command:

```
$ openssl version
```

It should give output as such:

```
$ openssl version
OpenSSL 1.1.1  11 Sep 2018
```

<br>
### Creating your own Certificate Authority (CA)


The best way to create self-signed SSL certificates for your server is to create your own Certificate Authority (CA). Creation of a CA involves three files namely,  `RootCA.pem`, `RootCA.key` and `RootCA.crt`.

To generate the `.pem` file and its key (`.key` file), we will use the command given below:

```
openssl req -x509 -nodes -new -sha256 -days 1024 -newkey rsa:2048 -keyout RootCA.key -out RootCA.pem 
```


The output of the above command should like this:

```
Can't load /home/acer/.rnd into RNG
3072431872:error:2406F079:random number generator:RAND_load_file:Cannot open file:../crypto/rand/randfile.c:88:Filename=/home/acer/.rnd
Generating a RSA private key
......................................+++++
............................+++++
writing new private key to 'RootCA.key'
```

As you could see from the above output, there is an error that `.rnd` file was not able to load. This is a minor error, and can be fixed, by removing (or commenting out) `RANDFILE = $ENV::HOME/.rnd` from `/etc/ssl/openssl.cnf` . But doing this will hamper the security if you are making the CA for production purposes. This file is used to store about 256 bytes of seed data from CSPRING which is used internally across invocations. This is useful on low entropy systems that make a lot of SSL invocations, such as in embedded devices. Data in this file is an additional entropy to the existing RNG. As the RNG loads some amount of entropy from system-specific entropy sources at the time it is initialized, the `.rnd` file is not the only source of entropy used in the RNG state.

The most recommended way is to seed something initially, is this: 

```
dd if=/dev/urandom of=~/.rnd bs=256 count=1
```

After which, at least give these permissions of use, or more:

```
$ chmod 600 ~/.rnd
```
Before using the `rootCA.key` and `rootCA.pem` generation command  mentioned before. 

However, since this is not a CA that will be used for a production environment we could move ahead ignoring this error.

The next set of output from the `rootCA.key` and `rootCA.pem` generation command will be a list of questions, which are given below:

```
-----
Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:Delhi
Locality Name (eg, city) []:New Delhi
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Technocrat Inc.
Organizational Unit Name (eg, section) []:cryptonics
Common Name (e.g. server FQDN or YOUR name) []:Abhishek Kumar
```

It is better to answer all these questions with a fictional answer as it's for local development purposes only. (As I have done in above.)

The last step left in creating your own Certificate Authority is to create its certificate file (`RootCA.crt`), by using the below command as so:

```
$ openssl x509 -outform pem -in RootCA.pem -out RootCA.crt
```

<br>
### Domain Name SSL certificate generation

For creation of SSL certificates for domain names that are present in your localhost machine, that uses `hosts` file to point them to `127.0.0.1`, we need to first create a file name `domains.ext` which would list all your local domains. Say we have three domains, namely `localhost` , `fake1.local` and `fake2.local`, the `domains.ext` file would look something like this:

```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = localhost
DNS.2 = fake1.local
DNS.3 = fake2.local
```

After the above file is made, we could now easily generate `localhost.key`, `localhost.csr` and `localhost.csr` files for the localhost SSL encryption. The localhost `.key` and `.csr` files could be generated from below command:

```
$  openssl req -new -nodes -newkey rsa:2048 -keyout localhost.key -out localhost.csr
```

The output of the above code should look something like this:

```
Can't load /home/acer/.rnd into RNG
3072198400:error:2406F079:random number generator:RAND_load_file:Cannot open file:../crypto/rand/randfile.c:88:Filename=/home/acer/.rnd
Generating a RSA private key
................................................................+++++
....................+++++
writing new private key to 'localhost.key'
-----

```

Again, we could ignore the error regarding `.rnd` file in a development server, however, if you do want to resolve this, refer to the CA creation section written before. 

Next set of output is again a list of questions which are answered with imaginary data:

```
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:IN
State or Province Name (full name) [Some-State]:Delhi
Locality Name (eg, city) []:New Delhi
Organization Name (eg, company) [Internet Widgits Pty Ltd]:Technocrat Inc.
Organizational Unit Name (eg, section) []:cryptonics
Common Name (e.g. server FQDN or YOUR name) []:Abhishek Kumar
Email Address []:mr.kumar.abhishek@email.com

Please enter the following 'extra' attributes
to be sent with your certificate request
A challenge password []:something
An optional company name []:Technocrats

```

And finally, we will create the certificate file for the localhost with the below written command:

```
$  openssl x509 -req -sha256 -days 1024 -in localhost.csr -CA RootCA.pem -CAkey RootCA.key -CAcreateserial -extfile domains.ext -out localhost.crt
```

The output of the above command, would be as such:

```
Signature ok
subject=C = IN, ST = Delhi, L = New Delhi, O = Technocrat Inc., OU = cryptonics, CN = Abhishek Kumar, emailAddress = mr.kumar.abhishek@email.com
Getting CA Private Key

```

<br>
### Setting up Apache server to run with the generated SSL certificate and keys


To start we will be moving the localhost certificate and key files to a common place where it will be easy for apache2 server to access it.

We will execute two commands to copy the localhost certificate and key files. First is:

```
$ sudo cp localhost.crt /etc/ssl/certs
```

And the second is:

```
$ sudo cp localhost.key /etc/ssl/private
```

Then we will enable the SSL module of Apache server:

```
$ sudo a2enmod ssl
```
The above command will ask for restarting the Apache service for the full effect to take place; however, we will keep that task on hold till we have configured Apache on which SSL certificate and SSL key files to use.

To configure apache2 server to use our self signed SSL certificates we will edit the following file with `vi` or `vim` editor, as such:

```
$ sudo vi /etc/apache2/sites-available/default-ssl.conf
```

In the above opened file, we will comment out the following lines:

```
SSLCertificateFile    /etc/ssl/certs/ssl-cert-snakeoil.pem
SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key
```
By prepending it with a `#` symbol.

```
# SSLCertificateFile    /etc/ssl/certs/ssl-cert-snakeoil.pem
# SSLCertificateKeyFile /etc/ssl/private/ssl-cert-snakeoil.key
```

Then we will add these two extra lines just below it:

```
 SSLCertificateFile    /etc/ssl/certs/localhost.crt
 SSLCertificateKeyFile /etc/ssl/private/localhost.key
```

After this we will change our current directory to the one given below:

```
cd /etc/apache2/sites-available/
```

And enable the site to use the new SSL certificate and keys with the edited default ssl configuration file:


```
$ sudo a2ensite default-ssl.conf
```

Completing this step, we will now do the remaining task which was asked by the system, i.e. to restart the apache2 service. If you have an old system reload apache with following command.

```
$ sudo service apache2 reload
```

If this doesn't work, do a restart instead:

```
$ sudo service apache2 reload
```

On the other hand if you have new system do this to reload:

```
$ systemctl reload apache2
```

And if it doesn't reloads for some reason, do this:

```
$  systemctl restart apache2
```

The main difference between a reload and restart is that in reload, Apache advises its threads to exit when idle and then reload the configuration. It doesn't reloads itself, that means statistics are not reset. In restart however, it tells its it process to kill all its threads, exit and then start again. 

Also, `service` is used when dealing with old system V init scripts and `systemctl` is used for `systemd` services. It is adviced to not deal with `service` system V init scripts in newer systems unless it is some legacy application, for which this is not.


<br>
### Setting up Chromium to use root CA


To add root CA in your chromium go to `chrome://settings/certificates` from the address bar of the browser. Then choose the “Authorities” tab, and then press on the “Import” button.

[![Authorities tab in certificate settings of Chromium](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-015425_1280x800_scrot.png "Authorities tab in certificate settings of Chromium")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-015425_1280x800_scrot.png)



Then navigate to the location where you have kept your `rootCA.crt` file. 

[![rootCA.crt file](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-015904_1280x800_scrot.png "rootCA.crt file")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-015904_1280x800_scrot.png)

Open it and select the checkbox telling, “Trust this certificate for identifying websites”.

[![checkbox for trusting certificate](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020001_1280x800_scrot.png "checkbox for trusting certificate")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020001_1280x800_scrot.png)

Then press “ok”.

Lastly, navigate to `https://localhost` and see if the certificate exists or not.

[![Existance of SSL certificate](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020329_1280x800_scrot.png "Existance of SSL certificate")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020329_1280x800_scrot.png)

To double-check, you could also click on the “Certificate (Valid)” text and tally the details of the certificate with what you had put in.

[![SSL certificate details](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/c_scale,h_393,q_auto,w_629/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020346_1280x800_scrot.png "SSL certificate details")](https://res.cloudinary.com/mr-kumar-abhishek/image/upload/q_auto/v1586393995/mr-kumar-abhishek.github.io/img/2020-04-05-020346_1280x800_scrot.png)


Generated SSL files are kept in the [git repository of github named localhostSSL](https://github.com/Mr-Kumar-Abhishek/localhostSSL).






