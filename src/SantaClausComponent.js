import React, { useState, useRef } from 'react';
import './SantaClausComponent.css';
import QwenAPIService from './api';

const SantaClausComponent = ({ qwenApiKey }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [greeting, setGreeting] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageProcessing, setIsImageProcessing] = useState(false);
  const fileInputRef = useRef(null);
  
  // 初始化千问API服务
  const qwenService = new QwenAPIService(qwenApiKey);

  // 生成圣诞祝福的函数
  const generateGreeting = async () => {
    setIsLoading(true);
    try {
      const newGreeting = await qwenService.generateChristmasGreeting();
      setGreeting(newGreeting);
    } catch (error) {
      console.error('Error generating greeting:', error);
      setGreeting("Wishing you a very Merry Christmas!");
    } finally {
      setIsLoading(false);
    }
  };

  // 处理图片上传
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        setImagePreview(e.target.result);
        setIsImageProcessing(true);
        
        try {
          // 调用千问API处理图片，添加圣诞帽
          const processedImageDataUrl = await qwenService.processImageWithSantaHat(e.target.result);
          setProcessedImage(processedImageDataUrl);
        } catch (error) {
          console.error('Error processing image:', error);
          // 如果处理失败，仍然显示原始图片
          setProcessedImage(e.target.result);
        } finally {
          setIsImageProcessing(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="santa-container">
      <div className="santa-wrapper" onClick={() => {
        setIsDialogOpen(true);
        generateGreeting();
      }}>
        <div className="santa-image">
          <svg viewBox="0 0 100 100" className="santa-svg">
            {/* Santa's hat */}
            <circle cx="50" cy="35" r="25" fill="#d32f2f" />
            <circle cx="50" cy="15" r="8" fill="#f5f5f5" />
            {/* Santa's face */}
            <circle cx="50" cy="50" r="20" fill="#f5d6ba" />
            {/* Santa's beard */}
            <path d="M30,60 Q50,85 70,60 Q65,90 50,95 Q35,90 30,60" fill="#f5f5f5" />
            {/* Santa's eyes */}
            <circle cx="42" cy="45" r="2" fill="#333" />
            <circle cx="58" cy="45" r="2" fill="#333" />
            {/* Santa's nose */}
            <circle cx="50" cy="52" r="3" fill="#f44336" />
          </svg>
        </div>
        <div className="santa-label">Click for Christmas Greeting</div>
      </div>

      {isDialogOpen && (
        <div className="dialog-overlay" onClick={() => setIsDialogOpen(false)}>
          <div className="dialog-box" onClick={(e) => e.stopPropagation()}>
            <div className="dialog-header">
              <h3>🎄 Christmas Greeting</h3>
              <button className="close-btn" onClick={() => setIsDialogOpen(false)}>×</button>
            </div>
            
            <div className="dialog-content">
              {isLoading ? (
                <div className="loading">Generating your Christmas greeting...</div>
              ) : (
                <p className="greeting-text">{greeting}</p>
              )}
              
              <div className="image-frame">
                <h4>Upload a photo to add a Christmas hat:</h4>
                <div className="frame-container">
                  {processedImage ? (
                    <img src={processedImage} alt="Processed with Santa hat" className="processed-image" />
                  ) : imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="preview-image" />
                  ) : (
                    <div className="frame-placeholder" onClick={triggerFileSelect}>
                      <div className="frame-placeholder-content">
                        <span>📷</span>
                        <p>Click to upload photo</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                
                {isImageProcessing && (
                  <div className="processing">Processing image with AI...</div>
                )}
                
                <button 
                  className="upload-btn" 
                  onClick={triggerFileSelect}
                  disabled={isImageProcessing}
                >
                  {imagePreview ? 'Change Photo' : 'Upload Photo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SantaClausComponent;