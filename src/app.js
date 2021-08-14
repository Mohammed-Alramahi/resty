import React, { useReducer, useState, useEffect } from 'react';

import './app.scss';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';
import Loading from './components/loading';
import History from './components/history';
import axios from 'axios';
const initialState = [];

function reducer(history = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case 'AddToHistory':
      history = [...history, payload];
      return history;
    default:
      return history;
  }
}
function addToHistory(url, method, result, statusCode) {

  return ({
    type: 'AddToHistory',
    payload: {
      url,
      method,
      result,
      statusCode
    }
  })
}

function App() {
  const [history, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [statusCode, setStatusCode] = useState(null);
  function fakeCall() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);

  }
  useEffect(() => {
    dispatch(addToHistory(requestParams.url, requestParams.method, data, statusCode));
  }, [requestParams]);

  async function callApi(requestParams) {
    // mock output
    fakeCall();
    let response;
    const { method, url, reqBody } = requestParams;
    switch (method) {
      case 'GET': {
        response = await (axios.get(url).catch(err => {
          setData(err.message)
        }));
        break;
      }
      case 'POST': {
        response = await (axios.post(url, JSON.parse(reqBody)).catch(err => {
          setData(err.message)
        }));
        break;
      }
      case 'PUT': {
        response = await (axios.put(url, JSON.parse(reqBody)).catch(err => {
          setData(err.message)
        }));
        break;
      }
      case 'DELETE': {
        response = await (axios.delete(url)).catch(err => {
          setData(err.message)
        });
        break;
      }
      default: throw new Error('method should be resty');

    }
    if (response) {
      setData(response.data);
      setRequestParams(requestParams);
      setStatusCode(response.status);
    }

    //this.setState({ data: data.data.results, requestParams });
    //console.log(this.state.requestParams);
  }
  function historyfunc(result) {
    setData(result);
  }
  return (
    <React.Fragment >
      <Header />
      <div>Request Method: {requestParams.method}</div>
      <div>URL: {requestParams.url}</div>
      <Form handleApiCall={callApi} />
      {loading && <Loading />}
      {!loading && <Results data={data} />}
      {!loading && <History historyfunc={historyfunc} history={history} />}
      <Footer />
    </React.Fragment >
  );
}

export default App;
