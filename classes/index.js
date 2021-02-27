class Client {
    constructor(ClientID, ClientName) {
        this.ClientID = ClientID;
        this.ClientName = ClientName;
    }
}

class Brand {
    constructor(BrandID, Brand, HGAM, Contact, ClientID) {
        this.BrandID = BrandID;
        this.Brand = Brand;
        this.HGAM = HGAM;
        this.Contact = Contact;
        this.ClientID = ClientID;
    }
}

class Item {
    constructor(ItemID, Alias, Sku, Size, Group, BrandID, Category) {
        this.ItemID = ItemID;
        this.Alias = Alias;
        this.Sku = Sku;
        this.Size = Size;
        this.Group = Group;
        this.BrandID = BrandID;
        this.Category = Category;
    }
}

class Dates {
    constructor(WMWeek, Year, WeekStart, Month, Season) {
        this.WMWeek = WMWeek;
        this.Year = Year;
        this.WeekStart = WeekStart;
        this.Month = Month;
        this.Season = Season;
    }
}

class Historical {
    constructor(WMWeek, ItemID, UnitCost, StoreCount, POSQuantity) {
        this.WMWeek = WMWeek;
        this.ItemID = ItemID;
        this.UnitCost = UnitCost;
        this.StoreCount = StoreCount;
        this.POSQuantity = POSQuantity;
    }
}


module.exports = {
    Client : Client,
    Brand : Brand,
    Item : Item,
    Dates : Dates,
    Historical : Historical
}