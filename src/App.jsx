import React, { useState, useEffect } from 'react';

const MAX_IMAGES = 5;

const App = () => {
  const [play, setPlay] = useState(true);
  const [noCount, setNoCount] = useState(0);
  const [catImage, setCatImage] = useState('img0.jpg');
  const [title, setTitle] = useState('กดปุ่ม');
  const [noButtonSize, setNoButtonSize] = useState(80);
  const [btnNoDisabled, setBtnNoDisabled] = useState(false);

  const handleYesClick = () => {
    setTitle("ยินดีด้วย! คุณโดนราชาแฮกเกอร์บิด🥰");
    setPlay(false);
    changeImage("yes");
  };

  const handleNoClick = () => {
    if (play && !btnNoDisabled) {
      const newNoCount = noCount + 1;
      setNoCount(newNoCount);
      const imageIndex = Math.min(newNoCount, MAX_IMAGES);
      changeImage(imageIndex);
      resizeNoButton();

      if (newNoCount === MAX_IMAGES) {
        setBtnNoDisabled(true);
      }
    }
  };

  const resizeNoButton = () => {
    setNoButtonSize((prevSize) => Math.max(prevSize - 5, 50));
  };

  const generateMessage = (count) => {
    const messages = [
      "สาวัดดีผมคือราชาแฮกเกอร์ตกอับ ผมขอตังคุณหน่อย 20 บาท",
      "แน่ใจนะ?",
      "เอาน่า 20 เอง😭",
      "เดี๋ยวคืน",
      "ปริจาด 20 บาทเเพื่อไปครองโลกกับผม",
      "ไม่ได้ปล้นนะ แต่เอามา 20 บาท",
    ];

    const messageIndex = Math.min(count, messages.length - 1);
    setTitle(messages[messageIndex]);
  };

  const changeImage = (image) => {
    setCatImage(`img${image}.jpg`);
  };

  useEffect(() => {
    generateMessage(noCount);
  }, [noCount]);

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col justify-center items-center relative'>
      <h1 className="title text-2xl mb-4">{title}</h1>
      <img src={catImage} className='cat-img w-60 h-60 mb-4' alt="Cat" />
      <div className="buttons flex space-x-4">
        <button
          className={`bg-green-500 p-2 w-40 rounded-md text-white ${!play ? "cursor-not-allowed opacity-50 bg-green-900" : ""}`}
          onClick={handleYesClick}
        >
          ให้
        </button>
        <button
          className={`bg-red-500 rounded-md text-white ${btnNoDisabled ? "cursor-not-allowed opacity-50" : ""}`}
          onClick={handleNoClick}
          style={{
            width: `${noButtonSize}px`,
            height: `${noButtonSize}px`,
            transition: 'all 0.3s ease',
          }}
          disabled={btnNoDisabled}
        >
          {btnNoDisabled ? "ไม่ให้แล้ว" : "ไม่ให้"}
        </button>
      </div>
      {!play && (
        <span className='mt-10 flex flex-col justify-center items-center'>
          <a href="https://github.com/CuriousSavant/pls-monery" className='underline text-blue-500'>source code ของโปรเจดนี้</a>
          <p className='text-sm'>
            (ไม่ได้สวยเท่าไหร่ทำไงได้ ขกตกแต่งอ่ะ โค้ดก็ไม่ได้เก็บรายละเอียด)
          </p>
        </span>
      )}
    </div>
  );
};

export default App;