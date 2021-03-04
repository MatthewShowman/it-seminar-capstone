-- Simple Navigation and Selection
SELECT * FROM Client;
SELECT * FROM Brand;
SELECT * FROM Brand WHERE ClientID = @ClientID;
SELECT * FROM Item;
SELECT * FROM Item WHERE BrandID = @BrandID;
SELECT * FROM Item i JOIN Brand b ON i.BrandID = b.BrandID WHERE b.ClientID = @ClientID;
SELECT * FROM Forecast_Profile;
SELECT * FROM Dates;
SELECT * FROM Historical;

SELECT h.WMWeek, i.Alias, h.UnitCost, h.StoreCount, h.POSQuantity FROM Historical h
JOIN WM_Dates d ON h.WMWeek = d.WMWeek
JOIN Item i ON h.itemID = i.itemID
WHERE i.itemID = @ItemID;

-- Current profile for an item
SELECT * FROM Historical h
JOIN WM_Date d on h.WMWeek = d.WMWeek
JOIN Item i ON h.itemID = i.itemID
JOIN Use_Profile up ON h.itemID = up.ItemID AND (GETDATE() >= up.StartWeek AND GETDATE() <= up.FinalWeek)
JOIN Forecast_Profile fp ON up.ProfileID = fp.ProfileID
WHERE h.ItemID = @ItemID;


SELECT * FROM Dates WHERE Month = 'Feb';
SELECT * FROM Item WHERE BrandID = 2;
SELECT * From Brand;