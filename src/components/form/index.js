import React from 'react';
import { useState } from 'react';
import './form.scss';

function Form(props) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [getCssClass, setGetCssClass] = useState('normal');
  const [postCssClass, setPostCssClass] = useState('normal');
  const [putCssClass, setPutCssClass] = useState('normal');
  const [deleteCssClass, setDeleteCssClass] = useState('normal');
  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      method,
      url,
    };
    props.handleApiCall(formData);
  }
  function methodChange(e) {
    setGetCssClass('normal');
    setPostCssClass('normal');
    setPutCssClass('normal');
    setDeleteCssClass('normal');
    switch (e.target.innerText) {
      case 'GET':
        setMethod('GET');
        setGetCssClass('active');
        break;
      case 'POST':
        setMethod('POST');
        setPostCssClass('active');
        break;
      case 'PUT':
        setMethod('PUT');
        setPutCssClass('active');
        break;
      case 'DELETE':
        setMethod('DELETE');
        setDeleteCssClass('active');
        break;
      default: break;
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label >
          <span>URL: </span>
          <input name='url' onChange={(e) => setUrl(e.target.value)} type='text' />
          <button id="submit" type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" className={getCssClass} onClick={(e) => methodChange(e)}>GET</span>
          <span id="post" className={postCssClass} onClick={(e) => methodChange(e)}>POST</span>
          <span id="delete" className={putCssClass} onClick={(e) => methodChange(e)}>PUT</span>
          <span id="delete" className={deleteCssClass} onClick={(e) => methodChange(e)}>DELETE</span>
        </label>
      </form>
    </>
  );
}

export default Form;
