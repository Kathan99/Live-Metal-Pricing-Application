export interface MetalSummary {
  price: number;
  timestamp: number;
}

export interface MetalDetails extends MetalSummary {
  change: number;
  changePercentage: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  history: Array<{ value: number }>;
}


interface MetalData {
  price: number;
  timestamp: number;
  previousClose: number;
  open: number;
  dayHigh: number;
  dayLow: number;
  history: Array<{ value: number }>;
}

const generateFakeHistory = (startPrice: number) => {
  const data = [];
  let currentPrice = startPrice;
  let trendDirection = Math.random() > 0.5 ? 1 : -1;
  let trendDuration = 0;
  let stepsInTrend = Math.floor(Math.random() * 6) + 3;

  for (let i = 0; i < 24; i++) {
    if (trendDuration >= stepsInTrend) {
      trendDirection *= -1;
      trendDuration = 0;
      stepsInTrend = Math.floor(Math.random() * 6) + 3;
    }
    const fluctuation = (Math.random() * (startPrice * 0.005)) * trendDirection;
    currentPrice += fluctuation;
    currentPrice = Math.max(0, currentPrice);
    data.push({ value: parseFloat(currentPrice.toFixed(2)) });
    trendDuration++;
  }
  return data;
};


const mockDatabase: Record<string, MetalData> = {
  Gold: {
    price: 6250.55,
    timestamp: Date.now(),
    previousClose: 6225.45,
    open: 6230.00,
    dayHigh: 6265.80,
    dayLow: 6228.10,
    history: generateFakeHistory(6225.45),
  },
  Silver: {
    price: 72.80,
    timestamp: Date.now(),
    previousClose: 73.30,
    open: 73.10,
    dayHigh: 73.50,
    dayLow: 72.55,
    history: generateFakeHistory(73.30),
  },
  Platinum: {
    price: 980.20,
    timestamp: Date.now(),
    previousClose: 967.50,
    open: 970.00,
    dayHigh: 985.50,
    dayLow: 965.00,
    history: generateFakeHistory(967.50),
  },
  Palladium: {
    price: 1250.00,
    timestamp: Date.now(),
    previousClose: 1265.25,
    open: 1260.00,
    dayHigh: 1270.00,
    dayLow: 1245.50,
    history: generateFakeHistory(1265.25),
  },
};

// --- API Functions ---
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchMetalSummary = async (metalName: string): Promise<MetalSummary> => {
  const randomDelay = Math.random() * 1500 + 500;
  await sleep(randomDelay);
  if (mockDatabase[metalName]) {
    const { price, timestamp } = mockDatabase[metalName];
    return { price, timestamp };
  } else {
    throw new Error(`Details for ${metalName} not found.`);
  }
};

export const fetchMetalDetails = async (metalName: string): Promise<MetalDetails> => {
  await sleep(700);

  if (mockDatabase[metalName]) {
    const metalData = mockDatabase[metalName];
    const change = metalData.price - metalData.previousClose;
    const changePercentage = (change / metalData.previousClose) * 100;

    return {
      ...metalData,
      change,
      changePercentage,
    };
  } else {
    throw new Error(`Details for ${metalName} not found.`);
  }
};

const startPriceUpdates = () => {
  setInterval(() => {

    for (const metalName in mockDatabase) {
      const metal = mockDatabase[metalName];
      
      
      const price = metal.price;
      const fluctuation = (Math.random() - 0.5) * (price * 0.005); // Fluctuate by up to 0.5%
      

      metal.price = parseFloat((price + fluctuation).toFixed(2));
      metal.timestamp = Date.now();
    }
    
    console.log("Prices updated in mock API:", new Date().toLocaleTimeString());
  }, 30000);
};

startPriceUpdates();