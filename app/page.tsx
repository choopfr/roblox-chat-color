'use client';

import { useEffect, useRef, useState } from 'react';
import GetNameColor from '@/scripts/generator'; // Ensure this file exists and is working correctly

export default function Home() {
  const [username, setUsername] = useState<string>('boist');
  const [version, setVersion] = useState<number>(3);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false); // State to toggle panel visibility
  const colorRef = useRef<HTMLDivElement>(null);

  // Function to calculate whether the RGB code should be black or white based on the background color
  const getTextColorForBackground = (r: number, g: number, b: number) => {
    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness > 128 ? 'black' : 'white';
  };

  useEffect(() => {
    if (username.trim().length < 3 || username.trim().length > 20) {
      // If username length is invalid, show an error
      colorRef.current!.style.backgroundColor = 'rgb(255, 0, 0)';
      colorRef.current!.style.color = 'white';
      colorRef.current!.innerText = 'Username must be between 3 and 20 characters!';
    } else {
      let color = GetNameColor(username, version);
      if (color) {
        const textColor = getTextColorForBackground(color.r, color.g, color.b);
        colorRef.current!.style.color = textColor;
        colorRef.current!.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
        colorRef.current!.innerText = `${color.r}, ${color.g}, ${color.b}`;
      } else {
        colorRef.current!.style.backgroundColor = 'rgb(0, 0, 0)';
        colorRef.current!.innerText = '0, 0, 0';
        colorRef.current!.style.color = 'white';
      }
    }
  }, [username, version]);

  // Toggle the panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="container">
      <div>
        <div className="header-text">roblox name color</div>
        <div className="find-color-text">
          find a user&apos;s chat color.
        </div>
        <div className="input-container">
          <input
            onInput={(e) => setUsername((e.target as HTMLInputElement).value)}
            autoComplete="off"
            type="text"
            name="username"
            id="username"
            className="input-field"
            value={username}
          />
          <div className="flex space-x-3">
            <button
              onClick={() => setVersion(1)}
              className={`button ${version === 1 ? 'button-active' : ''}`}
            >
              v1
            </button>
            <button
              onClick={() => setVersion(2)}
              className={`button ${version === 2 ? 'button-active' : ''}`}
            >
              v2
            </button>
            <button
              onClick={() => setVersion(3)}
              className={`button ${version === 3 ? 'button-active' : ''}`}
            >
              v3
            </button>
          </div>
        </div>
        <div
          ref={colorRef}
          className="color-display mt-5 px-5 py-3 text-center rounded-lg transition duration-200"
        >
          .
        </div>
        <div className="panel-container mt-5">
          <div onClick={togglePanel} className="panel-header">
            what is this?
          </div>
          <div className={`panel-body ${isPanelOpen ? 'active' : ''}`}>
            roblox changes your chat color based on your username! insert your username and this site will tell you what color your username will be in roblox chat.
          </div>
        </div>
        <div className="footer mt-5 text-slate-300">
          made by choop
        </div>
      </div>
    </div>
  );
}
