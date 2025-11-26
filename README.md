# Santa Claus Christmas Greeting Plugin

A React component that features a Santa Claus character which can connect to the Qwen API to generate English Christmas greetings. When you click on Santa Claus, it generates different Christmas greetings, and the greeting dialog includes a picture frame and an option to upload a photo. After uploading a photo, the Qwen image model adds a Christmas hat to the photo.

## Features

- 🎅 Interactive Santa Claus character with SVG graphics
- 🎄 Click to generate unique Christmas greetings using Qwen API
- 📷 Upload photos and add AI-generated Christmas hats
- 🎅 Responsive design with attractive UI
- ✨ Festive Christmas theme

## Installation

```bash
npm install santa-claus-christmas-greeting
```

## Usage

```jsx
import React from 'react';
import { SantaClausComponent } from 'santa-claus-christmas-greeting';

function App() {
  // Get your API key from Qwen (Alibaba Cloud)
  const QWEN_API_KEY = 'your-qwen-api-key-here';

  return (
    <div className="App">
      <SantaClausComponent qwenApiKey={QWEN_API_KEY} />
    </div>
  );
}

export default App;
```

## API Integration

The component integrates with Qwen APIs for:

1. **Text Generation**: Uses Qwen model to generate personalized Christmas greetings
2. **Image Processing**: Uses Qwen image model to add Christmas hats to uploaded photos

## Props

| Prop        | Type     | Required | Description                    |
|-------------|----------|----------|--------------------------------|
| qwenApiKey  | String   | Yes      | Your Qwen API key              |

## How It Works

1. Click on the Santa Claus character
2. A dialog appears with a generated Christmas greeting
3. Upload a photo using the upload button or by clicking the frame
4. The component processes the image using Qwen API to add a Christmas hat
5. The processed image is displayed in the dialog

## Development

To run the development server:

```bash
npm run dev
```

To build the component:

```bash
npm run build
```

## Dependencies

- React (>=18.0.0)
- React DOM (>=18.0.0)
- Axios (>=1.6.0)

## API Configuration

To use this component, you need to:

1. Sign up for Qwen API access at Alibaba Cloud
2. Get your API key
3. Pass the API key as the `qwenApiKey` prop

## License

MIT