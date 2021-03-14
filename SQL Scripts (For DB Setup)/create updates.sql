--DROP TABLE Forecast;
--DROP TABLE SeasonalProfile;
--DROP TABLE Historical;
--DROP TABLE WMWeek;
--DROP TABLE Item;
--DROP TABLE ProductGroup;
--DROP TABLE ProductCategory;
--DROP TABLE Brand;
--DROP TABLE Client;

CREATE TABLE Client
(
    ClientID INT IDENTITY PRIMARY KEY,
    ClientName VARCHAR(100) NOT NULL
    --HGAM NVARCHAR(255) NOT NULL, -- I moved this line because HG said they focus on the client level
    --Contact NVARCHAR(255) NOT NULL -- I moved this line because HG said they focus on the client level
)

CREATE TABLE Brand
(
    BrandID INT IDENTITY PRIMARY KEY,
    BrandName VARCHAR (100) NOT NULL,
    ClientID INT FOREIGN KEY REFERENCES Client(ClientID)
)

CREATE TABLE ProductCategory
(
    CatID INT IDENTITY PRIMARY KEY,
    CatName VARCHAR (100) NOT NULL
)

CREATE TABLE ProductGroup
(
    GroupID INT IDENTITY PRIMARY KEY,
    GroupName VARCHAR (100) NOT NULL
)

CREATE TABLE Item
(
    ItemID INT IDENTITY PRIMARY KEY,
    ItemName NVARCHAR(100) NOT NULL,
    --Sku NVARCHAR(255) NOT NULL,
    --SizeOZ DECIMAL(10,2) NOT NULL, -- Does this makes sense? Other products will use different units.
    BrandID INT FOREIGN KEY REFERENCES Brand(BrandID),
    CatID INT FOREIGN KEY REFERENCES ProductCategory(CatID),
    GroupID INT FOREIGN KEY REFERENCES ProductGroup(GroupID)
)

CREATE TABLE WMWeek
(
    WMWeekCode INT PRIMARY KEY,
    WM_WeekNum INT NOT NULL,
    WM_Year CHAR(4) NOT NULL,
    WM_Month INT,
    -- This COULD be derived from WM_WeekNum
    CalStartDate DATETIME NOT NULL
    --Season NVARCHAR(25) NOT NULL -- This can be derived from WM_Month
)

CREATE TABLE Historical
(
    HistoricalID INT IDENTITY PRIMARY KEY,
    WMWeekCode INT FOREIGN KEY REFERENCES WMWeek(WMWeekCode) NOT NULL,
    ItemID INT FOREIGN KEY REFERENCES Item(ItemID) NOT NULL,
    ItemPrice DECIMAL(6,2) NOT NULL,
    POS_Stores INT NOT NULL,
    POS_Items INT NOT NULL
)

CREATE TABLE SeasonalProfile
(
    ProfileID INT IDENTITY PRIMARY KEY,
    ProfileName VARCHAR(100) NOT NULL,
    GroupingDigit INT NOT NULL,
    ClientID INT REFERENCES Client(ClientID) NOT NULL,
    WeekNum INT NOT NULL,
    SeasonFactor DECIMAL(3,1) NOT NULL
)

CREATE TABLE Forecast
(
    ForecastID INT IDENTITY PRIMARY KEY,
    ItemID INT FOREIGN KEY REFERENCES Item(ItemID) DEFAULT NULL,
    WMWeekCode INT FOREIGN KEY REFERENCES WMWeek(WMWeekCode) NOT NULL,
    Velocity DECIMAL(3,1) NOT NULL,
    ProfileID INT REFERENCES SeasonalProfile(ProfileID),
    ForecastPrice DECIMAL(15,2) DEFAULT 1.00,
    ForecastStores INT DEFAULT 0,
    ItemAdjust INT NOT NULL DEFAULT 0,
    FactorAdjust DECIMAL(3,1) NOT NULL DEFAULT 1


    --LeadTime INT,
    --isDefaultProfile BIT NOT NULL,

    --BrandID INT FOREIGN KEY REFERENCES Brand(BrandID) DEFAULT NULL,
    -- We aren't going to use this level, but it's available.
    --ClientID INT FOREIGN KEY REFERENCES Client(ClientID) DEFAULT NULL,
    -- We aren't going to use this level, but it's available.
    --IsGeneral BIT NOT NULL
    -- For use on a general profile, e.g. "Add 10%".

    -- Ideally we should add constraint that does not allow "IsGeneral" to be true unless the ItemID, BrandID, and ClientID are NULL.
    -- What else needed to be put in these profiles?
);


-- I assume we don't need the table below if we don't focus on persistence.
/*
CREATE TABLE Use_Profile (
    ItemID INT FOREIGN KEY REFERENCES Item(ItemID),
    ProfileID INT FOREIGN KEY REFERENCES SalesProfile(ProfileID),
    StartWeek CHAR(6) FOREIGN KEY REFERENCES Dates(WMWeek),
    FinalWeek CHAR(6) FOREIGN KEY REFERENCES Dates(WMWeek),
    PRIMARY KEY (ItemID, StartWeek, FinalWeek)
)
*/


