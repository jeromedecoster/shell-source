# shell-source

Add or comment a source command within a shell file

## Install

Install with <a href="http://nodejs.org/" target="_blank">npm</a> directly from the <a href="https://github.com/jeromedecoster/shell-source" target="_blank">github repository</a>

```
npm install --save jeromedecoster/shell-source
```

## API

```js
add(file, profile);
```

or

```js
comment(file, profile);
```

## Example

```js
var source = require('shell-source');

// source ~/.dotfiles/source.sh in ~/.bash_profile
source.add('~/.dotfiles/source.sh');

// source it in ~/.zsh_profile
source.add('~/.dotfiles/source.sh', '~/.zsh_profile');
```

The added line:

```bash
[[ -f ~/.dotfiles/source.sh ]] && source ~/.dotfiles/source.sh
```

or

```js
var source = require('shell-source');

// comment the line where ~/.dotfiles/source.sh is sourced in ~/.bash_profile
source.comment('~/.dotfiles/source.sh');
```

The commented line:

```bash
# [[ -f ~/.dotfiles/source.sh ]] && source ~/.dotfiles/source.sh
```
