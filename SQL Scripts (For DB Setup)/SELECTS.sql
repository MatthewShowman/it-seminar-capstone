SELECT * FROM Client;
SELECT * FROM Brand;
SELECT * FROM Item;
SELECT * FROM Dates;
SELECT * FROM Historical;

SELECT h.WMWeek, i.Alias, h.UnitCost, h.StoreCount, h.POSQuantity FROM Historical h
JOIN Dates d ON h.WMWeek = d.WMWeek
JOIN Item i ON h.itemID = i.itemID
WHERE i.itemID = 8;


SELECT * FROM Dates WHERE Month = 'Feb';
SELECT * FROM Item WHERE BrandID = 2;
SELECT * From Brand;