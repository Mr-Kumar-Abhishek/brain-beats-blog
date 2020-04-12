---
layout: post
title: "Overview of main function in C and C++"
description: This article is intended for Linux users who are also C / C++ programmers. This gives an overall view and in-depth understanding main function in C and C++ language along with its usage.
subject: Overview of main function in C and C++
apple-title: Overview of main function in C and C++
app-name: Overview of main function in C and C++
tweet-title: Overview of main function in C and C++
tweet-description: This article is intended for Linux users who are also C / C++ programmers. This gives an overall view and in-depth understanding main function in C and C++ language along with its usage.
og-title: Overview of main function in C and C++
og-url: https://mr-kumar.tk/blog/2020/04/11/overview-of-main-function-in-c-and-c-plus-plus
canonical-url: https://mr-kumar.tk/blog/2020/04/11/overview-of-main-function-in-c-and-c-plus-plus
date: 2020-04-11
keywords: Abhishek Kumar, Software Engineer, C, Linux, C++, main, function, C18, gcc, gdb, clang
---

When we talk about the `main` function in C and C++, from a programmer’s perspective, it is the entry point of the program in hosted environments, that is when we are with the benefit of an operating system. It is the point at which the execution of the program starts. Some texts may say that every C or C++ program will have a `main` function, however, there are ways to make C programs which don't have the `main` function. Of course, some of these techniques of running the C program without the `main` function will create problems and will require more adjustments while cross-compiling on different systems. We will look into a bit more detail on how to run C programs without the `main` function in the later section of this article.

`main` function is also not necessary in freestanding environments, where the program executes without the benefit of an operating system. Embedded systems or an OS Kernel are considered good examples of a freestanding environment. 

It is worth noting that, there is a bulk-load of things that happen before the `main` function is executed, depending on what implementation and/or which compiler you are using.  Say, for example, the GCC C compiler running over Linux/Unix-like OS uses the `_start` function as the entry point of a C program, which makes a call to `main` function. 

Every hosted or freestanding environment has a different way of implementing C ABI ([Application Binary Interface](https://en.wikipedia.org/wiki/Application_binary_interface)). What one needs to do is,  provide the [linker](https://en.wikipedia.org/wiki/Linker_(computing)) with the correct symbol it is expecting. When looking at embedded programming, a programmer may have to put the first instruction of a program at a specific memory address, but in other cases, outside embedded programming, it is usually a jump instruction to where `main` function ends up. 

<br>
<br>
<br>
### Properly creating main functions in C on a hosted environment following the C18 standard.

As per C18 standard of C, `main` functions can be written in a program via two ways:

* Defined with a return type of `int`, without any parameters
* Defined with a return type of `int`, with two parameters

An important point to note here is that an implementation defines no prototype here.

<br>
<br>
<br>
#### Main function in C without parameters as per the C18 standard.

To create a main function with a return type of `int` and with no parameters as per C18 standard, we have to write our `main` function like this:

```
#include <stdio.h>

int main(void){

	/*  rest of the code here */

	return 0;
}

```
<br>
<br>
<br>
##### Major misconception regarding how to exactly write a main function in C with no parameters.

There are few misconceptions regarding how to exactly write a `main` function in C with no parameters, of which, one of them is this way:

```
#include <stdio.h>

int main(){
	
	/* rest of the code here */

	return 0;
}
```

Although the above way of writing `main` function will not crop any errors, it is still not according to the C18 standard of C. Let me explain why. Whenever we define a function that has a type but does not include a prototype, and if the number of arguments does not equal the number of parameters, the behavior then is undefined [ref. 6.5.2.2, point 6 of C18 standard]. So in a scenario, if this main function is called with arguments, the behavior of the program is undefined. The C18 standard does not mandate the implementation (whether it is GCC or clang) that it should issue a diagnostic for a program that invokes an undefined behaviour. So, the above program could still be erroneous, depending or not whether the `main` function is called with arguments or not.

To explain the above paragraph programmatically, we will take an example of recursive `main` functions. First with the format `main()`:
```
#include <stdio.h>

int main(){

	main(11,"abc",44.28);
	return 0;
} 

```

Now, the above code will work fine. It won’t give any errors. The code will compile successfully with GCC and clang. However, it will cause segmentation fault while runtime as the recursion is infinite. The above code does not violate any constraint, it would have if it was written in prototype-form, hence, the compiler is not required to issue a diagnostic.

To remove the segmentation fault we just need to limit the recursion by modifying the above code as such:

```
#include <stdio.h>

static int count = 1;
int main(){

        if( count > 2 ) {
                return 0;
        }else {
                count++;
                main(11,"abc", 44.4);
        }

}
```


One would ask, on how the above two pieces of code are not in prototype-form. To clarify this, we need to understand that a function declarator only serves as a function prototype for later calls to the same function in the same translation unit, if the declarator includes a parameter type list and the list also specifies the types of all the parameters included [refer to 6.1.9.7 of C18 standard]. Hence, the above `main` function in both does not provide a prototype nor does the implementation.

For historical reasons, originally, C didn’t have prototypes, as C evolved from B which was a typeless language. Afterward the prototypes were added, and the original typeless declarations were left in language for backward compatibility.

On the other hand, when we look at the below code of `main` function recursion:

```
#include <stdio.h>

int main(void) {
	
	main(10,"abc",12.28);
	return 0;
}
```

The above code while compiling will throw an error: `"error: too many arguments to function ‘main’`. This is because the above `main` function is a prototype-form and subsequently there is a constraint violation. Keep in mind that in both methods, the number of parameters is not equal to the number of arguments provided, so they fall into the category of undefined behavior [refer. 6.5.2.2, point 6 of C18 standard], but as the second method is in prototype-form, it enables checks for the constraint violation. This could be studied in detail by referring to the section called “runtime-constraint violation” of the C18 standard. In it, one would find a specific function named, “runtime-constraint handler” is called whenever a call to a function is made with invalid parameters. This “runtime-constraint handler” function is required to provide a diagnostic. With the rest of the C18 standard, this is in sharp contrast, where behavior under such errors is mostly undefined, i.e, anything may happen depending on how the implementation was done. 

Furthermore, I would like to mention that, as per the C18 standard of C, use of function declarators with empty parenthesis i.e which is not a prototype-format parameter type declarator is considered as an obsolescent feature. Also, usage of function definition with separate parameter identifier and declaration list which is not a prototype-format parameter type and are not identifier declarators is also obsolescent.


<br>
<br>
<br>
##### Writing a main function with no parameters in C++ with contrast to C

In C `int foo()`  means that a function `foo` is taking an unspecified number of arguments whereas `int foo(void)` is taking no arguments at all. However, in C++ things change slightly. In C++ writing `int bar()` means that a function `bar` is taking no arguments and writing `int bar(void)` also means the same i.e that a function named `bar` is taking no arguments [as per C++ 17 standard]. With this principle in place, either writing `main` function in this way:

```
#include <iostream>

int main(){
	/* rest of the code here */
	return 0;
}
```

Or this way:

```
#include <iostream>

int main(void){
	/* rest of the code here */
	return 0;
}
```
Means the exact same thing.

We could further test and verify the above concept by compiling recursive `main` functions in C++. The first one being:

```
#include <iostream>

int main() {
        main(5);
        return 0;
}
```

And second one being:

```
#include <iostream>

int main(void) {
        main(5);
        return 0;
}
```

In the compilation of both the programs from g++  of GCC, the error is the same, i.e.  `error: too many arguments to function "int main()`. Notice here, that the compiler didn’t check for infinite recursions and halted before at the argument checks. So both methods of declaration of `main` function in C++ are correct. However, by writing `int main(void)` we get the same interpretation in both languages. This process of declaring functions (like `int main(void)`) is generally quite handy while making our headers multilingual. Although, for making the code truly cross-language we would also need to wrap them in `extern C` while compiling in C++.


<br>
<br>
<br>
##### The misconception of having a void return type with the main function

Some may come across code in which the return type of `main` function is `void`. This is inherently a bad practice unless and until the code was made for a freestanding environment (and not for a hosted environment) for which it could theoretically be correct. For a hosted environment, the C18 standard clearly defines that the `main` function should have an `int` return type. 

To explain this further, from a programmer’s perspective, `main` function is called from the OS, and it's returned value is returned to the OS. These return values are used to track errors in a program, and to check if the program exited gracefully or not. Modern languages, however, use exception handling to manage this more efficiently.

A typical `main` function with return type `void` would look like this:

```
#include <stdio.h>

void main(){
	/* rest of the code here */
}
```

From studying the above code we could also identify another erroneous way in its writing that `main` function is not in a protoype-form. While the above code will compile without errors and will even run smoothly on an OS, it will show error codes when testing it with a debugger. The results which I am going to show are from GNU debugger, it is used alongside GCC C compiler often. When running through the GNU debugger (gdb), it shows the following output:

```
[Inferior 1 (process 7414) exited with code 0334]
```
As we can see from above that it exited with code 0334. Now, when we run the `main` function that is following C18 standard, that is this one:

```
#include <stdio.h>

int main(void){
	/* your code here */
	return 0;
}
```

We get this output from GNU debugger (gdb):

```
[Inferior 1 (process 7476) exited normally]
```

This clearly states that the program ran successfully and exited normally as well. There are two reasons for this when compared with the previous code. First, it has a return type set to `int` and the second is that the return value is 0, which, by convention means a successful exit without any errors or failures. 

Also, a `main` function which does have a prototype-form and has `void` return type is also erroneous: 

```
 #include <stdio.h>

void main(void){
}


```
The above program will also return the same code of 0334


```
[Inferior 1 (process 7600) exited with code 0334]
```

While considering `int` return values from `main` function, 0 is considered as a successful exit, positive integers are considered as minor problems or warnings and negative integers are meant for some sort of failure and error, of which the first used value is -1.

Below is a short program of `main` function which shows error and some sort of failure:

```
#include <stdio.h>

int main(void) {
	return -1;
}
```  
Running the above program through GNU debugger (gdb), we get the following code:

```
[Inferior 1 (process 7738) exited with code 0377]
```

Remember that depending on the complexity of the program, one could return negative integers lesser than -1 which could be judged through conditional statements along with the return of -1 on specific conditions.

An example of simple `main` functions reporting warnings or minor problems can be as such:

```
#include <stdio.h>

int main(void) {
	return 1;
}
```
The code returned by the above program when running through GNU debugger (gdb) will return this:

```
[Inferior 1 (process 7911) exited with code 01]
```

A quick thing to notice here is that all positive return values of `main` function tally with the code returned by GNU debugger (gdb).

<br>
<br>
<br>
##### Main function without a return type

In old standards of C such as C89 and C90, there was a feature which enabled programmers to write `main` function without a return type:

```
#include <stdio.h>

main(){
	return 0;
}
```

What happened in the above program when compiling with a compiler following C89 or C90 standard, is that the compiler implicitly declared the main function’s return type as `int`.A compiler targeting C99 or later standards will give the following warning, while compilation:

```
test10.c:3:1: warning: return type defaults to ‘int’ [-Wimplicit-int]
 main(){
 ^~~~
``` 


However, if we twist this a little further and even remove the return value:

```
#include <stdio.h>

main(){

}
```
Then compile with a compiler following C89 or C90 standard, the program returns a code of 0334 when running through GNU debugger (gdb):

```
[Inferior 1 (process 8435) exited with code 0334]
```

This is the same code when the `main` function is with a return type of `void` or when the return type is `int` but no return values are specified for a compiler following C89 or C90 standard.

<br>
<br>
<br>
##### Main function without a return value

From the C99 standard of C onwards, `main` function implicitly returns an `int` value of 0, if the return value is not explicitly written. Hence, the below code is valid from C99 standard of C to C18 (and maybe also in future standards):

```
#include <stdio.h>

int main(void){
}
```
<br>
<br>
<br>
#### The main function in C with two parameters following the C18 standard.

To create a main function in C with two parameters which follows C18 standard, we need write is like this:

```
#include <stdio.h>

int main(int argc, char *argv[]){

	return 0;
}
```
Things to note here is that, while following the above format, it is not necessary to explicitly give a return value of 0. Hence, this is also valid:

```
#include <stdio.h>

int main(int argc, char *argv[]){

}

``` 

Another thing to see here is that although we have used the variable names as `argc` and `argv`, it is not necessary to use the same variable names. So even a format such as this is also valid:

```
#include <stdio.h>

int main(int argn, char *args[]){

}
```

Implementation will also accept this format:

```
#include <stdio.h>

int main(int argc, char **argv){

}
```
The `main` function here is accepting `**argv` instead of `*argv[]` due to “array decay”, which could be explained with three points:

* Mentioning the name of the array in an expression will usually evaluate to a pointer to the array’s first element.
* The “array subscripting” operator only works for pointers. This means that whenever we type `[]` in an expression we will get a pointer to the first element.  In short, `arr[i]`equivalent to `*(arr + i)`.    
* And in special cases, a function parameter that seems to be an array is declared as a pointer. This is referred to as “array adjustment”, in which the compiler implicitly changes the declaration of the function parameter which is in array type to a pointer of the array’s first element. 

To summarize the above three points for C++/C more precisely, we could say that an expression that has an array type is converted into pointer type that points to initial element of the array object (which is not an lvalue), except when it is an operand of `sizeof` operator, or the unary operator `&`, or is a string literal which is utilized to initialize an array.

However, for sake of explanation on the usage of `main` function with two parameters, we are going with the program:

```
#include <stdio.h>

int main(int argc, char *argv[]){

}
```

The two parameters, `argv` and `argc`, are used to manage command-line arguments that are given by OS, through a command-line interface (CLI/CUI). Functionality and usage of these two variables are given below:

* argc (argument count): This is an `int` variable which stores the number of command-line arguments that were passed to the program, including the name of the program. So, for example, if the program was passed with one value, the value of `argc` will be 2. As per C18 standard of C, the value of `argc` will always be non-negative. 
* argv (argument vector): This is an array of character pointers that lists all the arguments. As per theC18 standard of C, the value of `argv[argc]` will always be a null pointer.

Discussing further on the relationship of these two variables, we see that if the value or `argc` is greater than 0, then the array members from `argv[0]` to `argv[argc-1]` will contain pointers to strings, which are set to implementation-defined values given by the host environment (i.e. the OS), before the execution of the program. The motive here is to supply the program with the information, which is determined before the execution of the program,  from a location in the hosted environment. Here, when the host environment (eg. OS) is not capable of supplying strings with letters which are both in uppercase and lowercase, the implementation ( eg. GCC C compiler) will ensure that all the strings are received in lower case.

Another condition while the value of `argc` is greater than 0, is that the string pointed by `argv[0]` will hold the program’s name. If the program name is not available from the host environment (say OS)  then the value of `argv[0][0]` will be set to a null character (`\0`).

 Now, if the value of `argc` is greater than 1, then strings pointed from `argv[0]` to `argv[argc-1]` are represented as “program parameters”.

Lastly, the parameters, i.e. `argc`, `argv` and the strings pointed by the `argv` array will always be modifiable by the program. On top of it, they will retain their last stored values from the program’s initialization to its termination.

**The same concept is followed in writing a `main` program in C++ with two parameters.**

<br>
<br>
<br>
### Writing C program without a main function

There are few ways to write a C program without a `main` function. The most popular one in Unix-like system is this:


```
#include <stdio.h>

extern void _exit(register int);

int _start(void){
        printf("From the Unix-like OS\n");
        _exit(0);
}
```

To compile this with GCC C compiler we have to use the option of `-nostartfiles` which gives us the facility to override `_start` and gives us the full control from the initiation:

```
$  gcc no-main.c -o no-main -nostartfiles

```

Similar command will work with a clang compiler:

```
$  clang no-main.c -o no-main -nostartfiles
```

From the system’s perspective, `_start` is the first function that is called. Usually, `_start` is responsible for setting up the environment for program execution, then it goes ahead and calls the `main` function. `_exit` is also a function that is called before the program execution, to set up the environment. `_exit` works at the machine level so it takes the input that has a register storage class. Therefore, `register` keyword is used in the above program. 

Other methods of writing C programs without `main` function is by using the preprocessor. But since preprocessor just changes the written texts of the code, it might not fully qualify as a C program without the `main` function.

Using macros, of C preprocessor, we could write a C program without a main function like this:


```
#include<stdio.h>

#define big_bang main

int big_bang(void){

        printf("Booom !!!\n");

}
```
Here, we are just replacing `big_bang` by `main` before the compilation starts. (It follows C11 or later standard).

Another way to use the preprocessor to complete your `main` function is by using its token pasting feature, as such:

```
#include<stdio.h>

#define starting m##a##i##n

int starting(void){

        printf("hello token!\n");

}
```

The above program uses token pasting operator `##` (Also called token concatenation.). The operands around `##` operator are merged into a single token during macro expansion. So,
`m##a##i##n` is replaced with `main`. Then afterward, `starting` is replaced `main`.
Writing C++ program without the main function following C++ 17 standard

All the methods used in C can be used in C++ to write a program without a `main` function, however, with C++ we have few more methods.  The first one is by using static initializer:

```
#include <iostream>

using namespace std;

int execute_me(void){
        cout << "excute_me(void) ran !!" << endl;
        exit(EXIT_SUCCESS);
}

static int x = execute_me();

int main(void){
        cout << "main() ran !! (actually this will never happen)" << endl;
}
```
In the above program, what we did was, we used a static initializer to call a custom function, before `main` and in that custom function we called `exit` function, so that the program terminates before the control reaches the `main` function. 

The second method, which is based on the previous method, uses constructor along with other same concepts:

```
#include <iostream>

using namespace std;

class start_on{
        public:
                start_on(void){
                        cout << "start_on constructor !!" << endl;
                        exit(EXIT_SUCCESS);
                }
};

static start_on s;

int main(void){
        cout <<"main function here... I will never run" << endl;
}
```

That is all for the overview of `main` functions in C and C++. The programs and examples given here will never meet requirements for writing an initial `main` function which is meant for real-world applications and programs. If needed I will write on how to write a `main` function in C/C++ with a pragmatic approach in the future.
