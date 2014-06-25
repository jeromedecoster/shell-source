var fmt = require('util').format;
var fs = require('fs');
var path = require('path');
var tildify = require('tildify');
var untildify = require('untildify');

var append = fs.appendFileSync;
var exists = fs.existsSync;
var read = fs.readFileSync;
var resolve = path.resolve;
var write = fs.writeFileSync;


exports.add = function(file, profile) {
  var obj = normalize(file, profile);
  if (!exists(obj.profile)) fs.writeFile(obj.profile, '');

  var str = read(obj.profile).toString();
  var lines = str.split('\n');

  var found = lines.some(function(e) {
    return obj.re.test(e);
  });

  if (!found) {
    if (!newline(str)) append(obj.profile, '\n');
    append(obj.profile, obj.cmd);
  }
}

exports.comment = function(file, profile) {
  var obj = normalize(file, profile);
  if (!exists(obj.profile)) return;

  var str = read(obj.profile).toString();
  var lines = str.split('\n');

  var found = false;
  lines.forEach(function(e, i) {
    if (obj.re.test(e)) {
      found = true;
      lines[i] = '# ' + lines[i];
    }
  })

  if (found) write(obj.profile, lines.join('\n'));
}


function normalize(file, profile) {
  var obj = {};
  obj.file = resolve(file);
  obj.tildified = tildify(obj.file);
  obj.profile = profile || '~/.bash_profile';
  obj.profile = untildify(obj.profile);
  obj.re = new RegExp('^[^#]*source\\s+' + obj.tildified);
  obj.cmd = fmt('[[ -f %s ]] && source %s\n', obj.tildified, obj.tildified);
  return obj;
}

function newline(str) {
  return str.split('').slice(-1) == '\n';
}
