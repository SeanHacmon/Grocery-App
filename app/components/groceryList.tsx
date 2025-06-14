const groceryDict = {
    "Milk": 5.90, "Rib-eye Steak":13, "Pita Bread":14.90, "Eggs":11.90, "Yellow Cheese":13, "Tomatoes":0.49,
    "Lettuce":0.30, "Chicken":4, "Apples":0.2, "Bananas":0.25, "Rice":10.90, "Pasta":5.90
};
import osherAdData from "../data/osherAd.json";
const itemDict = osherAdData.reduce((dict, item) => {
    if (!item.itemprice || item.itemprice === "" || item.itemprice === "0") {
        return dict;
    }
    dict[item.itemname] = {
        itemprice: item.itemprice,
        quantity: item.quantity,
        itemid: item.itemid,
        itemcode: item.itemcode,
        manufacturername: item.manufacturername,
        manufacturecountry: item.manufacturecountry,
        unitofmeasure: item.unitofmeasure
        // Add any other fields you want to keep
    };
    return dict;
}, {});
export default itemDict;
