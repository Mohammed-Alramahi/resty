import React from 'react';
import { useState } from 'react';
import './form.scss';

function Form(props) {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [reqBody, setReqBody] = useState({});
  const [getCssClass, setGetCssClass] = useState('normal');
  const [postCssClass, setPostCssClass] = useState('normal');
  const [putCssClass, setPutCssClass] = useState('normal');
  const [deleteCssClass, setDeleteCssClass] = useState('normal');
  const [showText, setShowText] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (method === 'POST' || method === 'PUT') {
      setReqBody(e.target.body.value)
    }
    const formData = {
      url,
      method,
      reqBody
    }
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
        setShowText(false);
        break;
      case 'POST':
        setMethod('POST');
        setPostCssClass('active');
        setShowText(true);
        break;
      case 'PUT':
        setMethod('PUT');
        setPutCssClass('active');
        setShowText(true);
        break;
      case 'DELETE':
        setMethod('DELETE');
        setDeleteCssClass('active');
        setShowText(false);
        break;
      default: break;
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name='url' required onChange={(e) => setUrl(e.target.value)} value={url} type='text' />
          <button id="submit" type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" className={getCssClass} onClick={(e) => methodChange(e)}>GET</span>
          <span id="post" className={postCssClass} onClick={(e) => methodChange(e)}>POST</span>
          <span id="delete" className={putCssClass} onClick={(e) => methodChange(e)}>PUT</span>
          <span id="delete" className={deleteCssClass} onClick={(e) => methodChange(e)}>DELETE</span>
        </label>
        {showText && <input type="text" name="body" />}
      </form>

    </>
  );
}

export default Form;
