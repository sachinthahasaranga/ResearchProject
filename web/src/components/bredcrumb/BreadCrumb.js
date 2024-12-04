import React from 'react';
import { Breadcrumb } from 'react-bootstrap';

const CustomBreadcrumb = () => {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/about">About</Breadcrumb.Item>
      <Breadcrumb.Item active>Contact</Breadcrumb.Item>
    </Breadcrumb>
  );
};

export default CustomBreadcrumb;
