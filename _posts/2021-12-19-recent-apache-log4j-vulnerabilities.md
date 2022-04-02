---
layout: post
title: "Recent Apache Log4j vulnerabilities"
description: Brief summary of recent Apache Log4j vulnerabilites.
subject: Recent Apache Log4j vulnerabilities
apple-title: Recent Apache Log4j vulnerabilities
app-name: Recent Apache Log4j vulnerabilities
tweet-title: Recent Apache Log4j vulnerabilities
tweet-description: Brief summary of recent Apache Log4j vulnerabilites
og-title: Recent Apache Log4j vulnerabilities
og-url: blog/2021/12/19/recent-apache-log4j-vulnerabilities
canonical-url: blog/2021/12/19/recent-apache-log4j-vulnerabilities
date: 2021-12-19
keywords: Abhishek Kumar, Software Developer, Apache, Log4j, hacker, security, cracker
---
The recent Apache Log4j vulnerability has impacted more than  35,000 java packages. It is approximately 8% of the Maven Central repository.

There were two vulnerabilities disclosed, first, allows the remote code injection in Log4j. The remote code execution can be done by the LDAP JNDI parser. As per the security guidelines of Log4j, the JNDI features that are utilized in configurations, log messages, and parameters do not shield against an attacker who is controlling JNDI-related endpoints such as LDAP and others. This cracker who could control log messages and/or log message parameters will be able to execute arbitrary code. The arbitrary code is loaded from LDAP servers when enabling of message lookup substitution is done. 

Logging of untrusted or user-controlled data in an old version of Log4J that is prior to v2.15.0 would result in remote code execution against the application running it. This includes but is not limited to logged errors such as exception traces, authentication failures, also, as well as other unexpected vectors of user-controlled input. 

The other vulnerability was the incomplete fix in Log4j 2.15.0. It was incomplete in certain non-default patterned layout logging configurations with Context Lookup or a Thread context map pattern (MDC). This allowed attackers to craft malicious data using the JNDI lookup pattern. Hence, resulting in remote code execution and Denial Of Service attacks.

These two vulnerabilities were most discussed in the information security ecosystem mainly because its severity and widespread impact since its disclosure on December 9th. Log4j is a well-known logging tool in use by many software packages known as artifacts in the Java ecosystem. It is also used in many projects across the software industry. Since it is not clear what is in their dependency and transitive dependencies, it made the patching process difficult. It is also difficult to determine the full blast radius of this vulnerability. 
