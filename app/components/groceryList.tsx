import osherAdData from "../data/osherAd.json";
import ramiLevyData from "../data/ramiLevy.json";

// Helper function to safely process data
function createItemDict(data, sourceName) {
    try {
        // Check if data exists and is an array
        if (!data || !Array.isArray(data)) {
            console.warn(`${sourceName} data is not available or not an array:`, data);
            return {};
        }
        return data.reduce((dict, item, index) => {
            if (!item || typeof item !== 'object') {
                console.warn(`${sourceName} - Invalid item at index ${index}:`, item);
                return dict;
            }
            if (!item.itemname || !item.itemprice || item.itemprice === "" || item.itemprice === "0") {
                return dict;
            }

            dict[item.itemname] = {
                itemprice: item.itemprice,
                quantity: item.quantity || null,
                itemid: item.itemid || null,
                itemcode: item.itemcode || null,
                unitofmeasure: item.unitofmeasure || null
            };

            return dict;
        }, {});
    } catch (error) {
        console.error(`Error processing ${sourceName} data:`, error);
        return {};
    }
}

// Create dictionaries with error handling
const osherAdItemDict = createItemDict(osherAdData, 'OsherAd');
const ramiLevyItemDict = createItemDict(ramiLevyData, 'RamiLevy');

// Log statistics
// console.log('Data processing completed:');
// console.log(`OsherAd items: ${Object.keys(osherAdItemDict).length}`);
// console.log(`RamiLevy items: ${Object.keys(ramiLevyItemDict).length}`);

export default osherAdItemDict && ramiLevyItemDict;

