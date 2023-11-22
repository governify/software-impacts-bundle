console.log('Dashboard Overlay loaded');

function updateGrafanaVariableAndRefresh (variable, value) {
  const hash = {};
  const parser = document.createElement('a');
  const param = 'var-' + variable;

  parser.href = location.href;

  const parameters = parser.search.split(/\?|&/);

  for (let i = 0; i < parameters.length; i++) {
    if (!parameters[i]) { continue; }

    const ary = parameters[i].split('=');
    hash[ary[0]] = ary[1];
  }

  hash[param] = value;

  const list = [];
  Object.keys(hash).forEach(function (key) {
    list.push(key + '=' + hash[key]);
  });

  parser.search = '?' + list.join('&');
  location.href = parser.href;
}

updateGrafanaVariableAndRefresh('timeFrom', 'wad');
