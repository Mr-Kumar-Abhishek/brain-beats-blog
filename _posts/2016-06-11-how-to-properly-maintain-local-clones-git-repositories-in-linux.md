---
layout: post
title: "How to properly maintain local clones git repositories in Linux ?"
date: 2016-06-11
---

Maintaining local clones of git repositories in Linux could become tiresome especially if you are a software developer who:

* usually works in slow Internet Connection and has low Internet bandwidth
* switches a lot between various systems having windows OS or Linux or both
* is working on a wide range projects all in different domains.
* is using Puppy Linux ( mostly ) for Software development.
* has standard  (frugal) installation of Puppy Linux or frugal installation of any other Linux Distro.
* needs to move a lot of git repositories around the system. 

Now, git is a wonderful tool to maintain your software's source code. Agreed. I prefer it over [svn](https://en.wikipedia.org/wiki/Apache_Subversion) and [mercurial](https://en.wikipedia.org/wiki/Mercurial) too. But maintaining a lot of local clones can sometimes become a nightmare.

Say for instance, you have 50 git repositories, and you have to move all of them to different location . What do you do ?? Write a quick bash script to do the job ?? Well you could, but then you will have reconfigure those individual repositories.

 Tiresome isn't it ?

Well, it was for me too, Luckily I was helped by one of my friend who actually introduced me to Linux long back. She had suggested me to use separate partition file for all my git repositories, which is what I am going to explain in this blog post.

###Creating a Raw Image

Start off by making a raw image:

<pre>
<code>
#root dd if=/dev/zero of=git_repo.4fs bs=1M count=32
</code>
</pre>

You will get some output such as this:

<pre>
<code>
32+0 records in
32+0 records out
33554432 bytes (34 MB) copied, 0.0963162 s, 348 MB/s
</code>
</pre>

This creates (34 MB) of raw image.
After this if you check your current folder in which you have ran this command you will get a file named `git_repo.4fs`.

<pre>
<code>
root# pwd 
/initrd/mnt/dev_save
</code>
</pre>

Check with `ls` or use GUI to navigate to that folder and you will find the file.

<pre>
<code>
root# ls -las
</code>
</pre>

With this you find the file name in the output somewhere.

<pre>
<code>
    4 drwxr-xr-x  3 root root       4096 Jun 10 16:25 .
    4 drwxr-xr-x 14 root root       4096 Jun  9 16:50 ..
32768 -rwxr-xr-x  1 root root   33554432 Jun 10 16:25 git_repo.4fs
</code>
</pre>

### Making a Partition File

Now we have a raw image which we could hopefully convert to a partition file...

To convert it to a partition file we will make use of `mkfs` command. As we have put in the extension of file as `.4fs`, we will be converting this to an [ext4](https://en.wikipedia.org/wiki/Ext4) (file) partition.

<pre>
<code>
root# mkfs -t ext4 git_repo.4fs
</code>
</pre>

You will be asked that this not a block special device, and that would you want to proceed anyways ? Confirm by putting in `y` and pressing enter.

<pre>
<code>
mke2fs 1.42.9 (4-Feb-2014)
git_repo.4fs is not a block special device.
Proceed anyway? (y,n) y
</code>
</pre>

If successful, you will get an output as such:

<pre>
<code>
Filesystem label=
OS type: Linux
Block size=1024 (log=0)
Fragment size=1024 (log=0)
Stride=0 blocks, Stripe width=0 blocks
8192 inodes, 32768 blocks
1638 blocks (5.00%) reserved for the super user
First data block=1
Maximum filesystem blocks=33554432
4 block groups
8192 blocks per group, 8192 fragments per group
2048 inodes per group
Superblock backups stored on blocks: 
       8193, 24577

Allocating group tables: done
Writing inode tables: done
Creating journal (4096 blocks): done 
Writing superblocks and filesystem accounting information: done
</code>
</pre>

Now our file partition is ready. If you are using Puppy Linux , just click the file from GUI and it will be mounted like any partition would. You are using any other distro of Linux, you would have to mount it using `mount` command.

### Mounting and unmounting the partition file

To mount the partition file, first start of by making a empty directory in `/mnt/` folder.

Change to `mnt` directory if you are not

<pre>
<code>
cd /mnt
</code>
</pre>

Then , confirming that you are the correct place make directory called `git_repos`

<pre>
<code>
root# pwd
/mnt
root# mkdir git_repos
root# ls
cdrom  dvd    floppy     home                     msdos  swap
data   flash  git_repos  ram1   zip
</code>
</pre>

Here you could mount you partition file. I have kept the partion file in `home` directory (where all the sfs, personal save file and all the other files of Puppy Linux are kept), so my mount command would look something like this:

<pre>
<code>
root# mount home/git_repo.4fs git_repos
</code>
</pre>

After changing to `git_repos` directory we would see something like this:

<pre>
<code>
root# cd git_repos
root# ls
lost+found
</code>
</pre>

To unmount simply use `umount`:

<pre>
<code>
cd /mnt
umount git_repos
</code>
</pre>

And that's all you have a partition file where you could keep your git repositories ! Move this partition file around without effecting the history of the git repositories.



### Resizing the file partition

That said , what if you want to increase the size accomodate more git repositories later on ?? That could be done by using `resize2fs`. But before doing that run `e2fsck` over it as such:

<pre>
<code>
root# e2fsck -f git_repo.4fs
e2fsck 1.42.9 (4-Feb-2014)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
git_repo.4fs: 9749/51200 files (0.4% non-contiguous), 121125/204800 blocks

</code>
</pre>

Then use `resize2fs`. Say you want the partition file to have 512mb of space, so the command of `resize2fs` would look something like this:

<pre>
<code>
root# resize2fs git_repo.4fs 512m
resize2fs 1.42.9 (4-Feb-2014)
Resizing the filesystem on howling.4fs to 524288 (1k) blocks.
The filesystem on git_repo.4fs is now 524288 blocks long.
</code>
</pre>

### Maintaining the file partition

If you have abrupt power cuts, as your system shuts down or crashes suddenly while you were working with you file partition mounted, remember to `e2fsck` first to repair the file system before mounting it again.

<pre>
<code>
root# e2fsck git_repo.4fs
e2fsck 1.42.9 (4-Feb-2014)
git_repo.4fs: clean, 11/8192 files, 5530/32768 blocks
</code>
</pre>

If you have any questions contact me over [twitter](https://twitter.com/mr_kumar_) or if you find any mistakes send me a [pull request here](https://github.com/Mr-Kumar-Abhishek/Mr-Kumar-Abhishek.github.io). This blog is new, so wait a while for me to include the commenting feature.
