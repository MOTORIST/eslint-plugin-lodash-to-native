# eslint-plugin-lodashtonative

Description

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ yarn add -D eslint
```

Next, install `eslint-plugin-lodash-to-native`:

```
$ yarn add -D link:path-to-directory/eslint-plugin-lodash-to-native
```

## Usage

Add `lodash-to-native` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "lodash-to-native"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "lodash-to-native/map": "warn"
    }
}
```

## Supported Rules

* lodash-to-native/map





