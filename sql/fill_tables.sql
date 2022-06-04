-- INSERT ROLES --
INSERT INTO "role" VALUES (1, 'CLIENT'),
(2, 'ADMIN');

-- INSERT ADDRESSES --
INSERT INTO "address" (id, city, street, latitude, longitude) VALUES
('67459131-3d4a-43a0-be8d-4d4f08d7152f', 'Minsk', 'Ponomarenko', 53.892925, 27.493793),
('e8e10efa-df12-4ed9-ab51-d55f406b9ba3', 'Minsk', 'Levkova', 53.872974, 27.555732),
('697879ce-4c24-457d-8d39-b1413ad1a158', 'Gomel', 'Barikina', 52.417866, 30.979768),
('0a8a6f85-d687-4026-8dd4-612ac996d54e', 'Gomel', 'Jarkovskogo', 52.430926, 31.009430),
('0bd0db01-5f1d-4a94-8483-fab0646c24ff', 'Brest', 'Neftyanaya', 52.090937, 23.713359),
('3a5e3f3e-5242-45ca-bdc0-008da763843a', 'Brest', 'Karla Marksa', 52.088591, 23.690532),
('bc9f19ae-d43e-42d7-a31b-2859f769fead', 'Grodno', 'Zernova', 53.685919, 23.824094),
('a1b58513-15f4-4485-82dd-3e559936c97c', 'Grodno', 'Suvorova', 53.657828, 23.807080),
('717f9853-e215-414b-bf2f-192d2428a750', 'Vitebsk', 'Chkalova', 55.169838, 30.212939),
('2896e301-7d55-450c-8bdb-a83d21325a51', 'Vitebsk', 'Bogatyrova', 55.168496, 30.264934),
('51092826-a306-449c-80d6-7e61e522952a', 'Mogilev', 'Rovchakova', 53.929919, 30.273468),
('9e00a01e-d058-4a9d-9ea0-a8c1f47d25ac', 'Mogilev', 'Yamnickaya', 53.888977, 30.263586),
('576b62bf-2434-44ba-8969-4db1b57b934c', 'Bobruisk', 'Sovetskaya', 53.131390, 29.225754),
('bfa9be32-16bf-4676-9b8b-985b88a8a292', 'Bobruisk', 'Yackuba Kolasa', 53.155512, 29.193908);

-- INSERT CAMPS --

INSERT INTO "camp" (id, address, type) VALUES
('3fca765e-3d50-4935-a36c-3e6eb1afa3f5', '67459131-3d4a-43a0-be8d-4d4f08d7152f', 'CAT'),
('2e076eb1-92e5-4f28-a69e-2cd55ff46d71', 'e8e10efa-df12-4ed9-ab51-d55f406b9ba3', 'DOG'),
('f7b221ea-1efd-4ca4-b641-f3254f86493a', '697879ce-4c24-457d-8d39-b1413ad1a158', 'CAT'),
('735cb240-b795-4356-86c4-4f32755c1d6d', '0a8a6f85-d687-4026-8dd4-612ac996d54e', 'DOG'),
('35e07ede-d5f9-4da7-b2df-b4ac2b8659e0', '0bd0db01-5f1d-4a94-8483-fab0646c24ff', 'CAT'),
('26536866-fd49-424e-86e9-62a06b673fef', '3a5e3f3e-5242-45ca-bdc0-008da763843a', 'DOG'),
('891c5900-7167-4fde-b3c2-eb41801f2677', 'bc9f19ae-d43e-42d7-a31b-2859f769fead', 'CAT'),
('86b682f0-6da4-46fa-8d19-0242e92e1147', 'a1b58513-15f4-4485-82dd-3e559936c97c', 'DOG'),
('f741ce40-7f1c-40bc-a30b-c4b869deaa64', '717f9853-e215-414b-bf2f-192d2428a750', 'CAT'),
('bad9840b-46d6-4eea-b0fa-8672b60e50c2', '2896e301-7d55-450c-8bdb-a83d21325a51', 'DOG'),
('87928e92-6826-4dee-8ff8-9b9ec45adeea', '51092826-a306-449c-80d6-7e61e522952a', 'CAT'),
('58f12bd1-4269-4e10-8bc3-3fd84156ec3d', '9e00a01e-d058-4a9d-9ea0-a8c1f47d25ac', 'DOG'),
('cecc6ffa-1393-4bd1-b6dc-8301139c19c6', '576b62bf-2434-44ba-8969-4db1b57b934c', 'CAT'),
('caaec744-6fff-4e66-9f2e-7050dbdd17a0', 'bfa9be32-16bf-4676-9b8b-985b88a8a292', 'DOG');