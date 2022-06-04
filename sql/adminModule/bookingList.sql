-- Select all bookings to admin --

select B.id, P.name, U.phone, A.city, A.street, PET.name, PET.type,B.booking_start, B.booking_end
from booking as B
JOIN "user" as U ON U.id = B.user
JOIN "profile" as P ON P.id = U.id
JOIN "camp" as C ON C.id = B.camp
JOIN "address" as A ON A.id = C.address
JOIN "pet" as PET ON PET.id = B.pet;