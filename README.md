# Passeye

Passeye is a small jQuery Plugin (less than a Kilobyte!) to show password reveal button beside password fields in your forms. It is inspired by Windows 8 password field where user gets small "Eye" icon beside password text-box to reveal password with a single click.

It is AMD-ready plugin, and hence can be loaded as a module into your webapp via CommonJS-complaint module loader.

## Usage

Include `jquery.passeye.min.js` from `dist` folder into your webpage as follows:
```javascript
<script type="text/javascript" src="js/jquery.passeye.min.js"></script>
```

It provides a single method called `passeye()` which you can call on selected Password input as follows:

Your form in page:
```html
<form id="myform">
    <label>Name:</label>
    <input type="text" name="name"/>
    <label>Email</label>
    <input type="text" name="email"/>
    <label>Password</label>
    <input type="password" name="password" id="passwordBox" placeholder="Something unique..."/>
</form>
```

Calling `passeye()` on Password field:
```javascript
$("#passwordBox").passeye();
```
Calling this method will enable Password-revealing "Eye" beside the Password box (to the right), which appears once you type the password.

![screenshot](http://i.imgur.com/XxLMLFX.png)

Click and hold that eye to show password and release mouse button to hide it back.

![screenshot](http://i.imgur.com/g1lYLlG.png)

### Available Options

Passeye provides some configuration options which you can additionally provide as Object into `passeye` method to control its behavior. All config options are optional.

* `eyecon`: Valid HTML character to use as icon to reveal password on Mousedown. Defaults to '&#9737;' (`&#9737;`).
* `rtl`: Set this flag to `true` to make sure Passeye confirms with RTL paradigms. Defaults to `false`.
* `cls`: CSS class to apply parent container (span) of Password field with Passeye. Defaults to `passeye-password-field`.
* `passeyeCls`: CSS class for Passeye element. Defaults to `passeye-btn`.

#### Config Usage Example
```javascript
$("#passwordBox").passeye({
    eyecon: '&infin;'   // Will show infinity icon as revealer.
});
```

#### Important Note
* Passeye doesn't have any styles bound to it and hence it will not alter your defined styles so you're free to make it look the way you want using your own CSS.
* Since Password revealing is supported by default in IE10 and higher, using Passeye under these browsers will show native revealer as well as Passeye, so it's on your part to take care of the browsers! =D

## License and Author

**Kushal Pandya** (http://doublslash.com)

Licensed under [GPLv3](https://github.com/kushalpandya/Passeye/blob/master/LICENSE).