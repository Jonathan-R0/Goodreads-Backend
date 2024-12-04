--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0 (Debian 17.0-1.pgdg120+1)
-- Dumped by pg_dump version 17.0 (Debian 17.0-1.pgdg120+1)

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



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (2, 'Mario Benedetti', 'mario@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);
INSERT INTO public.users VALUES (4, 'Jorge Luis Borges', 'borges@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);
INSERT INTO public.users VALUES (5, 'Julio Cortazar', 'cortazar@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);
INSERT INTO public.users VALUES (6, 'Ernesto Sabato', 'sabato@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);
INSERT INTO public.users VALUES (7, 'Alfonsina Storni', 'alfonsina@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);
INSERT INTO public.users VALUES (8, 'Felipe Lector', 'felipe@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'reader', NULL);
INSERT INTO public.users VALUES (3, 'Nicolas Lector', 'lector@mail.com', '$2a$10$6MZaK6IBDi.1HiG.0Z/fR.5ggRWGrzFW/k4Aab68bJ7msWPJBb5HK', 'reader', NULL);
INSERT INTO public.users VALUES (1, 'Ricardo Piglia', 'autor@mail.com', '$2a$10$8/hBcbNyS.FbIsIxqNt2TOj5AEZ6rhZJjXKK4knphP4dBwe582muG', 'author', NULL);


--
-- Data for Name: question; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.question VALUES (2, 1, 3, 'Cuando sale el nuevo libro?', '2024-11-13 14:09:54.026443');
INSERT INTO public.question VALUES (3, 6, 3, 'Hola, como estas?', '2024-11-13 14:10:19.651591');
INSERT INTO public.question VALUES (4, 7, 1, 'Como estas amiga?', '2024-11-13 14:55:08.567021');
INSERT INTO public.question VALUES (1, 1, 1, 'Hola como estas? Muy bueno el último libro libro', '2024-11-12 19:24:12.195561');


--
-- Data for Name: answer; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: books; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.books VALUES (3, 'Ficcion', 'Libro de ciencia ficción', 6, 'Ciencia Ficción', 'Planeta', '2024-11-13 14:58:18.458', 'Español', '2.jpg');
INSERT INTO public.books VALUES (4, 'Poemas de Alfonsina', 'Colección de los mejores poemas de Alfonsina Storni', 7, 'Misterio', 'Planeta', '2024-11-13 14:58:18.458', 'Español', '3.png');
INSERT INTO public.books VALUES (7, 'Rayuela', 'Rayuela', 5, 'Romance', 'Emece', '2024-11-13 14:58:18.458', NULL, '16.jpg');
INSERT INTO public.books VALUES (8, 'Antología poética', 'Antología poética', 7, 'Fantasía', 'Emece', '2024-11-13 14:58:18.458', NULL, '14.jpg');
INSERT INTO public.books VALUES (10, 'La ciudad ausente', 'Descripción del libro', 1, 'Fantasía', 'Planeta', '2024-11-13 14:58:18.458', 'Español', '4.jpg');
INSERT INTO public.books VALUES (5, 'Respiración Artificial', 'Tercer libro de la saga Fantasia.', 1, 'Fantasía', 'Emece', '2024-11-13 14:58:18.458', '', '5.jpg');
INSERT INTO public.books VALUES (2, 'Plata Quemada', 'Nuevo libro, Nuevo libro, Nuevo libro,Nuevo libro, Nuevo libro', 1, 'Romance', 'Planeta', '2024-11-13 14:58:18.458', 'Español', '7.jpg');
INSERT INTO public.books VALUES (6, 'El túnel', 'El tunel', 6, 'Romance', 'Planeta', '2024-11-13 14:58:18.458', NULL, 'tunel.jpg');


--
-- Data for Name: booksinprogress; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.booksinprogress VALUES (10, 'El tunel 2', 'Secuela de El tunel.', 20, 'Fragmento de el tunel 2.', 6, false, '2024-12-04 17:28:49.765', '2024-12-04 17:29:12.54');
INSERT INTO public.booksinprogress VALUES (2, 'Poemas', 'Nuevo libro de poemas', 70, 'Poema en desarrollo', 7, false, '2024-11-27 00:26:16.27', '2024-11-27 02:43:58.543');
INSERT INTO public.booksinprogress VALUES (5, 'Ciclos', 'Libro sobre los ciclos en grafos', 15, 'dedede', 1, false, '2024-11-27 02:46:11.422', '2024-11-27 02:46:11.422');
INSERT INTO public.booksinprogress VALUES (6, 'Sobre tumbas y heroes', 'Una reversión de mi famoso libro', 25, 'El hombre, como ha dicho alguna vez un filósofo, es un ser que no sabe lo que hace. Y es cierto, el hombre no sabe lo que hace, pero sabe lo que no hace. O mejor dicho, sabe lo que no hace cuando ya no puede hacerlo, cuando la acción ha dejado de ser posible. No es que el hombre haya dejado de ser un ser que actúa, sino que la acción se le ha escapado de las manos. El hombre se ha extraviado en el laberinto de sus propias contradicciones y de sus propios mitos, y la luz que alguna vez lo iluminó se ha desvanecido.

Agrego fragmento', 6, false, '2024-11-27 22:25:30.327', '2024-11-27 22:45:40.529');


--
-- Data for Name: booksinprogressupdate; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.booksinprogressupdate VALUES (25, 6, 'Fragmento de el tunel 2.', 10, '2024-12-04 17:28:49.769', 10);
INSERT INTO public.booksinprogressupdate VALUES (26, 6, NULL, 20, '2024-12-04 17:29:12.536', 10);
INSERT INTO public.booksinprogressupdate VALUES (15, 7, NULL, 30, '2024-11-27 21:07:40.317', 2);


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: follows; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.follows VALUES (2, 1);
INSERT INTO public.follows VALUES (1, 2);
INSERT INTO public.follows VALUES (8, 4);
INSERT INTO public.follows VALUES (8, 7);
INSERT INTO public.follows VALUES (8, 1);
INSERT INTO public.follows VALUES (8, 6);


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.news VALUES (1, 'titulo de noticia 1', 'contenido en desarrollo', 1, '2024-11-19 03:37:04.642');
INSERT INTO public.news VALUES (2, 'titulo de noticia 2', 'contenido en desarrollo!!!', 1, '2024-11-19 03:49:30.882');
INSERT INTO public.news VALUES (6, 'Noticia de Ernesto Sabato', 'Cuerpo de la noticia de Ernesto Sabato.', 6, '2024-12-04 17:27:34.92');


--
-- Data for Name: notification; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.notification VALUES (32, 8, 'NEW_NEWS', false, 6, '2024-12-04 17:27:34.927');
INSERT INTO public.notification VALUES (33, 8, 'UPDATE_BOOK_IN_PROGRESS', false, 10, '2024-12-04 17:29:12.551');


--
-- Data for Name: quotes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: readings; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.readings VALUES (1, 1, 2, 'pending');
INSERT INTO public.readings VALUES (2, 8, 8, 'current');
INSERT INTO public.readings VALUES (7, 8, 2, 'read');
INSERT INTO public.readings VALUES (8, 6, 6, 'current');
INSERT INTO public.readings VALUES (9, 6, 4, 'pending');
INSERT INTO public.readings VALUES (10, 6, 5, 'read');


--
-- Data for Name: recommended; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.recommended VALUES (1, 2);
INSERT INTO public.recommended VALUES (2, 2);


--
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reviews VALUES (10, 1, 'Muy buen libro', 5, '2024-11-18 22:53:52.165457', 4);
INSERT INTO public.reviews VALUES (30, 8, 'Un libro inspirador para mi vida.', 5, '2024-12-04 17:09:43.160464', 6);


--
-- Name: answer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.answer_id_seq', 18, true);


--
-- Name: books_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.books_id_seq', 8, true);


--
-- Name: booksinprogress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booksinprogress_id_seq', 10, true);


--
-- Name: booksinprogressupdate_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.booksinprogressupdate_id_seq', 26, true);


--
-- Name: comments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.comments_id_seq', 1, false);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.news_id_seq', 6, true);


--
-- Name: notification_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.notification_id_seq', 33, true);


--
-- Name: question_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_id_seq', 4, true);


--
-- Name: quotes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.quotes_id_seq', 1, false);


--
-- Name: readings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.readings_id_seq', 10, true);


--
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 30, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- PostgreSQL database dump complete
--

