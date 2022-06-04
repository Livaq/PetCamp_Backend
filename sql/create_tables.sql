CREATE TABLE IF NOT EXISTS "role"
(
    id integer NOT NULL,
    name character varying(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "user"
(
    id character varying(50) NOT NULL,
    email character varying(50),
    password character varying(200) NOT NULL,
    role integer NOT NULL REFERENCES "role",
    phone character varying(50),
    is_active boolean NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "profile"
(
    id character varying(50) NOT NULL REFERENCES "user",
    name character varying(20),
    surname character varying(20),
    middlename character varying(20),
    city character varying(20),
    street character varying(20),
    photo character varying(100),
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS "address"
(
    id character varying(50) NOT NULL,
    city character varying(50) NOT NULL,
    street character varying(50) NOT NULL,
    latitude numeric NOT NULL,
    longitude numeric NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS camp
(
    id character varying(50) NOT NULL,
    address character varying(50) NOT NULL REFERENCES "address",
    type character varying(10) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS pet
(
    id character varying(50) NOT NULL,
    name character varying(20) NOT NULL,
    breed character varying(50) NOT NULL,
    age integer NOT NULL,
    vet_pasport character varying(100) NOT NULL,
    last_vaccination_date date NOT NULL,
    dehelminthisation_date date NOT NULL,
    diseases_surgeons character varying(100) NOT NULL,
    owner character varying(50) NOT NULL REFERENCES "user",
    type character varying(10) NOT NULL,
    gender character varying(1) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS booking
(
    id character varying(50) NOT NULL,
    "user" character varying(50) NOT NULL REFERENCES "user",
    pet character varying(50) NOT NULL REFERENCES pet,
    camp character varying(50) NOT NULL REFERENCES camp,
    booking_start date NOT NULL,
    booking_end date NOT NULL,
    is_active boolean NOT NULL,
    PRIMARY KEY (id)
);