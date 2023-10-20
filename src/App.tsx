import './App.css';
import React, { useState, useEffect } from 'react';
import { bitable, UIBuilder } from "@base-open/web-api";
import callback from './runUIBuilder';

export default function App() {
  const [data, setData] = useState({ t: new Date() });
  useEffect(() => {
    UIBuilder.getInstance('#container', { bitable, callback });
  }, []);

  return (
    <div id='container'></div>
  );
}