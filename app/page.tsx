'use client';

import { useEffect, useRef, useState } from 'react';
import GetNameColor from '@/scripts/generator'; // Ensure this file exists and is working correctly

export default function Home() {
  const [username, setUsername] = useState<string>('boist');
  const [version, setVersion] = useState<number>(3);
  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(false); // State to toggle panel visibility
  const colorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let color = GetNameColor(username, version);
    if (color) {
      colorRef.current!.style.color = 'rgb(255, 255, 255, 1)';
      colorRef.current!.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
      colorRef.current!.innerText = `${color.r}, ${color.g}, ${color.b}`;
    } else {
      colorRef.current!.style.backgroundColor = 'rgb(0, 0, 0, 0)';
      colorRef.current!.innerText = 'Impossible to display color';
      colorRef.current!.style.color = 'rgb(255, 0, 0, 1)';
    }
  }, [username, version]);

  // Toggle the panel
  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className="container">
      <div>
        <div className="header-text">Roblox Name Color</div>
        <div className="find-color-text">
          Find a user&apos;s chat color.
        </div>
        <div className="input-container">
          <input
            onInput={() => setUsername((document.getElementById('username') as HTMLInputElement).value)}
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
            What is this?
          </div>
          <div className={`panel-body ${isPanelOpen ? 'active' : ''}`}>
            Roblox changes your chat color based on your username! Insert your username and this site will tell you what color your username will be in Roblox chat.
          </div>
        </div>
        <div className="footer mt-5 text-slate-300">
          made by choop
        </div>
      </div>
    </div>
  );
}
