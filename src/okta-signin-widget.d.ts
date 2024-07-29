declare module '@okta/okta-signin-widget' {
  interface OktaSignInOptions {
    baseUrl: string;
    clientId: string;
    redirectUri: string;
    authParams?: object;
    [key: string]: any;
  }

  class OktaSignIn {
    constructor(options: OktaSignInOptions);
    renderEl(options: any, successFn: Function, errorFn: Function): void;
    authClient: any;
  }

  export default OktaSignIn;
}
