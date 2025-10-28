import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrCodeBox = ({ url }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: 'white',
        padding: '30px 35px',
        borderRadius: 24,
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        textAlign: 'center',
        zIndex: 100,
      }}
    >
      <QRCodeCanvas value={url} size={300} level="H" includeMargin={true} />
      <p style={{ fontSize: 24, marginTop: 16, fontWeight: 500, color: '#4B5563' }}>Skeniraj za mapu</p>
    </div>
  );
};

export default QrCodeBox;
