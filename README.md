# @viewstools/local

Get your Views text into JSON files for ready for I18n and back

Install it with:

```
yarn add --dev @viewstools/local
```

Set it up on your `package.json`, on the `scripts` section add:

```
"views:local:get": "views-local get",
"views:local:set": "views-local set"
```

Run it like:

```
# Extract i18n text strings into JSON files in a translations folder
# named after the language. The default is en.
yarn views:local:get

# Put the translations back into your view files. It will read the JSON
# files from your translations folder.
yarn views:local:set
```

License BSD-3-Clause
(c) 2018 UXtemple Ltd.
