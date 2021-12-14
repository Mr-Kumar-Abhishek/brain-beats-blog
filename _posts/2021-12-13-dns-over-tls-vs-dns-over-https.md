---
layout: post
title: "DNS over TLS vs DNS over HTTPS"
description: This article compares the technical aspects of DNS over TLS and DNS over HTTPS. It weighs pros and cons of both and compares which is suitable in which scenario.
subject: DNS over TLS vs DNS over HTTPS
apple-title: DNS over TLS vs DNS over HTTPS
app-name: DNS over TLS vs DNS over HTTPS
tweet-title: DNS over TLS vs DNS over HTTPS
tweet-description: This article compares the technical aspects of DNS over TLS and DNS over HTTPS. It weighs pros and cons of both and compares which is suitable in which scenario.
og-title: DNS over TLS vs DNS over HTTPS
og-url: blog/2021/12/13/dns-over-tls-vs-dns-over-https
canonical-url: blog/2021/12/13/dns-over-tls-vs-dns-over-https
date: 2021-12-13
keywords: Abhishek Kumar, Software Engineer, DNS over TLS, DNS over HTTPS, DoT, DoH, network, security, networking, DNS
---

The security of the internet heavily relies on the DNS we use. Since DNS is like a phonebook of the internet, tampering in the DNS resolvers can affect the entire security of all the connections that are made through the internet. DNS resolvers are used for getting the IP addresses of the domain. Usually, DNS queries and responses are sent via UDP (User datagram protocol) in plain text. This means that they can be read by network ISP or anyone who has the access to monitor transmissions such as the government. Even if you are using a website that is connected over HTTPS, your DNS queries and responses are still exposed, meaning, authorities who monitors your connection can identify what websites you are visiting even though the traffic between the website is encrypted. 

This lack of privacy has a big impact on security and sometimes even on human rights. There have been cases before that a website is blocked from access by the government or any other censorship organization.  It then also becomes easier for attackers to stalk users' behavior online. 

To encrypt this plain text DNS traffic, there are two standards are developed, that is, DNS over TLS (DoT) and DNS over HTTPS (DoH). This encrypted traffic bars malicious parties, ISPs, and advertisers from interpreting the data. 

DNS over TLS and DNS over HTTPS may seem like the same thing overall. However, even though they provide more or less the same functionality i.e DNS encryption, there are differences between them on how they are implemented, and what are their pros and cons are in different situations of network privacy. So let us first understand them one by one, as in what are they.

## DNS over TLS

DNS over TLS or DoT is a standard defined in RFC 8484 for encrypting DNS queries to keep them secure and private. DoT uses a security protocol called TLS which HTTPS websites also use to encrypt and authenticate communications. What DoT does is that it adds TLS encryption over UDP which is used for DNS queries. It also sees that the DNS requests and responses are not changed, tampered with, or forged via on-path attacks. It also uses TCP as a standard connection protocol and layers it for standard TLS authentication and encryption. DoT uses port number 853. Since it uses a distinct port, anyone on the network level can find them and block them. However, it is a good option if the user doesn't want to deal with clients, which are provided by the DNS referrers or forwarders.


## DNS over HTTPS

DNS over HTTPS or DoH is another similar standard defined in RFC 8310 and RFC 7858 for encrypting DNS queries. DNS queries and responses are sent over HTTP/2 protocol instead of directly over UDP. DoH also ensures that the DNS traffic is not forged and tampered with. DoH uses the standard port of HTTPS  that is 443. Since it uses the same port of HTTPS it looks like any other HTTPS traffic from the network administrator's perspective. So DoH requests can stay hidden in HTTPS traffic. It is also, therefore, a right solution where other ports are blocked.

## So which is better, DoH or DoT?

This is debatable. When we look from a network security perspective, DoT is better. It gives network administrators the option to monitor and block DNS queries. This is important for identifying and blocking malicious traffic. DoH on the other hand is hidden in the usual HTTPS traffic, which means, they cannot be blocked unless you are blocking all HTTPS traffic along with it as well.  From a privacy perspective, DoH is much preferable since DoH traffic is hidden in a larger flow of HTTPS traffic. This gives network administrators less control but gives users more privacy.

If we look at encryption and security point of view both DoT and DoH are equally secure. However, both function differently. And how secure they are is entirely subjective based on their use cases. For example, DoT can be improved in specific scenarios like DoH.

Also, DoH is quite beneficial for ad networks and trackers, as it brings DNS to the application layer on the other hand DoT is suitable for layered abstraction.


