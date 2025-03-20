import React, { useRef, useState } from 'react';
import a1 from '../assets/a1.mp3'

const Prarthana = () => {
       const audioRef = useRef(null);
       const [isPlaying, setIsPlaying] = useState(false);

       const handleTogglePlay = () => {
              if (audioRef.current) {
                     if (isPlaying) {
                            audioRef.current.pause(); // Pause if already playing
                     } else {
                            audioRef.current.play(); // Play if paused
                     }
                     setIsPlaying(!isPlaying);
              }
       };
       return (
              <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white flex items-center justify-center py-12 px-4">
                     <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8 md:p-12 relative overflow-hidden">
                            {/* Decorative Background Element */}
                            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-200 rounded-full opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
                            <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-200 rounded-full opacity-20 translate-x-1/2 translate-y-1/2"></div>

                            {/* Heading */}
                            <h1 className="text-3xl md:text-4xl font-bold text-orange-600 text-center mb-8 relative animate-fade-in">
                                   हे मां मथुरासिनी!
                                   <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-orange-400 rounded-full animate-slide-up"></span>
                            </h1>
                            <div className="text-center">
                                   <audio ref={audioRef} src={a1} onEnded={() => setIsPlaying(false)}></audio>
                                   <button
                                          onClick={handleTogglePlay}
                                          className="inline-block w-[155px]  mb-5 mx-auto py-2 bg-gradient-to-r from-green-600 text-md to-teal-600 text-white  font-semibold rounded-full shadow-xl hover:from-green-700 hover:to-teal-700 transform hover:scale-105 transition-all duration-300 animate-fade-in delay-300">
                                          {isPlaying ? "⏸ Pause Audio" : "▶ Play Audio"}
                                   </button>
                            </div>

                            {/* Prayer Text */}
                            <div className="text-gray-700 text-base md:text-lg leading-relaxed space-y-6 animate-fade-in delay-200">
                                   <p className="relative pl-6 border-l-4 border-pink-400">
                                          अज्ञानता में ज्ञान के दीप को दीपित करो मां,<br />
                                          निर्बुद्ध के बुद्धि में ज्ञान की प्रकाश धरो मां,<br />
                                          मंद संसार में संसार के तेज को तुम तीव्र करो,<br />
                                          कष्ट से पीड़ित प्राणी को प्राण पियूष प्रदान करो,<br />
                                          <span className="font-semibold text-orange-600">हे मां मथुरासिनी!</span><br />
                                          ध्यान धरो इस धरती का, धरती के निर्वाण का।
                                   </p>

                                   <p className="relative pl-6 border-l-4 border-pink-400">
                                          कला विद्या के मार्ग पर राही का उद्धार करो,<br />
                                          छूटे पिछड़े फूलों में सूर्य सा तुम तेज हो,<br />
                                          तेरे शरण की छांव में, छाया की तुम छाप दो;<br />
                                          <span className="font-semibold text-orange-600">हे मां मथुरासिनी!</span><br />
                                          जीवन के हर छोर पर, हर जीव का कल्याण हो।
                                   </p>

                                   <p className="relative pl-6 border-l-4 border-pink-400">
                                          हे मां मथुरासिनी! जगत में मधुरता अल्प है;<br />
                                          मिठास भरो मां जीवन में, चिंताओं से सब ग्रस्त है;<br />
                                          वरदान की तुम ज्योत से ज्योतिर्मय संसार करो,<br />
                                          हे ब्रह्मज्ञान! की ज्ञानवती, सत्ज्ञान के कर्म प्रशस्त करो।
                                   </p>

                                   <p className="relative pl-6 border-l-4 border-pink-400">
                                          रक्षा करों मां अंधेरों से, आडंबरों के कूप से;<br />
                                          सत्यार्थ का साथ हो, प्राणियों के विश्वास में;<br />
                                          प्रेम की वाणी बनो मां, चरणों की धूल धरूं सर पे;<br />
                                          <span className="font-semibold text-orange-600">हे मां मथुरासिनी!</span><br />
                                          कुरूपता दूर करो मां, जगत के संज्ञान से।
                                   </p>
                            </div>

                            {/* Footer Note */}
                            <div className="mt-10 text-center text-gray-500 text-sm animate-fade-in delay-300">
                                   <p>मां मथुरासिनी के चरणों में समर्पित यह प्रार्थना </p>
                            </div>
                            <p className='text-end my-4 text-sm text-gray-500'>🖊 मनजीत माथुर</p>
                     </div>
              </div>
       );
};

export default Prarthana;