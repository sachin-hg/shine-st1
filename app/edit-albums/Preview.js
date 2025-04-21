'use client'
import React from 'react';

function Preview({ PreviewComponent, showPreview }) {
  return (
    <>
      {showPreview && <PreviewComponent />}
    </>
  );
}

export default Preview;