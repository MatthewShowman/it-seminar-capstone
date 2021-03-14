SELECT * FROM ProductGroup;
SELECT * FROM ProductCategory;
SELECT * FROM Historical WHERE ItemID = 1 AND WMWeekCode BETWEEN 201901 AND 201953;

SELECT
    i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, pc.CatName, i.GroupID, pg.GroupName
FROM Item i
JOIN Brand b ON i.BrandID = b.BrandID
JOIN Client c ON i.ClientID = c.ClientID
JOIN ProductCategory pc ON i.CatID = pc.CatID
JOIN ProductGroup pg ON i.GroupID = pg.GroupID;

SELECT
*
FROM 
JOIN Forecast f ON i.ItemID = f.Item

SELECT * FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE f.ItemID = 1 AND w.CalStartDate >= GETDATE();

SELECT
    i.ItemName,
    SUM(h.POS_Items) AS Total_Items,
    SUM(h.POS_Stores) AS Total_Stores,
    CAST ( ROUND(SUM(h.POS_Items * 1.0) / SUM(h.POS_Stores),1) AS DECIMAL(3,1)) AS Velocity
FROM Item i
JOIN Historical h ON i.ItemID = h.ItemID
JOIN WMWeek w ON h.WMWeekCode = w.WMWeekCode
WHERE i.ItemID = 1 AND w.WM_Year = '2019'
GROUP BY i.ItemName;

SELECT CAST ( ROUND(SUM(h.POS_Items * 1.0) / SUM(h.POS_Stores),1) AS DECIMAL(3,1)) AS Velocity FROM Item i JOIN Historical h ON i.ItemID = h.ItemID JOIN WMWeek w ON h.WMWeekCode = w.WMWeekCode WHERE i.ItemID = 1 AND w.WM_Year = '2019';


SELECT * FROM WMWeek WHERE CalStartDate >= DATEADD(week, -1, GETDATE());
SELECT * FROM WMWeek WHERE WMWeekCode = (SELECT MAX(WMWeekCode) FROM WMWeek);
SELECT DATEADD(week,1,CalStartDate) AS NextStartDate FROM WMWeek WHERE WMWeekCode = (SELECT MAX(WMWeekCode) FROM WMWeek);


DELETE FROM WMWeek WHERE WMWeekCode > 202148;

SELECT * FROM Forecast;
DELETE FROM Forecast;

USE TestDB SELECT * FROM SeasonalProfile;
SELECT TOP 1 WMweekCode FROM WMWeek WHERE CalStartDate >= DATEADD(week, -1, GETDATE());


SELECT COUNT(*) AS NumberOfForecasts FROM Forecast f JOIN WMWeek w ON f.WMWeekCode = w.WMWeekCode WHERE ItemID = 1 AND w.CalStartDate >= DATEADD(week, -3, GETDATE())


SELECT i.ItemID, i.ItemName, i.BrandID, b.BrandName, i.ClientID, c.ClientName, i.CatID, pc.CatName, i.GroupID, pg.GroupName FROM Item i
JOIN Brand b ON i.BrandID = b.BrandID
JOIN Client c ON i.ClientID = c.ClientID
JOIN ProductCategory pc ON i.CatID = pc.CatID
JOIN ProductGroup pg ON i.GroupID = pg.GroupID
WHERE i.ClientID = 1