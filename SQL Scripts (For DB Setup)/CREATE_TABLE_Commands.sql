CREATE TABLE Client
(
    ClientID INT IDENTITY PRIMARY KEY,
    ClientName NVARCHAR(255) NOT NULL,
    HGAM NVARCHAR(255) NOT NULL, -- I moved this line because HG said they focus on the client level
    Contact NVARCHAR(255) NOT NULL -- I moved this line because HG said they focus on the client level
)

CREATE TABLE Brand
(
    BrandID INT IDENTITY PRIMARY KEY,
    BrandName NVARCHAR (255) NOT NULL,
    ClientID INT FOREIGN KEY REFERENCES Client(ClientID)
)

CREATE TABLE Item
(
    ItemID INT IDENTITY PRIMARY KEY,
    Alias NVARCHAR(255) NOT NULL,
    Sku NVARCHAR(255) NOT NULL,
    SizeOZ DECIMAL(10,2) NOT NULL, -- Does this makes sense? Other products will use different units.
    ItemGroup NVARCHAR(255) NOT NULL,
    Category NVARCHAR(255) NOT NULL,
    BrandID INT FOREIGN KEY REFERENCES Brand(BrandID)
)

CREATE TABLE WM_Date
(
    WMWeek CHAR(6) PRIMARY KEY,
    WeekStart DATETIME NOT NULL,
    CalYear CHAR(4) NOT NULL,
    Month NVARCHAR(20) NOT NULL,
    Season NVARCHAR(25) NOT NULL
)

CREATE TABLE SalesProfile
(
    ProfileID INT IDENTITY PRIMARY KEY,
    ProfileName NVARCHAR(25) NOT NULL,
    UnitCost DECIMAL(10,2) NOT NULL,
    Multiplier DECIMAL(5,2) NOT NULL DEFAULT 1,
    LeadTime INT NOT NULL,
    isDefaultProfile BINARY NOT NULL,
    ItemID INT FOREIGN KEY REFERENCES ItemID(ItemID) DEFAULT NULL, 
    BrandID INT FOREIGN KEY REFERENCES Brand(BrandID) DEFAULT NULL, -- We aren't going to use this level, but it's available.
    ClientID INT FOREIGN KEY REFERENCES Client(ClientID) DEFAULT NULL, -- We aren't going to use this level, but it's available.
    IsGeneral BINARY NOT NULL -- For use on a general profile, e.g. "Add 10%".
    
    -- Ideally we should add constraint that does not allow "IsGeneral" to be true unless the ItemID, BrandID, and ClientID are NULL.
    -- What else needed to be put in these profiles?
)


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

CREATE TABLE Historical
    (
    WMWeek CHAR(6) FOREIGN KEY REFERENCES WM_Date(WMWeek),
    ItemID INT FOREIGN KEY REFERENCES Item(ItemID),
    UnitCost DECIMAL(10,2) NOT NULL,
    StoreCount INT NOT NULL,
    POSQuantity INT NOT NULL,
    PRIMARY KEY (WMWeek, ItemID)
    );

