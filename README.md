# CDN Network Repo

![Logo](https://cdn.discordapp.com/attachments/1015727807566987296/1076017917445013545/wp8877203.webp)

This is a repository for a CDN network that can be used to store and distribute images, memes, and other media files.

> A content delivery network (CDN) is a geographically distributed group of servers that caches content close to end users. A CDN allows for the quick transfer of assets needed for loading Internet content, including HTML pages, JavaScript files, stylesheets, images, and videos. The popularity of CDN services continues to grow, and today the majority of web traffic is served through CDNs, including traffic from major sites like Facebook, Netflix, and Amazon. 
> A properly configured CDN may also help protect websites against some common malicious attacks, such as Distributed Denial of Service (DDOS) attacks.
>> [Cloud Flare](https://www.cloudflare.com/learning/cdn/what-is-a-cdn/)

## Installation

To install this repo, simply run the following command:

```bash
git clone https://github.com/procsspace/unfatal-static static
cd static
```




## Configuration

This repo includes a `.env` file which contains the following configuration:

> PORT


This specifies the port on which the CDN network will be hosted.

## Folders

This repo contains the following folders:

- `images`: for storing images
- `memes`: for storing memes
- `media`: for storing other media files

Feel free to add more folders as needed.

## Invalid File Checker

This repo includes a script that checks for invalid files in the `images`, `memes`, and `media` folders. To run the script, use the following command:

```bash
npm run check-files
```


This will check for invalid files such as those with invalid file extensions or files that are too large.

## NPM Scripts

This repo includes the following NPM scripts:

- `start`: start the webserver
- `dev`: start the webserver using nodemon
- `check-files`: check for invalid files

To start the webserver, run the following command:

```bash
npm run dev
```
