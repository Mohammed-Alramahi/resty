import React from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import Loading from './components/loading';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      requestParams: {},
      showLoading: false
    };
  }
  fakeCall() {
    this.setState({ showLoading: true })
    setTimeout(() => {
      this.setState({ showLoading: false })
    }, 1000);

  }


  callApi = async (requestParams) => {
    // mock output
    this.fakeCall();
    let data;
    const { method, url, reqBody } = requestParams;
    switch (method) {
      case 'GET': {
        data = await (axios.get(url));
        break;
      }
      case 'POST': {
        data = await (axios.post(url, reqBody));
        break;
      }
      case 'PUT': {
        data = await (axios.put(url, reqBody));
        break;
      }
      case 'DELETE': {
        data = await (axios.delete(url));
        break;
      }
      default: throw new Error('method should be resty');

    }
    this.setState({ data: data.data.results, requestParams });
    console.log(this.state.requestParams);
  }

  render() {
    return (
      <React.Fragment >
        <Header />
        <div>Request Method: {this.state.requestParams.method}</div>
        <div>URL: {this.state.requestParams.url}</div>
        <Form handleApiCall={this.callApi} />
        {this.state.showLoading && <Loading />}
        {!this.state.showLoading && <Results data={this.state.data} />}
        <Footer />
      </React.Fragment >
    );
  }
}

export default App;
