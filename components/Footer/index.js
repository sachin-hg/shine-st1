'use client'
import React, { Fragment } from 'react';
import styles from './footer.module.css';
import FooterContent from './FooterContent';

function Logout() {
  const onClick = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  }

  return (
    <div className={styles.contact} onClick={onClick}>
      Logout
    </div>
  );
}

export default function Footer() {
  return (
    <Fragment>
      <FooterContent />
      <Logout />
    </Fragment>
  );
}