'use client';

import { useEffect, useRef, useState } from 'react'
import GetNameColor from '@/scripts/generator' // Make sure you have this file inside `scripts`

export default function Home() {
  const [username, setUsername] = useState<string>('R0bl0x10501050');
  const [version, setVersion] = useState<number>(3);
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

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="font-bold text-5xl text-white">Roblox Name Color</div>
      <div className="mt-5 text-lg text-slate-300">
        Find a user&apos;s chat color. Inspired by&nbsp;
        <a
          href="https://devforum.roblox.com/t/your-name-color-in-chat-%E2%80%94-history-and-how-it-works/2702247"
          className="text-blue-500 transition duration-200 hover:text-blue-400"
        >
          this DevForum post
        </a>.
      </div>
      <div className="mt-5 flex flex-row justify-center space-x-6">
        <input
          onInput={() => setUsername((document.getElementById('username') as HTMLInputElement).value)}
          autoComplete="off"
          type="text"
          name="username"
          id="username"
          className="px-5 py-3 bg-slate-900 border-slate-700 border-2 text-white rounded-lg placeholder:text-slate-300 focus:border-blue-600 focus:outline-none transition duration-200"
          value={username}
        />
        <div className="flex flex-row justify-center space-x-3">
          <button
            onClick={() => setVersion(1)}
            className={`${
              version === 1 ? 'bg-blue-500 text-slate-200 hover:text-white' : 'bg-slate-800 text-blue-500 hover:text-blue-400'
            } px-5 py-3 text-center rounded-lg font-bold transition duration-200`}
          >
            v1
          </button>
          <button
            onClick={() => setVersion(2)}
            className={`${
              version === 2 ? 'bg-blue-500 text-slate-200 hover:text-white' : 'bg-slate-800 text-blue-500 hover:text-blue-400'
            } px-5 py-3 text-center rounded-lg font-bold transition duration-200`}
          >
            v2
          </button>
          <button
            onClick={() => setVersion(3)}
            className={`${
              version === 3 ? 'bg-blue-500 text-slate-200 hover:text-white' : 'bg-slate-800 text-blue-500 hover:text-blue-400'
            } px-5 py-3 text-center rounded-lg font-bold transition duration-200`}
          >
            v3
          </button>
        </div>
      </div>
      <div ref={colorRef} className="mt-5 px-10 py-3 text-center rounded-lg transition duration-200">.</div>
      <div className="my-5 text-slate-300">
        <a
          href="https://github.com/RyloRiz"
          className="text-blue-500 transition duration-200 hover:text-blue-400"
        >
          @RyloRiz
        </a>
        &nbsp;on GitHub |&nbsp;
        <a
          href="https://devforum.roblox.com/u/r0bl0x10501050"
          className="text-blue-500 transition duration-200 hover:text-blue-400"
        >
          @R0bl0x10501050
        </a>
        &nbsp;on Roblox &amp; DevForum
      </div>
    </div>
  );
}
