import React from 'react';
import { SantaClausComponent } from '../src/index';

const App = () => {
  // 这里应该使用真实的千问API密钥
  const QWEN_API_KEY = 'your-qwen-api-key-here';

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>🎄 Santa Claus Christmas Greeting Plugin Demo</h1>
      <p>Click on the Santa Claus below to generate a Christmas greeting and upload a photo to add a Santa hat!</p>
      
      <div style={{ marginTop: '40px' }}>
        <SantaClausComponent qwenApiKey={QWEN_API_KEY} />
      </div>
      
      <div style={{ marginTop: '40px', fontSize: '14px', color: '#666' }}>
        <p><strong>Note:</strong> To use the real Qwen API functionality, replace 'your-qwen-api-key-here' with your actual Qwen API key.</p>
      </div>
    </div>
  );
};

export default App;