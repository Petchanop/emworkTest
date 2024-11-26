'use client'
import { useEffect, useState } from "react";

interface Item {
  id: string;
  description: string;
  image: string;
  alt: string;
}

const items: Item[] = [
  { id: "imagewatthai", description: "ภาคเหนือ" ,image: "https://www.aleenta.com/wp-content/uploads/Wat-Phra-That-Doi-Suthep-in-Chiang-Mai.jpg", alt: "Item 1" },
  { id: "imagewatthai2", description: "ภาคกลาง" ,image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Wat_Phra_Si_Rattana_Mahathat%2C_Phitsanulok_%28I%29.jpg", alt: "Item 2" },
  { id: "imagewatthai3", description: "ภาคตะวันออกเฉียงเหนือ" ,image: "https://pukmudmuangthai.com/wp-content/uploads/2021/02/IMG_6148-scaled.jpg", alt: "Item 3" },
  { id: "imagewatthai4", description: "ภาคตะวันออก" ,image: "https://s.isanook.com/tr/0/ud/282/1413937/45g.jpg?ip/crop/w1200h700/q80/webp", alt: "Item 4" },
  { id: "imagewatthai5", description: "ภาคตะวันตก" ,image: "https://cms.dmpcdn.com/travel/2022/08/24/2433e140-23a1-11ed-9ae9-ed3a81c74252_webp_original.jpg", alt: "Item 5" },
  { id: "imagewatthai6", description: "ภาคใต้" ,image: "https://www.agoda.com/wp-content/uploads/2024/02/6-Wat-Phra-Mahathat-Nakhon-Si-Thammarat-Temples-in-Southern-Thailand.jpg", alt: "Item 6" },
];

export default function TestComponent() {
  const [autoPlay, setAutoPlay] = useState<boolean>(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoPlay) {
      interval = setInterval(() => {
        // Logic for autoplay (e.g., cycling through items)
        console.log("AutoPlay active - cycling through items");
      }, 3000); // Change items every 3 seconds
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval); // Cleanup on unmount
  }, [autoPlay]);

  return (
      <div id="temple" className="temple-container">
        {/* AutoPlay Toggle */}
        <button onClick={() => setAutoPlay(!autoPlay)}>
          {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
        </button>

        <div className="flex flex-row">
          {items.map((item) => (
            <div key={item.id} id="watthai" className="wat">
              <img
                id={item.id}
                className="max-w-[300px] max-h-[300px]"
                width={300}
                height={300}
                src={item.image}
                alt={item.alt}
              />
            </div>
          ))}
        </div>
      </div>
  );
};
