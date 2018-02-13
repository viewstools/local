# @viewstools/get-text

Get your Views text into a JSON for ready for I18n

Install it with:

```
yarn add --dev @viewstools/get-text
```

Set it up on your `package.json`, on the `scripts` section add:

```
"views:get-text": "views-get-text > en.json"
```

Run it like:

```
yarn views:get-text
```

It will create a JSON file named `en.json` that contains the strings ready to be
translated.

License BSD-3-Clause
(c) 2018 UXtemple Ltd.
