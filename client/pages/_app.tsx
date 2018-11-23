import App, { Container } from 'next/app';
import React from 'react';
import Model, { initializeStore } from '../models';
import { Provider } from 'mobx-react';
import { isServer } from '../../common/utils';

class MyMobxApp extends App {
  mobxModel: Model;
  static async getInitialProps(appContext) {
    // Get or Create the store with `undefined` as initialState
    // This allows you to set a custom default initialState
    const mobxStore = initializeStore();
    // Provide the store to getInitialProps of pages
    appContext.ctx.mobxStore = mobxStore;

    let appProps = await App.getInitialProps(appContext);

    return {
      ...appProps,
      initialMobxState: mobxStore
    };
  }

  constructor(props) {
    super(props);
    // const isServer = typeof window === 'undefined'
    this.mobxModel = isServer()
      ? props.initialMobxState
      : initializeStore(props.initialMobxState);
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Provider model={this.mobxModel}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}
export default MyMobxApp;
