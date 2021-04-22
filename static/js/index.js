const {
  createMuiTheme,
  CssBaseline,
  Button,
  Grid,
  responsiveFontSizes,
  ThemeProvider
} = MaterialUI;

const read_cookie = name => {
  let b = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
  return b ? b.pop() : '';
};

const post = (url = ``, body = {}, files = null) => {
  let args = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': read_cookie('csrftoken')
    }
  };

  if (files) {
    args['body'] = body;
  } else {
    args['body'] = JSON.stringify(body);
    args['headers']['Content-Type'] = 'application/json; charset=UTF-8';
  }

  return fetch(url, args).then(response => {
    if (response.ok) {
      if (response.headers.get('Content-Type') === 'text/html; charset=utf-8') {
        return response.text();
      } else if (response.headers.get('Content-Type') === 'application/json') {
        return response.json();
      } else {
        return response;
      }
    } else {
      throw response;
    }
  }).catch(error => {
    error.text().then(message => {
      alert(message);
      console.error(message);
    });
  }).finally(() => {});
};

class Window extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return /*#__PURE__*/React.createElement(Grid, {
      container: true,
      justify: "center",
      direction: "column",
      alignItems: "center",
      style: {
        minHeight: '100vh'
      }
    }, /*#__PURE__*/React.createElement(Grid, {
      item: true
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "contained",
      color: "primary",
      fullWidth: true
    }, "HELLO WORLD")));
  }

}

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.theme = createMuiTheme({
      palette: {
        type: "dark"
      }
    });
    this.theme = responsiveFontSizes(this.theme);
  }

  render() {
    return /*#__PURE__*/React.createElement(ThemeProvider, {
      theme: this.theme
    }, /*#__PURE__*/React.createElement(CssBaseline, null), /*#__PURE__*/React.createElement(Window, {
      theme: this.theme
    }));
  }

}

ReactDOM.render( /*#__PURE__*/React.createElement(Application, null), document.getElementById('root'));
//# sourceMappingURL=index.js.map