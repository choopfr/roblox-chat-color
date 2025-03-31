'use client'

import { useEffect, useRef, useState } from 'react'
import GetNameColor from './generator'

export default function Home() {
  const [username, setUsername] = useState('')
  const [version, setVersion] = useState(3)
  const colorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!username.trim()) {
      // If input is empty, set default color to black (0,0,0)
      colorRef.current!.style.backgroundColor = 'rgb(0, 0, 0)'
      colorRef.current!.style.color = 'white' // White text for contrast
      colorRef.current!.innerText = '0, 0, 0'
    } else {
      let color = GetNameColor(username, version)
      if (color) {
        const textColor = getTextColorForBackground(color.r, color.g, color.b)
        colorRef.current!.style.color = textColor
        colorRef.current!.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`
        colorRef.current!.innerText = `${color.r}, ${color.g}, ${color.b}`
      } else {
        colorRef.current!.style.backgroundColor = 'rgb(0, 0, 0)'
        colorRef.current!.innerText = '0, 0, 0'
        colorRef.current!.style.color = 'white'
      }
    }
  }, [username, version])

  // Function to calculate text color for good contrast on the background color
  const getTextColorForBackground = (r: number, g: number, b: number) => {
    // Calculate brightness of background color
    const brightness = (r * 299 + g * 587 + b * 114) / 1000
    return brightness > 128 ? 'black' : 'white'
  }

  return (
    <main className="container">
      <h1 className="header-text">roblox name color</h1>
      <p className="find-color-text">find a user's chat color</p>

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
      </div>

      <div className="flex flex-row justify-center space-x-4">
        <button
          onClick={() => setVersion(1)}
          className={`${
            version === 1
              ? 'bg-blue-500 text-slate-200 hover:text-white'
              : 'bg-slate-800 text-blue-500 hover:text-blue-400'
          } px-6 py-3 text-center rounded-lg font-semibold shadow-md transition duration-200 transform hover:scale-105`}
        >
          v1
        </button>
        <button
          onClick={() => setVersion(2)}
          className={`${
            version === 2
              ? 'bg-blue-500 text-slate-200 hover:text-white'
              : 'bg-slate-800 text-blue-500 hover:text-blue-400'
          } px-6 py-3 text-center rounded-lg font-semibold shadow-md transition duration-200 transform hover:scale-105`}
        >
          v2
        </button>
        <button
          onClick={() => setVersion(3)}
          className={`${
            version === 3
              ? 'bg-blue-500 text-slate-200 hover:text-white'
              : 'bg-slate-800 text-blue-500 hover:text-blue-400'
          } px-6 py-3 text-center rounded-lg font-semibold shadow-md transition duration-200 transform hover:scale-105`}
        >
          v3
        </button>
      </div>

      <div
        ref={colorRef}
        className="color-display"
        style={{
          color: 'white',
          backgroundColor: 'rgb(0, 0, 0)',
        }}
      >
        0, 0, 0
      </div>

      <div className="panel-container">
        <div className="panel-header">what is this?</div>
        <div className="panel-body">
          <p>
            this tool calculates the roblox chat color based on the username entered. the color changes
            depending on the version of the roblox api used.
          </p>
        </div>
      </div>

      <footer className="footer">
        <p>made by choop</p>
      </footer>
    </main>
  )
}
