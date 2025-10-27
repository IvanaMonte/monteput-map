import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrCodeBox = ({ url }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: 'white',
        padding: '10px 15px',
        borderRadius: 10,
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        textAlign: 'center',
        zIndex: 100,
      }}
    >
      <QRCodeCanvas value={url} size={120} />
      {/* <p style={{ fontSize: 12, marginTop: 5 }}>Skeniraj za mapu</p> */}
    </div>
  );
};

export default QrCodeBox;
