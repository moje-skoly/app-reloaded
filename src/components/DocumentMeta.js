import React from 'react';
import { Helmet } from 'react-helmet';
import config from '../config';

export default () => {
  const meta = config.app.meta;
  return (
    <Helmet>
      <meta charSet={meta.charSet} />
      {Object.keys(meta.properties).map((key, i) => {
        <meta key={i} property={key} content={meta.properties[key]} />;
      })}
    </Helmet>
  );
};
