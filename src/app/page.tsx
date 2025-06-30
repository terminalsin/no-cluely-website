/* eslint-disable react/jsx-no-comment-textnodes */
"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Download, Eye, Github, Star, CheckCircle, AlertCircle, BookOpen, ThumbsDownIcon } from 'lucide-react'
import Image from 'next/image'

export default function Home() {
  const [githubUsername, setGithubUsername] = useState('')
  const [isStarred, setIsStarred] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showStarPrompt, setShowStarPrompt] = useState(false)
  const [error, setError] = useState('')
  const [copiedCommand, setCopiedCommand] = useState('')

  const checkIfStarred = async () => {
    if (!githubUsername.trim()) {
      setError('Bruh, enter your GitHub username first 💀')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const response = await fetch('/api/check-star', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: githubUsername.trim() })
      })

      const data = await response.json()

      if (response.ok) {
        if (data.starred) {
          setIsStarred(true)
          triggerDownload()
        } else {
          setShowStarPrompt(true)
        }
      } else {
        setError(data.error || 'GitHub API said no 🚫')
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Network error. Touch grass and try again. 🌱')
    } finally {
      setIsLoading(false)
    }
  }

  const triggerDownload = () => {
    const link = document.createElement('a')
    link.href = 'https://github.com/terminalsin/no-cluely-app/releases/download/1.0.0/NoCluely-Installer.dmg'
    link.download = 'NoCluely-Installer.dmg'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const copyToClipboard = async (command: string, commandType: string) => {
    try {
      await navigator.clipboard.writeText(command)
      setCopiedCommand(commandType)
      setTimeout(() => setCopiedCommand(''), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background layer with effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          opacity: '0.85',
          filter: 'blur(0.5px)',
          transform: 'rotate(0.5deg)',
          transformOrigin: 'center center'
        }}
      />


      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Main Header with Logo - Much More Spaced */}
        <header className="text-center mb-16 sm:mb-24 lg:mb-32">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-10 lg:p-16 border-4 border-blue-500 transform -rotate-1 mb-8 sm:mb-12 lg:mb-16 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 mb-4">
              <Image
                src="/logo.png"
                alt="Cluely getting an F grade"
                width={800}
                height={800}
                className="object-contain w-full max-w-sm sm:max-w-md lg:max-w-2xl"
                priority
              />
            </div>

            <div className="flex items-center justify-center pb-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-transparent hover:bg-blue-600 border-2 border-blue-500 hover:text-white hover:border-transparent text-blue-500 px-4 sm:px-8 lg:px-12 py-3 sm:py-4 lg:py-6 text-sm sm:text-lg lg:text-2xl transform hover:scale-105 transition-all shadow-xl">
                    <Download className="mr-2 sm:mr-3 lg:mr-4 h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                    <span className="hidden sm:inline">📝 Download the Detector (MacOS)</span>
                    <span className="sm:hidden">📝 Download</span>
                    <span className="ml-2 sm:ml-3 lg:ml-4 text-lg sm:text-2xl lg:text-3xl">🚨</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-lg w-[95vw] max-w-[95vw] sm:w-full bg-white border-4 border-red-500 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  <DialogHeader className="mb-2">
                    <DialogTitle className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl">
                      <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
                      Student Registration Required
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base lg:text-lg leading-relaxed mt-2 sm:mt-4">
                      Please enter your GitHub username to download the detector, we trynna hit a lot of github stars. Please 🙏
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
                    <div className="space-y-2 sm:space-y-4">
                      <Input
                        placeholder="Enter your GitHub username"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        disabled={isLoading}
                        className="border-4 border-gray-300 text-sm sm:text-base lg:text-lg py-2 px-3 sm:px-4 lg:px-6"
                      />
                      {error && (
                        <p className="text-sm sm:text-base lg:text-lg text-red-500 bg-red-100 p-3 sm:p-4 rounded border-2 border-red-300">{error}</p>
                      )}
                    </div>

                    {!showStarPrompt ? (
                      <div>
                        <a
                          href="https://github.com/terminalsin/no-cluely"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block pb-3 sm:pb-4"
                        >
                          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-sm sm:text-base lg:text-xl py-3 sm:py-4">
                            <Star className="mr-2 sm:mr-3 lg:mr-4 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                            ⭐ Star on GitHub
                          </Button>
                        </a>
                        <Button
                          onClick={checkIfStarred}
                          disabled={isLoading || !githubUsername.trim()}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-sm sm:text-base lg:text-xl py-3 sm:py-4"
                        >
                          {isLoading ? '🔍 Checking awesomeness...' : '✅ Check to download'}
                        </Button>
                      </div>

                    ) : (
                      <div className="space-y-4 sm:space-y-6">
                        <div className="bg-yellow-100 border-4 border-yellow-500 p-4 sm:p-6 rounded-lg">
                          <div className="flex items-center gap-2 sm:gap-4 text-yellow-800 mb-2 sm:mb-4">
                            <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                            <span className="font-bold text-sm sm:text-base lg:text-xl">Homework Not Submitted! 📋</span>
                          </div>
                          <p className="text-sm sm:text-base lg:text-lg">You need to star the repo first. It&apos;s literally free and takes 2 seconds. Don&apos;t be lazy! 😤</p>
                        </div>
                        <a
                          href="https://github.com/terminalsin/no-cluely"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full block"
                        >
                          <Button className="w-full bg-gray-900 hover:bg-gray-800 text-sm sm:text-base lg:text-xl py-3 sm:py-4">
                            <Star className="mr-2 sm:mr-3 lg:mr-4 h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                            ⭐ Do My Homework (Star on GitHub)
                          </Button>
                        </a>
                        <Button
                          onClick={() => { setShowStarPrompt(false); checkIfStarred(); }}
                          variant="outline"
                          className="w-full text-sm sm:text-base lg:text-xl py-3 sm:py-4 border-4"
                        >
                          ✋ I swear I did it, check again!
                        </Button>
                      </div>
                    )}

                    {isStarred && (
                      <div className="bg-green-100 border-4 border-green-500 p-4 sm:p-6 rounded-lg">
                        <div className="flex items-center gap-2 sm:gap-4 text-green-800 mb-2">
                          <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6" />
                          <span className="font-bold text-sm sm:text-base lg:text-xl">Good job! Here&apos;s your A+ 🌟</span>
                        </div>
                        <p className="text-sm sm:text-base lg:text-lg mt-2">Download should start automatically. You actually did the thing!</p>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div className='flex items-center justify-center pt-2 pb-6 sm:pb-8 lg:pb-12'>
              <a href='https://github.com/terminalsin/no-cluely' className="flex items-center gap-2 sm:gap-3 hover:scale-105 transition-all duration-300 group">
                <div className="text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-sm font-medium transition-all duration-300">
                  <b>⭐  Click to Star! 👉</b>
                </div>
                <img alt="GitHub Repo stars" src="https://img.shields.io/github/stars/terminalsin/no-cluely?label=terminalsin%2Fno-cluely" width={200} className="group-hover:scale-105 transition-transform duration-300" />
              </a>
            </div>

            <div className="bg-red-100 border-l-4 sm:border-l-8 border-red-500 p-4 sm:p-6 lg:p-8 rounded-r-lg">
              <div className="flex items-center justify-center">
                <ThumbsDownIcon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8 text-red-500 mr-2 sm:mr-3 lg:mr-4" />
                <p className="text-red-700 font-bold text-base sm:text-xl lg:text-2xl">
                  CLUELY DETECTED 💀👌⚠️
                </p>
              </div>
            </div>




          </div>

          {/* Report Card Style Badges - More Spaced */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 max-w-4xl mx-auto">
            <div className="bg-white border-4 border-red-500 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
              <div className="text-red-600 font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">F</div>
              <div className="text-sm sm:text-base lg:text-lg font-medium">Stealth Mode</div>
            </div>
            <div className="bg-white border-4 border-green-500 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
              <div className="text-green-600 font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">A+</div>
              <div className="text-sm sm:text-base lg:text-lg font-medium">Detection</div>
            </div>
            <div className="bg-white border-4 border-blue-500 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
              <div className="text-blue-600 font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">💯</div>
              <div className="text-sm sm:text-base lg:text-lg font-medium">Open Source</div>
            </div>
            <div className="bg-white border-4 border-purple-500 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
              <div className="text-purple-600 font-bold text-2xl sm:text-3xl lg:text-4xl mb-2">🍎</div>
              <div className="text-sm sm:text-base lg:text-lg font-medium">MacOS Only</div>
            </div>
          </div>


        </header>

        {/* How We Catch Cheaters Section - More Spaced */}
        <section className="mb-16 sm:mb-24 lg:mb-32">
          <div className="bg-white rounded-lg shadow-xl p-6 sm:p-10 lg:p-16 border-l-4 sm:border-l-8 border-red-500 max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-slate-900 flex items-center gap-2 sm:gap-4">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-red-500" />
                  How We Catch These Cheaters 🕵️
                </h2>
                <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-slate-600">
                  <div className="bg-red-50 border-l-4 sm:border-l-8 border-red-400 p-3 sm:p-4 rounded-r-lg">
                    <p className="font-bold text-red-800 mb-2 sm:mb-4 text-sm sm:text-base lg:text-lg">📢 PSA: Cluely is NOT slick</p>
                    <p className="text-sm sm:text-base lg:text-lg">Unlike actual smart cheaters who hide their tracks, Cluely literally:</p>
                  </div>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                      <span className="bg-red-100 text-red-800 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap">FAIL #1</span>
                      <span className="text-sm sm:text-base lg:text-lg leading-relaxed"><strong>Names its process &quot;cluely&quot;</strong> - Like wearing a shirt that says &quot;I&apos;M CHEATING&quot; 💀</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                      <span className="bg-red-100 text-red-800 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap">FAIL #2</span>
                      <span className="text-sm sm:text-base lg:text-lg leading-relaxed"><strong>Uses sharing_state = 0</strong> - Trying to avoid screen recording (sus much? 🤔)</span>
                    </li>
                    <li className="flex items-start gap-3 sm:gap-4 lg:gap-6">
                      <span className="bg-red-100 text-red-800 px-2 sm:px-3 lg:px-4 py-1 sm:py-2 rounded font-bold text-xs sm:text-sm lg:text-base whitespace-nowrap">FAIL #3</span>
                      <span className="text-sm sm:text-base lg:text-lg leading-relaxed"><strong>Elevated window layers</strong> - Staying on top like it owns the place 👑</span>
                    </li>
                  </ul>
                  <div className="bg-yellow-100 border-4 border-yellow-400 p-3 sm:p-4 rounded-lg">
                    <p className="text-yellow-800 text-xs sm:text-sm lg:text-base italic leading-relaxed">
                      💬 &quot;A CS:GO cheater would have had an easier time making a VAC bypass than this&quot; - Some chad developer, probably
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-900 text-green-400 p-4 sm:p-6 lg:p-8 rounded-lg font-mono text-xs sm:text-sm lg:text-lg overflow-x-auto border-4 border-green-500 shadow-xl">
                <div className="text-green-300 mb-2 sm:mb-4 text-sm sm:text-base lg:text-xl">// Real detection code </div>
                <pre className="text-xs sm:text-sm lg:text-base leading-relaxed overflow-x-auto">{`let window_id = get_dict_int(window_dict, WINDOW_NUMBER);
let sharing_state = get_dict_int(window_dict, WINDOW_SHARING_STATE);
let layer = get_dict_int(window_dict, WINDOW_LAYER);

let window_info = WindowInfo {
    owner,
    window_id,
    sharing_state,  // <- this exposes everything lmao
    layer,          // <- ez clap
};

result.is_detected = true;  // gottem 😎
result.window_count += 1;

// Check for specific evasion techniques
if sharing_state == 0 {
    result.screen_capture_evasion_count += 1;
    // congratulations, you played yourself 🤡
}`}</pre>
              </div>
            </div>
          </div>
        </section>

        {/* Class Resources (SDKs) - More Spaced */}
        <section className="mb-16 sm:mb-24 lg:mb-32">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6 lg:mb-8">
              <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 lg:h-12 lg:w-12 text-blue-500" />
              SDK Downloads 📚
            </h2>
            <p className="text-base sm:text-xl lg:text-2xl text-slate-600 leading-relaxed">Choose your programming language</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
            <Card className="border-4 border-blue-400 bg-white hover:scale-105 transition-transform shadow-xl">
              <CardHeader className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <CardTitle className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4">
                  🐍 Python
                </CardTitle>
                <div className="flex flex-col gap-2">
                  <img src="https://img.shields.io/pypi/v/no-cluely?style=for-the-badge&logo=python&logoColor=white" alt="PyPI version" className="w-fit max-w-full" />
                  <img src="https://img.shields.io/pypi/dm/no-cluely?style=for-the-badge&logo=python&logoColor=white" alt="PyPI downloads" className="w-fit max-w-full" />
                </div>
              </CardHeader>
              <CardContent className="p-2 pt-0 pb-4 px-4 sm:px-6 lg:px-8">
                <div
                  className="bg-slate-900 text-green-400 p-3 sm:p-4 lg:p-6 rounded text-xs sm:text-sm font-mono cursor-pointer hover:bg-slate-800 transition-colors relative group"
                  onClick={() => copyToClipboard('pip install no-cluely', 'python')}
                  title="Click to copy"
                >
                  pip install no-cluely
                  {copiedCommand === 'python' ? (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-green-300 text-xs">
                      ✓ Copied!
                    </span>
                  ) : (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-yellow-400 bg-white hover:scale-105 transition-transform shadow-xl">
              <CardHeader className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <CardTitle className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4">
                  📦 JavaScript
                </CardTitle>
                <div className="flex flex-col gap-2">
                  <img src="https://img.shields.io/npm/v/no-cluely?style=for-the-badge&logo=npm&logoColor=white" alt="npm version" className="w-fit max-w-full" />
                  <img src="https://img.shields.io/npm/dm/no-cluely?style=for-the-badge&logo=npm&logoColor=white" alt="npm downloads" className="w-fit max-w-full" />
                </div>
              </CardHeader>
              <CardContent className="p-2 pt-0 pb-4 px-4 sm:px-6 lg:px-8">
                <div
                  className="bg-slate-900 text-green-400 p-3 sm:p-4 lg:p-6 rounded text-xs sm:text-sm font-mono cursor-pointer hover:bg-slate-800 transition-colors relative group"
                  onClick={() => copyToClipboard('npm install no-cluely', 'javascript')}
                  title="Click to copy"
                >
                  npm install no-cluely
                  {copiedCommand === 'javascript' ? (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-green-300 text-xs">
                      ✓ Copied!
                    </span>
                  ) : (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-4 border-orange-400 bg-white hover:scale-105 transition-transform shadow-xl sm:col-span-2 lg:col-span-1">
              <CardHeader className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
                <CardTitle className="flex items-center gap-2 sm:gap-4 text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-4">
                  🦀 Rust
                </CardTitle>
                <div className="flex flex-col gap-2">
                  <img src="https://img.shields.io/crates/v/no-cluely-driver?style=for-the-badge&logo=rust&logoColor=white" alt="Crates.io version" className="w-fit max-w-full" />
                  <img src="https://img.shields.io/crates/d/no-cluely-driver?style=for-the-badge&logo=rust&logoColor=white" alt="Crates.io downloads" className="w-fit max-w-full" />
                </div>
              </CardHeader>
              <CardContent className="p-2 pt-0 pb-4 px-4 sm:px-6 lg:px-8">
                <div
                  className="bg-slate-900 text-green-400 p-3 sm:p-4 lg:p-6 rounded text-xs sm:text-sm font-mono cursor-pointer hover:bg-slate-800 transition-colors relative group"
                  onClick={() => copyToClipboard('cargo add no-cluely-driver', 'rust')}
                  title="Click to copy"
                >
                  cargo add no-cluely-driver
                  {copiedCommand === 'rust' ? (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-green-300 text-xs">
                      ✓ Copied!
                    </span>
                  ) : (
                    <span className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to copy
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>


        {/* Footer with Classroom Vibes - More Spaced */}
        <footer className="bg-blue-600 text-white rounded-lg p-8 sm:p-12 lg:p-16 border-4 border-yellow-400 shadow-xl">
          <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-12 mb-6 sm:mb-8 flex-wrap">
            <a
              href="https://github.com/terminalsin/no-cluely"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 sm:gap-3 lg:gap-4 text-blue-200 hover:text-white transition-colors hover:scale-110 transform text-sm sm:text-base lg:text-xl"
            >
              <Github className="h-5 w-5 sm:h-6 sm:w-6 lg:h-8 lg:w-8" />
              📖 GitHub
            </a>
            <a
              href="https://pypi.org/project/no-cluely/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base lg:text-xl"
            >
              🐍 Python
            </a>
            <a
              href="https://www.npmjs.com/package/no-cluely"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base lg:text-xl"
            >
              📦 JavaScript
            </a>
            <a
              href="https://crates.io/crates/no-cluely-driver"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base lg:text-xl"
            >
              🦀 Rust
            </a>
          </div>
          <div className="text-center border-t border-blue-400 pt-6 sm:pt-8">
            <p className="text-blue-200 text-base sm:text-lg lg:text-xl mb-4">
              MIT License - Made with 💀
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
