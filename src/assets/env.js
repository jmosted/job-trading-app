(function (window) {
  window.__env = window.__env || {};

  //window.__env.ENGINE_AUTH = 'https://banco-bjungle-dev-ekyc-core.btigersystem.net/api/v1/auth';
  //window.__env.ENGINE_OFFER = 'https://banco-bjungle-dev-ekyc-core.btigersystem.net/api/v1/transaction';

  window.__env.ENGINE_AUTH = 'http://127.0.0.1:55000/api/v1/auth';
  window.__env.ENGINE_OFFER = 'http://127.0.0.1:55000/api/v1/transaction';

  window.__env.enableDebug = true;
})(this);
