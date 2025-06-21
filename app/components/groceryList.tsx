import combinedMarketData from "../data/combinedMarket.json";
import {vegetableImages} from "../components/variables";
// Helper function to safely process combined market data
function createMarketDicts(data) {
    try {
        
        if (!data || !Array.isArray(data)) {
            console.warn('Combined market data is not available or not an array:', data);
            return { osherAdDict: {}, ramiLevyDict: {}, mahsaniAshukDict: {} };
        }

        const osherAdDict = {};
        const ramiLevyDict = {};
        const mahsaniAshukDict = {};

        data.forEach((item, index) => {
            if (!item || typeof item !== 'object') {
                console.warn(`Invalid item at index ${index}:`, item);
                return;
            }

            const itemName = item.itemname;
            if (!itemName) {
                console.warn(`No itemname at index ${index}:`, item);
                return;
            }

            // Process OsherAd data
            if (item.osherAd && item.osherAd.itemprice && 
                item.osherAd.itemprice !== "" && item.osherAd.itemprice !== "0") {
                osherAdDict[itemName] = {
                    itemprice: item.osherAd.itemprice,
                    quantity: item.osherAd.quantity || null,
                    itemid: item.osherAd.itemid || null,
                    itemcode: item.itemcode || null,
                    unitofmeasure: item.osherAd.unitofmeasure || null,
                    unitofmeasureprice: item.osherAd.unitofmeasureprice || null,
                    image: `https://img.rami-levy.co.il/product/${item.itemcode}/small.jpg` || null
                };
            }

            // Process RamiLevy data
            if (item.ramiLevy && item.ramiLevy.itemprice && 
                item.ramiLevy.itemprice !== "" && item.ramiLevy.itemprice !== "0") {
                ramiLevyDict[itemName] = {
                    itemprice: item.ramiLevy.itemprice,
                    quantity: item.ramiLevy.quantity || null,
                    itemid: item.ramiLevy.itemid || null,
                    itemcode: item.itemcode || null,
                    unitofmeasure: item.ramiLevy.unitofmeasure || null,
                    unitofmeasureprice: item.ramiLevy.unitofmeasureprice || null,
                    image: `https://img.rami-levy.co.il/product/${item.itemcode}/small.jpg` || null
                };
                // if (!item.itemcode) console.warn('Missing itemcode for:', itemName);
            }

            // Process MahsaniAshuk data
            if (item.mahsaniAshuk && item.mahsaniAshuk.itemprice && 
                item.mahsaniAshuk.itemprice !== "" && item.mahsaniAshuk.itemprice !== "0") {
                mahsaniAshukDict[itemName] = {
                    itemprice: item.mahsaniAshuk.itemprice,
                    quantity: item.mahsaniAshuk.quantity || null,
                    itemid: item.mahsaniAshuk.itemid || null,
                    itemcode: item.itemcode || null,
                    unitofmeasure: item.mahsaniAshuk.unitofmeasure || null,
                    unitofmeasureprice: item.mahsaniAshuk.unitofmeasureprice || null,
                    image: `https://img.rami-levy.co.il/product/${item.itemcode}/small.jpg` || null
                };
            }
        });
        
        for (const [itemName, url] of Object.entries(vegetableImages)) {
            if (ramiLevyDict[itemName]) {
              ramiLevyDict[itemName].image = url;
            }
        }
        for (const [itemName, url] of Object.entries(vegetableImages)) {
            if (osherAdDict[itemName]) {
              osherAdDict[itemName].image = url;
            }
        }
        for (const [itemName, url] of Object.entries(vegetableImages)) {
            if (mahsaniAshukDict[itemName]) {
              mahsaniAshukDict[itemName].image = url;
            }
        }

        return { osherAdDict, ramiLevyDict, mahsaniAshukDict };
    } catch (error) {
        console.error('Error processing combined market data:', error);
        return { osherAdDict: {}, ramiLevyDict: {}, mahsaniAshukDict: {} };
    }
}

// Create dictionaries with error handling
const { osherAdDict, ramiLevyDict, mahsaniAshukDict } = createMarketDicts(combinedMarketData);

// Log statistics
// console.log('Data processing completed:');
// console.log(`OsherAd items: ${Object.keys(osherAdDict).length}`);
// console.log(`RamiLevy items: ${Object.keys(ramiLevyDict).length}`);
// console.log(`MahsaniAshuk items: ${Object.keys(mahsaniAshukDict).length}`);

export { osherAdDict, ramiLevyDict, mahsaniAshukDict };
// export default { osherAdDict, ramiLevyDict, mahsaniAshukDict };
// export default osherAdDict && ramiLevyDict && mahsaniAshukDict;