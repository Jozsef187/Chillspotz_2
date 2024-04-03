--
-- PostgreSQL database dump
--

-- Dumped from database version 15.0
-- Dumped by pg_dump version 15.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: spots; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.spots (
    pid integer NOT NULL,
    foto character varying(255),
    titel character varying(100),
    beschreibung text,
    rating numeric(3,1),
    likes integer,
    added_by character varying(50),
    latitude numeric(9,6),
    longitude numeric(9,6)
);


ALTER TABLE public.spots OWNER TO postgres;

--
-- Name: spots_pid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.spots_pid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spots_pid_seq OWNER TO postgres;

--
-- Name: spots_pid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.spots_pid_seq OWNED BY public.spots.pid;


--
-- Name: spots pid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots ALTER COLUMN pid SET DEFAULT nextval('public.spots_pid_seq'::regclass);


--
-- Data for Name: spots; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spots (pid, foto, titel, beschreibung, rating, likes, added_by, latitude, longitude) FROM stdin;
8	pexels-라스-해-19348237.png	Skulpturenpark	Ein Park mit beeindruckenden Skulpturen und moderner Kunst im Freien.	4.3	36	Benutzer404	41.890200	12.492400
7	pexels-vishrut-bajpai-752904.png	Seeufer Lounge	Eine gemütliche Lounge direkt am Seeufer, ideal für abendliche Entspannung.	4.7	63	User303	45.421500	-75.699000
16	spot_1712138276835.png	Jozef	Jozef Beschreibt Jozef TestTestTest	5.0	609	JoezF	420.000000	69.000000
3	pexels-matthias-groeneveld-17310586.png	Stadtpark West	Ein grüner Park mitten in der Stadt, perfekt für Spaziergänge und Sport.	4.2	28	User789	48.856600	2.352200
2	pexels-jonathan-petersson-1237111.png	Dachterrassen-Bar	Eine gemütliche Bar mit einer großartigen Aussicht von der Dachterrasse.	4.8	45	User456	40.712800	-74.006000
1	pexels-haidar-a-17684245.png	Park am See	Ein entspannter Ort mit Blick auf den See, perfekt zum Entspannen und Picknicken.	4.5	32	Benutzer123	52.520000	13.405000
\.


--
-- Name: spots_pid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.spots_pid_seq', 16, true);


--
-- Name: spots spots_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.spots
    ADD CONSTRAINT spots_pkey PRIMARY KEY (pid);


--
-- PostgreSQL database dump complete
--

