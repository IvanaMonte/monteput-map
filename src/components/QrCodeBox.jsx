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
        padding: '15px 20px',
        borderRadius: 16,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        textAlign: 'center',
        zIndex: 100,
      }}
    >
      <QRCodeCanvas value={url} size={150} level="H" includeMargin={true} />
      <p style={{ fontSize: 14, marginTop: 8, fontWeight: 500, color: '#4B5563' }}>Skeniraj za mapu</p>
    </div>
  );
};

export default QrCodeBox;
