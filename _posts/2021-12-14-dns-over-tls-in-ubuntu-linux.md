---
layout: post
title: "DNS over TLS in Ubuntu Linux"
description: This article will show you on how to secure your computer with enabling DNS over TLS in Ubuntu Linux with all the explainations of the commands.
subject: DNS over TLS in Ubuntu Linux
apple-title: DNS over TLS in Ubuntu Linux
app-name: DNS over TLS in Ubuntu Linux
tweet-title: DNS over TLS in Ubuntu Linux
tweet-description: This article will show you on how to secure your computer with enabling DNS over TLS in Ubuntu Linux with all the explainations of the commands.
og-title: DNS over TLS in Ubuntu Linux
og-url: blog/2021/12/14/dns-over-tls-in-ubuntu-linux
canonical-url: blog/2021/12/14/dns-over-tls-in-ubuntu-linux
date: 2021-12-14
keywords: Abhishek Kumar, Software Developer, DNS over TLS, DNS over HTTPS, DoT, DoH, network, security, networking, DNS, Ubuntu, Linux
---
In the previous article, I have compared the differences between DNS over TLS and DNS over HTTPS. In this article, I will show you how to enable DNS over TLS in Ubuntu Linux. 

Why?

Well, it is to increase the privacy and security of the users. This will prevent eavesdropping and manipulation of DNS traffic by MITM (man in the middle) attacks.

Now, although some browsers such as firefox do have DNS over HTTPS enabled by default, that only secures your particular web browser and not the other internet connections that your computer is making. Such as when your system connects to the internet for updates or when you use other desktop web apps such as Discord.

To enable DNS over TLS in Ubuntu Linux we will use a service of Systemd called `systemd-resolved`.  This service will allow all your DNS request to get tunneled with DNS over TLS. This means that your whole computer will have extra protection 
and there will be no need to enable this feature in your browsers individually because you are already protected.

By default, systemd-resolved is already enabled in Ubuntu and Ubuntu-based distros. 

To start, we will first check the status of our system.

```
$ resolvectl status
```

This will check if you have DNS over TLS already enabled or not. If you do have DNS over TLS enabled, you will see an entry such as this in the list of entries:

```
DNSOverTLS setting: yes    
```

Otherwise, you will have to enable it. To enable it you have to set up systemd-resolved. Its configuration file can be found in path `/etc/systemd/resolved.conf`. To look at the file contents just use this command:

```
$ cat /etc/systemd/resolved.conf
```
It will give an output as such:

```
#  This file is part of systemd.
#
#  systemd is free software; you can redistribute it and/or modify it
#  under the terms of the GNU Lesser General Public License as published by
#  the Free Software Foundation; either version 2.1 of the License, or
#  (at your option) any later version.
#
# Entries in this file show the compile time defaults.
# You can change settings by editing this file.
# Defaults can be restored by simply deleting this file.
#
# See resolved.conf(5) for details

[Resolve]
#DNS=
#FallbackDNS=
#Domains=
#LLMNR=no
#MulticastDNS=no
#DNSSEC=no
#DNSOverTLS=no
#Cache=yes
#DNSStubListener=yes
#ReadEtcHosts=yes
```

Now we have to modify this file. To modify this file, use any text editor with root access. I am more comfortable with vim so I will use this command:

```
$ sudo vi /etc/systemd/resolved.conf
```
Then we have to apply these changes to the file:

```
[Resolve]
DNS= 1.1.1.1 1.0.0.1
FallbackDNS= 8.8.8.8 8.8.4.4
Domains=~.
#LLMNR=no
#MulticastDNS=no
DNSSEC=yes
DNSOverTLS=yes
#Cache=no-negative
#DNSStubListener=yes
#ReadEtcHosts=yes
```

Be sure to remove any `#` before making modifications on that line. As `#` denotes that it is commented out.

A quick explanation of the above-edited options are described below:

**DNS** : This is a space separated list of IP addresses, both IPv4 and IPv6 addresses can be included in this. These IP addresses represent the system DNS servers.

**FallbackDNS** : This is also a space separated list of IP addresses. Again both IPv4 and IPv6 addresses can be used in this. These IP addresses represent the system's fallback DNS servers.

**Domains** : Domains in this are used as search suffixes when resolving a single labeled hostnames. Here `.~` stands for system  DNS server defined with DNS = all domains are preferred.

**DNSoverTLS**:  If this option is true, then, all the connections to the DNS server will be encrypted. Keep in mind that to have this option to be enabled and working properly, you need to have a DNS server that supports DNS-over-TLS and has a valid certificate for its IP address. 

**DNSSEC** :  This stands for domain name system security extensions. This is in most cases enabled by default.  It is a suite of extension specifications by IETF. It secures the data exchanged in DNS in IP networks.

Some key points to note here are that DNSSEC may have been enabled by default. Also, I am not using the regular DNS which is provided by the ISP, rather I am using the Cloudflare DNS as the primary DNS and google public DNS as the fallback DNS.

Once you have done these changes restart the Network Manager, like this:

```
$ sudo systemctl restart NetworkManager
```

And lastly, check if everything is fine:

```
$ resolvectl status
```
```
Global
 LLMNR setting: no
MulticastDNS setting: no
 DNSOverTLS setting: yes
 DNSSEC setting: yes
 DNSSEC supported: yes
 Current DNS Server: 1.1.1.1
 DNS Servers: 1.1.1.1
 1.0.0.1
Fallback DNS Servers: 8.8.8.8
 8.8.4.4
 DNS Domain: ~.
```
Since we are using Cloudflare DNS, we could also use [this Cloudfare service](https://1.1.1.1/help) to test our connections.

