# **URL Minifier App ✂️ 💻 👈**

<br/>

<p align="center">
<img src="https://img.shields.io/badge/backend-NodeJS-darkgreen?style=flat&logo=Node.js">
<img src="https://img.shields.io/badge/framework-ExpressJS-yellowgreen?style=flat">
<img src="https://img.shields.io/badge/frontend-ReactJS-blue?style=flat&logo=React">
<img src="https://img.shields.io/badge/database-MongoDB-darkgreen?style=flat&logo=MongoDB">
<img src="https://img.shields.io/badge/Authentication-JSON Web Tokens-orange?style=flat&logo=json-web-tokens">
<img src="https://img.shields.io/badge/Other technologies-Context API-9cf?">
</p>
<br/>

This is the [URL Minifier App](https://urlcmprsr.netlify.app/)

An App to manage `minified URLs` and `generate QR Codes` of the minified URLs.

<br />

[Click for Client Repo](https://github.com/HyperLoo/UrlCompressor-Client)

## **Login Section 🔑**

<img src="./assets/login.jpg">

Here you can `Register` or `Login` to the App. <br/>
_[ Uses JSON Web Token based Authentication.
Click [here](https://jwt.io/introduction/) to read more ]_<br /><br />

## **Compress URL Section 🏷️**

<img src="./assets/urlPage.jpg">

Here one can create a new `Compressed URL` with it's `Expiration Date` if needed or `No Expiration` by default.

Also, one can see all the `compressed URLs` by him with the `Original URLs` and can copy it for sharing.

<br/><br/>

## **URL Details and Update Section 📝**

<img src="./assets/urlDetails.jpg" />

One can see all the details about to the given compressed URL.

- The `state` _(active/inactive)_ can be switched here.
- Once can extend `Deadline` of the URL.
- `No. of Clicks` on the particular URL can be monitored here.
- One can also open url using `QR Code` for the compressed url.
- The Compressed URLs can be `Updated` as well as `Deleted` from here.
