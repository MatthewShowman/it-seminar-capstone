INSERT INTO Client
    (ClientName)
VALUES
    ('Goctor and Pramble'), ('JustinTime');

--Brand

INSERT INTO Brand
    (BrandName, ClientID)
VALUES ('Squeaky Clean', 1), ('Clean Cleaners', 1), ('Generic', 2);

-- Product Category

INSERT INTO ProductCategory (CatName)
VALUES ('Cleaner');

-- Product Category

INSERT INTO ProductGroup (GroupName)
VALUES ('Spray'), ('Liquid'), ('Canister'),('Foam');

-- Seasonal Profiles
INSERT INTO SeasonalProfile (ProfileName, ClientID)
VALUES ('No Seasonality', 1), ('Spring Cleaning', 1), ('Default Profile', 2);

-- Item

INSERT INTO Item
    (ItemName, ClientID, BrandID, CatID, GroupID, CurrentProfile)
VALUES
    ('Cleaner Foaming Spray 13oz', 1, 1, 1, 1, 1),
    ('Cleaner Liquid 14oz', 1, 1, 1, 2, 1),
    ('Cleaner Liquid 64oz', 1, 1, 1, 2, 1),
    ('Cleaner Specialty Canister 9oz', 1, 1, 1, 3, 1),
    ('Cleaner Specialty Foaming Spray 16oz', 1, 1, 1, 1, 1),
    ('Cleaner Specialty Liquid 21oz', 1, 1, 1, 2, 1),
    ('Experimental Foaming Cleaner', 2, 3, 1, 4, 3);

-- WMWeeks

INSERT INTO WMWeek
    (WMWeekCode, WM_WeekNum, WM_Year, WM_Month, CalStartDate)
VALUES
(201901,01,'2019',1,'01/26/19'),
(201902,02,'2019',1,'02/02/19'),
(201903,03,'2019',1,'02/09/19'),
(201904,04,'2019',1,'02/16/19'),
(201905,05,'2019',2,'02/23/19'),
(201906,06,'2019',2,'03/02/19'),
(201907,07,'2019',2,'03/09/19'),
(201908,08,'2019',2,'03/16/19'),
(201909,09,'2019',2,'03/23/19'),
(201910,10,'2019',3,'03/30/19'),
(201911,11,'2019',3,'04/06/19'),
(201912,12,'2019',3,'04/13/19'),
(201913,13,'2019',3,'04/20/19'),
(201914,14,'2019',4,'04/27/19'),
(201915,15,'2019',4,'05/04/19'),
(201916,16,'2019',4,'05/11/19'),
(201917,17,'2019',4,'05/18/19'),
(201918,18,'2019',5,'05/25/19'),
(201919,19,'2019',5,'06/01/19'),
(201920,20,'2019',5,'06/08/19'),
(201921,21,'2019',5,'06/15/19'),
(201922,22,'2019',5,'06/22/19'),
(201923,23,'2019',6,'06/29/19'),
(201924,24,'2019',6,'07/06/19'),
(201925,25,'2019',6,'07/13/19'),
(201926,26,'2019',6,'07/20/19'),
(201927,27,'2019',7,'07/27/19'),
(201928,28,'2019',7,'08/03/19'),
(201929,29,'2019',7,'08/10/19'),
(201930,30,'2019',7,'08/17/19'),
(201931,31,'2019',8,'08/24/19'),
(201932,32,'2019',8,'08/31/19'),
(201933,33,'2019',8,'09/07/19'),
(201934,34,'2019',8,'09/14/19'),
(201935,35,'2019',8,'09/21/19'),
(201936,36,'2019',9,'09/28/19'),
(201937,37,'2019',9,'10/05/19'),
(201938,38,'2019',9,'10/12/19'),
(201939,39,'2019',9,'10/19/19'),
(201940,40,'2019',10,'10/26/19'),
(201941,41,'2019',10,'11/02/19'),
(201942,42,'2019',10,'11/09/19'),
(201943,43,'2019',10,'11/16/19'),
(201944,44,'2019',11,'11/23/19'),
(201945,45,'2019',11,'11/30/19'),
(201946,46,'2019',11,'12/07/19'),
(201947,47,'2019',11,'12/14/19'),
(201948,48,'2019',11,'12/21/19'),
(201949,49,'2019',12,'12/28/19'),
(201950,50,'2019',12,'01/04/20'),
(201951,51,'2019',12,'01/11/20'),
(201952,52,'2019',12,'01/18/20'),
(202001,01,'2020',1,'02/01/20'),
(202002,02,'2020',1,'02/08/20'),
(202003,03,'2020',1,'02/15/20'),
(202004,04,'2020',1,'02/22/20'),
(202005,05,'2020',2,'02/29/20'),
(202006,06,'2020',2,'03/07/20'),
(202007,07,'2020',2,'03/14/20'),
(202008,08,'2020',2,'03/21/20'),
(202009,09,'2020',2,'03/28/20'),
(202010,10,'2020',3,'04/04/20'),
(202011,11,'2020',3,'04/11/20'),
(202012,12,'2020',3,'04/18/20'),
(202013,13,'2020',3,'04/25/20'),
(202014,14,'2020',4,'05/02/20'),
(202015,15,'2020',4,'05/09/20'),
(202016,16,'2020',4,'05/16/20'),
(202017,17,'2020',4,'05/23/20'),
(202018,18,'2020',5,'05/30/20'),
(202019,19,'2020',5,'06/06/20'),
(202020,20,'2020',5,'06/13/20'),
(202021,21,'2020',5,'06/20/20'),
(202022,22,'2020',5,'06/27/20'),
(202023,23,'2020',6,'07/04/20'),
(202024,24,'2020',6,'07/11/20'),
(202025,25,'2020',6,'07/18/20'),
(202026,26,'2020',6,'07/25/20'),
(202027,27,'2020',7,'08/01/20'),
(202028,28,'2020',7,'08/08/20'),
(202029,29,'2020',7,'08/15/20'),
(202030,30,'2020',7,'08/22/20'),
(202031,31,'2020',8,'08/29/20'),
(202032,32,'2020',8,'09/05/20'),
(202033,33,'2020',8,'09/12/20'),
(202034,34,'2020',8,'09/19/20'),
(202035,35,'2020',8,'09/26/20'),
(202036,36,'2020',9,'10/03/20'),
(202037,37,'2020',9,'10/10/20'),
(202038,38,'2020',9,'10/17/20'),
(202039,39,'2020',9,'10/24/20'),
(202040,40,'2020',10,'10/31/20'),
(202041,41,'2020',10,'11/07/20'),
(202042,42,'2020',10,'11/14/20'),
(202043,43,'2020',10,'11/21/20'),
(202044,44,'2020',11,'11/28/20'),
(202045,45,'2020',11,'12/05/20'),
(202046,46,'2020',11,'12/12/20'),
(202047,47,'2020',11,'12/19/20'),
(202048,48,'2020',11,'12/26/20'),
(202049,49,'2020',12,'01/02/21'),
(202050,50,'2020',12,'01/09/21'),
(202051,51,'2020',12,'01/16/21'),
(202052,52,'2020',12,'01/23/21'),
(202101,1,'2021',1,'01/30/21'),
(202102,2,'2021',1,'02/06/21'),
(202103,3,'2021',1,'02/13/21'),
(202104,4,'2021',1,'02/20/21'),
(202105,5,'2021',2,'02/27/21'),
(202106,6,'2021',2,'03/06/21'),
(202107,7,'2021',2,'03/13/21'),
(202108,8,'2021',2,'03/20/21'),
(202109,9,'2021',2,'03/27/21'),
(202110,10,'2021',3,'04/03/21'),
(202111,11,'2021',3,'04/10/21'),
(202112,12,'2021',3,'04/17/21'),
(202113,13,'2021',3,'04/24/21'),
(202114,14,'2021',4,'05/01/21'),
(202115,15,'2021',4,'05/08/21'),
(202116,16,'2021',4,'05/15/21'),
(202117,17,'2021',4,'05/22/21'),
(202118,18,'2021',5,'05/29/21'),
(202119,19,'2021',5,'06/05/21'),
(202120,20,'2021',5,'06/12/21'),
(202121,21,'2021',5,'06/19/21'),
(202122,22,'2021',5,'06/26/21'),
(202123,23,'2021',6,'07/03/21'),
(202124,24,'2021',6,'07/10/21'),
(202125,25,'2021',6,'07/17/21'),
(202126,26,'2021',6,'07/24/21'),
(202127,27,'2021',7,'07/31/21'),
(202128,28,'2021',7,'08/07/21'),
(202129,29,'2021',7,'08/14/21'),
(202130,30,'2021',7,'08/21/21'),
(202131,31,'2021',8,'08/28/21'),
(202132,32,'2021',8,'09/04/21'),
(202133,33,'2021',8,'09/11/21'),
(202134,34,'2021',8,'09/18/21'),
(202135,35,'2021',8,'09/25/21'),
(202136,36,'2021',9,'10/02/21'),
(202137,37,'2021',9,'10/09/21'),
(202138,38,'2021',9,'10/16/21'),
(202139,39,'2021',9,'10/23/21'),
(202140,40,'2021',10,'10/30/21'),
(202141,41,'2021',10,'11/06/21'),
(202142,42,'2021',10,'11/13/21'),
(202143,43,'2021',10,'11/20/21'),
(202144,44,'2021',11,'11/27/21'),
(202145,45,'2021',11,'12/04/21'),
(202146,46,'2021',11,'12/11/21'),
(202147,47,'2021',11,'12/18/21');

-- Histrical Data

INSERT INTO Historical
    (WMWeekCode, ItemID, ItemPrice, POS_Stores, POS_Items)
VALUES
    (201901, 1, 3.13, 4572, 13826),
    (201902, 1, 3.13, 4572, 15985),
    (201903, 1, 3.13, 4572, 17107),
    (201904, 1, 3.13, 4572, 17024),
    (201905, 1, 3.13, 4572, 15748),
    (201906, 1, 3.13, 4572, 16093),
    (201907, 1, 3.13, 4573, 16624),
    (201908, 1, 3.13, 4573, 17085),
    (201909, 1, 3.13, 4573, 14703),
    (201910, 1, 3.13, 4574, 15375),
    (201911, 1, 3.13, 4576, 14505),
    (201912, 1, 3.13, 4579, 16518),
    (201913, 1, 3.13, 4579, 15147),
    (201914, 1, 3.13, 4579, 14504),
    (201915, 1, 3.13, 4579, 16326),
    (201916, 1, 3.13, 4579, 16172),
    (201917, 1, 3.13, 4579, 16573),
    (201918, 1, 3.13, 4579, 15965),
    (201919, 1, 3.13, 4579, 16869),
    (201920, 1, 3.13, 4579, 18525),
    (201921, 1, 3.13, 4580, 17850),
    (201922, 1, 3.13, 4578, 16241),
    (201923, 1, 3.13, 4578, 17712),
    (201924, 1, 3.13, 4578, 17174),
    (201925, 1, 3.13, 4579, 17520),
    (201926, 1, 3.13, 4579, 17437),
    (201927, 1, 3.13, 4579, 17523),
    (201928, 1, 3.13, 4578, 17618),
    (201929, 1, 3.13, 4578, 17653),
    (201930, 1, 3.13, 4578, 18617),
    (201931, 1, 3.13, 4579, 17784),
    (201932, 1, 3.13, 4578, 17304),
    (201933, 1, 3.13, 4579, 17026),
    (201934, 1, 3.13, 4579, 18250),
    (201935, 1, 3.13, 4579, 17979),
    (201936, 1, 3.13, 4579, 18185),
    (201937, 1, 3.13, 4580, 17345),
    (201938, 1, 3.13, 4579, 16430),
    (201939, 1, 3.13, 4580, 16835),
    (201940, 1, 3.13, 4579, 15942),
    (201941, 1, 3.13, 4579, 15941),
    (201942, 1, 3.13, 4579, 15118),
    (201943, 1, 3.13, 4579, 13801),
    (201944, 1, 3.13, 4578, 14896),
    (201945, 1, 3.13, 4578, 16236),
    (201946, 1, 3.13, 4578, 14885),
    (201947, 1, 3.13, 4578, 18391),
    (201948, 1, 3.13, 4574, 17351),
    (201949, 1, 3.13, 4575, 16053),
    (201950, 1, 3.13, 4575, 15916),
    (201951, 1, 3.13, 4575, 15787),
    (201952, 1, 3.13, 4575, 15773),
    (201901, 2, 3.87, 4783, 21581),
    (201902, 2, 3.87, 4783, 21855),
    (201903, 2, 3.87, 4783, 22931),
    (201904, 2, 3.87, 4783, 22451),
    (201905, 2, 3.87, 4783, 21228),
    (201906, 2, 3.87, 4783, 21372),
    (201907, 2, 3.87, 4784, 20732),
    (201908, 2, 3.87, 4784, 21453),
    (201909, 2, 3.87, 4784, 19910),
    (201910, 2, 3.87, 4784, 20395),
    (201911, 2, 3.87, 4784, 18367),
    (201912, 2, 3.87, 4785, 19534),
    (201913, 2, 3.87, 4785, 18974),
    (201914, 2, 3.87, 4785, 18684),
    (201915, 2, 3.87, 4786, 20459),
    (201916, 2, 3.87, 4786, 20328),
    (201917, 2, 3.87, 4786, 21109),
    (201918, 2, 3.87, 4786, 20709),
    (201919, 2, 3.87, 4786, 21121),
    (201920, 2, 3.87, 4785, 22161),
    (201921, 2, 3.87, 4786, 22433),
    (201922, 2, 3.87, 4785, 20378),
    (201923, 2, 3.87, 4785, 22326),
    (201924, 2, 3.87, 4784, 22231),
    (201925, 2, 3.87, 4784, 22839),
    (201926, 2, 3.87, 4783, 22943),
    (201927, 2, 3.87, 4783, 22717),
    (201928, 2, 3.87, 4782, 23162),
    (201929, 2, 3.87, 4782, 23082),
    (201930, 2, 3.87, 4782, 23899),
    (201931, 2, 3.87, 4783, 23070),
    (201932, 2, 3.87, 4781, 22369),
    (201933, 2, 3.87, 4782, 22297),
    (201934, 2, 3.87, 4782, 23511),
    (201935, 2, 3.87, 4782, 22804),
    (201936, 2, 3.87, 4782, 23025),
    (201937, 2, 3.87, 4783, 22378),
    (201938, 2, 3.87, 4782, 21836),
    (201939, 2, 3.87, 4783, 22372),
    (201940, 2, 3.87, 4782, 21676),
    (201941, 2, 3.87, 4782, 21943),
    (201942, 2, 3.87, 4782, 20231),
    (201943, 2, 3.87, 4782, 19466),
    (201944, 2, 3.87, 4781, 19907),
    (201945, 2, 3.87, 4781, 20253),
    (201946, 2, 3.87, 4781, 18938),
    (201947, 2, 3.87, 4781, 22628),
    (201948, 2, 3.87, 4776, 22616),
    (201949, 2, 3.87, 4776, 21466),
    (201950, 2, 3.87, 4776, 21585),
    (201951, 2, 3.87, 4776, 21573),
    (201952, 2, 3.87, 4776, 21347),
    (201901, 3, 16.51, 665, 438),
    (201902, 3, 16.51, 665, 489),
    (201903, 3, 16.51, 667, 471),
    (201904, 3, 16.51, 667, 503),
    (201905, 3, 16.51, 667, 439),
    (201906, 3, 16.51, 667, 473),
    (201907, 3, 16.51, 673, 485),
    (201908, 3, 16.51, 674, 454),
    (201909, 3, 16.51, 680, 457),
    (201910, 3, 16.51, 684, 410),
    (201911, 3, 16.51, 683, 382),
    (201912, 3, 16.51, 691, 427),
    (201913, 3, 16.51, 694, 406),
    (201914, 3, 16.51, 694, 402),
    (201915, 3, 16.51, 694, 445),
    (201916, 3, 16.51, 695, 455),
    (201917, 3, 16.51, 695, 440),
    (201918, 3, 16.51, 696, 420),
    (201919, 3, 16.51, 696, 439),
    (201920, 3, 16.51, 696, 532),
    (201921, 3, 16.51, 701, 436),
    (201922, 3, 16.51, 702, 479),
    (201923, 3, 16.51, 702, 468),
    (201924, 3, 16.51, 709, 471),
    (201925, 3, 16.51, 715, 468),
    (201926, 3, 16.51, 716, 495),
    (201927, 3, 16.51, 716, 497),
    (201928, 3, 16.51, 716, 474),
    (201929, 3, 16.51, 716, 479),
    (201930, 3, 16.51, 716, 522),
    (201931, 3, 16.51, 716, 457),
    (201932, 3, 16.51, 716, 454),
    (201933, 3, 16.51, 716, 426),
    (201934, 3, 16.51, 716, 461),
    (201935, 3, 16.51, 716, 458),
    (201936, 3, 16.51, 716, 490),
    (201937, 3, 16.51, 716, 461),
    (201938, 3, 16.51, 716, 468),
    (201939, 3, 16.51, 716, 513),
    (201940, 3, 16.51, 716, 437),
    (201941, 3, 16.51, 716, 492),
    (201942, 3, 16.51, 716, 446),
    (201943, 3, 16.51, 716, 393),
    (201944, 3, 16.51, 716, 414),
    (201945, 3, 16.51, 716, 426),
    (201946, 3, 16.51, 716, 417),
    (201947, 3, 16.51, 722, 459),
    (201948, 3, 16.51, 728, 512),
    (201949, 3, 16.51, 729, 417),
    (201950, 3, 16.51, 730, 478),
    (201951, 3, 16.51, 731, 447),
    (201952, 3, 16.51, 731, 440),
    (201901, 4, 6.53, 0, 1),
    (201902, 4, 6.53, 0, 0),
    (201903, 4, 6.53, 0, 5),
    (201904, 4, 6.53, 0, 2),
    (201905, 4, 6.53, 0, 0),
    (201906, 4, 6.53, 0, 2),
    (201907, 4, 6.53, 0, 0),
    (201908, 4, 6.53, 0, 1),
    (201909, 4, 6.53, 0, 2),
    (201910, 4, 6.53, 0, 2),
    (201911, 4, 6.53, 0, 0),
    (201912, 4, 6.53, 0, 2),
    (201913, 4, 6.53, 0, 0),
    (201914, 4, 6.53, 0, 6),
    (201915, 4, 6.53, 0, 7),
    (201916, 4, 6.53, 0, 6),
    (201917, 4, 6.53, 0, 0),
    (201918, 4, 6.53, 0, 0),
    (201919, 4, 6.53, 0, 1),
    (201920, 4, 6.53, 0, 4),
    (201921, 4, 6.53, 0, 1),
    (201922, 4, 6.53, 0, 2),
    (201923, 4, 6.53, 0, 1),
    (201924, 4, 6.53, 0, 4),
    (201925, 4, 6.53, 0, 1),
    (201926, 4, 6.53, 1971, 0),
    (201927, 4, 6.53, 1965, 28),
    (201928, 4, 6.53, 1966, 181),
    (201929, 4, 6.53, 1967, 269),
    (201930, 4, 6.53, 1967, 347),
    (201931, 4, 6.53, 1968, 307),
    (201932, 4, 6.53, 1968, 316),
    (201933, 4, 6.53, 1968, 355),
    (201934, 4, 6.53, 1968, 399),
    (201935, 4, 6.53, 1968, 377),
    (201936, 4, 6.53, 1969, 374),
    (201937, 4, 6.53, 1969, 405),
    (201938, 4, 6.53, 1969, 389),
    (201939, 4, 6.53, 1969, 398),
    (201940, 4, 6.53, 1969, 448),
    (201941, 4, 6.53, 1969, 364),
    (201942, 4, 6.53, 1969, 504),
    (201943, 4, 6.53, 1969, 434),
    (201944, 4, 6.53, 1969, 375),
    (201945, 4, 6.53, 1969, 341),
    (201946, 4, 6.53, 1969, 402),
    (201947, 4, 6.53, 1971, 524),
    (201948, 4, 6.53, 1973, 440),
    (201949, 4, 6.53, 1976, 405),
    (201950, 4, 6.53, 1977, 458),
    (201951, 4, 6.53, 1978, 403),
    (201952, 4, 6.53, 1978, 399),
    (201901, 5, 4.02, 4561, 12101),
    (201902, 5, 4.02, 4561, 14928),
    (201903, 5, 4.02, 4561, 17270),
    (201904, 5, 4.02, 4561, 16434),
    (201905, 5, 4.02, 4561, 16047),
    (201906, 5, 4.02, 4561, 16246),
    (201907, 5, 4.02, 4562, 16002),
    (201908, 5, 4.02, 4562, 16042),
    (201909, 5, 4.02, 4562, 15200),
    (201910, 5, 4.02, 4563, 15232),
    (201911, 5, 4.02, 4565, 14359),
    (201912, 5, 4.02, 4569, 15810),
    (201913, 5, 4.02, 4569, 15404),
    (201914, 5, 4.02, 4569, 14932),
    (201915, 5, 4.02, 4569, 17274),
    (201916, 5, 4.02, 4569, 17307),
    (201917, 5, 4.02, 4569, 16804),
    (201918, 5, 4.02, 4569, 16331),
    (201919, 5, 4.02, 4569, 17039),
    (201920, 5, 4.02, 4569, 18780),
    (201921, 5, 4.02, 4570, 17807),
    (201922, 5, 4.02, 4568, 15934),
    (201923, 5, 4.02, 4568, 16448),
    (201924, 5, 4.02, 4568, 16557),
    (201925, 5, 4.02, 4569, 16614),
    (201926, 5, 4.02, 4569, 16157),
    (201927, 5, 4.02, 4569, 16615),
    (201928, 5, 4.02, 4568, 17845),
    (201929, 5, 4.02, 4568, 17485),
    (201930, 5, 4.02, 4568, 17800),
    (201931, 5, 4.02, 4569, 17064),
    (201932, 5, 4.02, 4568, 16284),
    (201933, 5, 4.02, 4569, 15719),
    (201934, 5, 4.02, 4569, 17118),
    (201935, 5, 4.02, 4569, 17176),
    (201936, 5, 4.02, 4569, 16460),
    (201937, 5, 4.02, 4570, 15942),
    (201938, 5, 4.02, 4569, 15330),
    (201939, 5, 4.02, 4570, 15927),
    (201940, 5, 4.02, 4569, 14259),
    (201941, 5, 4.02, 4569, 14124),
    (201942, 5, 4.02, 4569, 13857),
    (201943, 5, 4.02, 4569, 12120),
    (201944, 5, 4.02, 4568, 13367),
    (201945, 5, 4.02, 4568, 15199),
    (201946, 5, 4.02, 4568, 14057),
    (201947, 5, 4.02, 4568, 17235),
    (201948, 5, 4.02, 4564, 15883),
    (201949, 5, 4.02, 4565, 15126),
    (201950, 5, 4.02, 4565, 14753),
    (201951, 5, 4.02, 4565, 14327),
    (201952, 5, 4.02, 4565, 15017),
    (201901, 6, 6.07, 1999, 600),
    (201902, 6, 6.07, 1999, 631),
    (201903, 6, 6.07, 1999, 714),
    (201904, 6, 6.07, 1999, 658),
    (201905, 6, 6.07, 1999, 706),
    (201906, 6, 6.07, 1998, 668),
    (201907, 6, 6.07, 1999, 655),
    (201908, 6, 6.07, 1999, 658),
    (201909, 6, 6.07, 1998, 606),
    (201910, 6, 6.02, 1996, 612),
    (201911, 6, 6.07, 1997, 581),
    (201912, 6, 6.07, 1995, 548),
    (201913, 6, 6.07, 1993, 620),
    (201914, 6, 6.02, 1991, 587),
    (201915, 6, 6.07, 1990, 591),
    (201916, 6, 6.07, 1990, 654),
    (201917, 6, 6.02, 1990, 671),
    (201918, 6, 6.07, 1990, 628),
    (201919, 6, 6.07, 1990, 586),
    (201920, 6, 6.07, 1987, 729),
    (201921, 6, 6.07, 1990, 777),
    (201922, 6, 6.07, 1990, 680),
    (201923, 6, 6.07, 1987, 699),
    (201924, 6, 6.07, 1986, 633),
    (201925, 6, 6.07, 1983, 834),
    (201926, 6, 6.07, 1, 1013),
    (201927, 6, 6.07, 1, 1571),
    (201928, 6, 6.07, 1, 2296),
    (201929, 6, 6.07, 1, 2273),
    (201930, 6, 6.07, 1, 921),
    (201931, 6, 6.07, 1, 436),
    (201932, 6, 6.07, 1, 230),
    (201933, 6, 6.07, 1, 116),
    (201934, 6, 6.07, 1, 90),
    (201935, 6, 6.07, 1, 48),
    (201936, 6, 6.07, 1, 40),
    (201937, 6, 6.07, 1, 24),
    (201938, 6, 6.07, 1, 34),
    (201939, 6, 6.07, 1, 16),
    (201940, 6, 6.02, 1, 11),
    (201941, 6, 6.07, 1, 23),
    (201942, 6, 6.07, 1, 7),
    (201943, 6, 6.07, 1, 13),
    (201944, 6, 6.07, 1, 9),
    (201945, 6, 6.07, 1, 6),
    (201946, 6, 6.02, 1, 5),
    (201947, 6, 6.07, 1, 5),
    (201948, 6, 6.07, 1, 12),
    (201949, 6, 6.07, 1, 17),
    (201950, 6, 6.07, 1, 5),
    (201951, 6, 6.07, 1, 17),
    (201952, 6, 6.07, 1, 19);

-- Profile Data

INSERT INTO ProfileData (ProfileID, WeekNum, SeasonFactor)
VALUES
(1,1,1.0),
(1,2,1.0),
(1,3,1.0),
(1,4,1.0),
(1,5,1.0),
(1,6,1.0),
(1,7,1.0),
(1,8,1.0),
(1,9,1.0),
(1,10,1.0),
(1,11,1.0),
(1,12,1.0),
(1,13,1.0),
(1,14,1.0),
(1,15,1.0),
(1,16,1.0),
(1,17,1.0),
(1,18,1.0),
(1,19,1.0),
(1,20,1.0),
(1,21,1.0),
(1,22,1.0),
(1,23,1.0),
(1,24,1.0),
(1,25,1.0),
(1,26,1.0),
(1,27,1.0),
(1,28,1.0),
(1,29,1.0),
(1,30,1.0),
(1,31,1.0),
(1,32,1.0),
(1,33,1.0),
(1,34,1.0),
(1,35,1.0),
(1,36,1.0),
(1,37,1.0),
(1,38,1.0),
(1,39,1.0),
(1,40,1.0),
(1,41,1.0),
(1,42,1.0),
(1,43,1.0),
(1,44,1.0),
(1,45,1.0),
(1,46,1.0),
(1,47,1.0),
(1,48,1.0),
(1,49,1.0),
(1,50,1.0),
(1,51,1.0),
(1,52,1.0),
(1,53,1.0);