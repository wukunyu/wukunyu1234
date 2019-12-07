import React, { Component } from 'react'

 


export default function loadingWrap(needHide) {

    const defaultLoading = (
      <div className="toast-loading">
      {/* <Icon type="loading" /> */}
        <div>加载中...</div>
      </div>
    );
  
    return function (target, property, descriptor) {
      const raw = descriptor.value;
      
      descriptor.value = function (...args) {
         
        const res = raw.apply(this, args);
        
        {defaultLoading}
      };
      return descriptor;
    };
  }
  