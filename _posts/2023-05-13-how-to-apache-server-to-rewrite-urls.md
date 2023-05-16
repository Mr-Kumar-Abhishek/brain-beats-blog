---
layout: post
title: "How to configure apache server to rewrite URLs in Ubuntu?"
description: If rewrite rule doesn't work on .htaccess of apache, then what to do?
subject: How to configure apache server to rewrite URLs?
apple-title:  How to configure apache server to rewrite URLs?
app-name: How to configure apache server to rewrite URLs?
tweet-title: How to configure apache server to rewrite URLs in Ubuntu?
tweet-description: If rewrite rule doesn't work on .htaccess of apache, then what to do?.
og-title: How to configure apache server to rewrite URLs in Ubuntu?
date: 2023-05-13
keywords: Abhishek Kumar, Software Developer, Apache, Server, rewrite URLs, SEO urls, necessity
---

So, suppose you want to configure Apache to rewrite URLs from `.htaccess`. So you went ahead and wrote a rewrite instruction like this, in `.htaccess`:

```
Options All -Indexes

RewriteEngine On

RewriteRule ^([-a-zA-Z0-9]+)$ index.php?root=$1

```

Now this does two things. The first instruction:

```
Options All -Indexes
```

Makes it so that only parsed files will be shown and the directory listing of files will not be shown even if we give the correct URL of that directory from the client. 

Second, this portion of the instruction:

```
RewriteEngine On

RewriteRule ^([-a-zA-Z0-9]+)$ index.php?root=$1
```

Makes it so that all the files pointing to say https://localhost/something will actually point to 
https://localhost/index.php?root=something.

Well, this is all well and good but most of the time, if it's your local Ubuntu computer, these settings will not be enough.

One thing that happens is, Apache doesn't allow .htaccess configuration files. This could be resolved by setting the "AllowOverride" directive to "All" for your site's directory.
This tells Apache to allow the use of .htaccess files. You can modify this directive in your site's virtual host file located in the Apache "conf" folder.

Here's the path to the file on some common operating systems: 

- Ubuntu: /etc/apache2/apache2.conf 
- CentOS: /etc/httpd/conf/httpd.conf 
- Mac OS X: /etc/apache2/httpd.conf 
- Windows: C:\Program Files (x86)\Apache Group\Apache2\conf\httpd.conf 

Again, the exact path may differ depending on your installation and operating system.

To enable .htaccess files for your Apache server, we'll need to modify the main Apache configuration file (httpd.conf or apache2.conf) and set the AllowOverride directive to "All" for the directory where we want to allow .htaccess files. Open the httpd.conf file using a text editor, navigate to the section for your virtual host, and add the following lines:
```
<Directory /path/to/your/directory>
    AllowOverride All
</Directory>
```

Replace "/path/to/your/directory" with the path to the directory we want to allow .htaccess files in. Save the file and restart the Apache server. After making these changes, Apache should now allow .htaccess files to override the server configuration in the specified directory.

After setting this up and restarting Apache with:

```
sudo service apache2 restart
```
You may get a 500 internal server error. To check for errors in internal server error. 

The internal server error you're seeing when trying to use that code may indicate a syntax error or other issue with the code. The RewriteRule you posted is attempting to rewrite URLs in the format of example.com/something to example.com/index.php?root=something. Here are a few things you can try to troubleshoot the issue: 

1. Check for syntax errors: Make sure there are no typos or other syntax errors in the code. For example, make sure the RewriteEngine directive has a valid value (On or Off). 

2. Verify the server supports mod_rewrite: Check that the Apache mod_rewrite module is installed and enabled on the server. You can check this by running the following command in the terminal:
```
sudo apache2ctl -M | grep rewrite
```
If mod_rewrite is not listed, you'll need to enable it in your Apache configuration file. 

3. Check the server error log: The internal server error may be caused by another issue that is unrelated to the .htaccess file. Check the server error log for more information about the error. The error log can usually be found in the Apache logs directory (e.g. /var/log/apache2/error.log).

Usually, you will find the answer in the 3rd step. So, in my setup, I got this error by checking `/var/log/apache2/error.log`

```
Sat May 06 19:57:44.750987 2023] [core:alert] [pid 18407] [client ::1:54444] /var/www/html/.htaccess: Invalid command 'RewriteEngine', perhaps misspelled or defined by a module not included in the server configuration, referer: http://localhost/sw.js

```

Based on the error message I posted, it looks like the mod_rewrite module may not be enabled on my server. This is because the server is reporting that the "RewriteEngine" directive is not a valid command. To confirm that the mod_rewrite module is enabled, we can run the following command in your terminal:
```
sudo apache2ctl -M | grep rewrite
```

If mod_rewrite is listed as one of the loaded modules, it means that the module is enabled. If it's not listed, we will need to enable it in your Apache configuration file. To enable the mod_rewrite module, we can run the following command:
```
sudo a2enmod rewrite
```

This should enable the mod_rewrite module and allow the "RewriteEngine" directive to work in your .htaccess file. After enabling the module, be sure to restart the Apache server for the changes to take effect.

```
sudo service apache2 restart
```




