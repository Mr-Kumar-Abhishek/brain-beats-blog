---
layout: post
title: "To use /n or endl in C++ ?"
description: When we talk about /n or endl, they serve the same purpose but, endl causes flushing of the output buffer where as /n does not.
subject: Difference between /n and endl in C++
apple-title: To use /n or endl in C++ ?
app-name: Difference between /n and endl in C++
tweet-title: Key difference between /n and endl in C++
tweet-description: When we talk about /n or endl, they serve the same purpose but, endl causes flushing of the output buffer where as /n does not.
og-title: Difference between /n and endl in C++
date: 2022-08-30
keywords: Abhishek Kumar, Software Developer, C++, endl, /n, print, output buffer, flushing of buffer
---

When we talk about `endl` and `/n`, they both serve the same purpose in C++ that is to insert a new line. There is a difference in them too though. 

**The main difference in using `endl` and `/n` is that the `endl` flushes the output buffer every time it is called, on the other hand `/n` does not.**

We can understand the implication of this with an example. Say, we need to print 26 letters of the English alphabet on the screen. So to do that here I have written a short program to that with `endl` in `english-alphabet.cpp` file :

```
#include <iostream>
using namespace std;

int main() {
	for (char i='a'; i <='z'; i++){
		cout << i << endl;
	}
	
	return 0;
}

```

After compiling:

```
$ g++ english-alphabet.cpp -o english-alphabet
```

And running it:

```
$ ./english-alphabet
```

We get an output as such:

```
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
q
r
s
t
u
v
w
x
y
z
```

So it does, what we intend it to do. But when we look at line 6 of the code:

```
cout << i << endl;
```

The output buffer is flushed by `endl`. Therefore, the output buffer is flushed 26 times for each letter, that is every time it prints one letter.

Well, if you consider this type of function in a scaled-up scenario, it is an expensive operation. So a usual way to improve the performance is to store a substantial chunk of data in the temporary buffer and then write it to the device such as hard disk, monitor, etc. and hence flushing the output buffer then. By delaying all the writings and writing a substantial amount of data in one go the performance is improved.

To do this we use `/n` instead of `endl`  in a file named, say, `english-alphabet-2.cpp` :

```
#include <iostream>
using namespace std;

int main() {
	for (char i='a'; i <='z'; i++) {
		cout << i << "\n";
	}
	return 0;
}
```

After we compile it:

```
$ g++ english-alphabet-2.cpp -o english-alphabet-2
```

And run it:

```
./english-alphabet-2
```

We get an identical output:

```
a
b
c
d
e
f
g
h
i
j
k
l
m
n
o
p
q
r
s
t
u
v
w
x
y
z
```
But since we are using `/n` in line 6 of the program:

```
cout << i << "\n";
```
It would fill the 26 characters in the output buffer first and flush it only at the end of the program once. 

### Conclusion

Of course, this difference between `\n` and `endl` is not much significant in small programs but `endl` performs worse than `\n` because of the constant flushing of the output buffer if the nature of the task is like this.

