-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 06-07-2024 a las 21:34:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cacbbdd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item_pedido`
--

CREATE TABLE `item_pedido` (
  `id_item_pedido` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unit` double NOT NULL,
  `subtotal` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `item_pedido`
--

INSERT INTO `item_pedido` (`id_item_pedido`, `id_pedido`, `id_producto`, `cantidad`, `precio_unit`, `subtotal`) VALUES
(1, 2, 1, 1, 0, 0),
(2, 2, 2, 1, 0, 0),
(3, 3, 2, 1, 0, 3254),
(4, 3, 3, 1, 0, 3254.21),
(5, 4, 2, 1, 254.36, 3254.4),
(6, 4, 3, 1, 2354.32, 3254.21);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `id_pedido` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` varchar(150) NOT NULL,
  `total` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`id_pedido`, `id_usuario`, `fecha`, `total`) VALUES
(1, 1, '06/07/2024', 2354),
(2, 1, '06/07/2024', 2354),
(3, 1, '06/07/2024', 2354),
(4, 1, '06/07/2024', 2354);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `Nombre` varchar(150) DEFAULT NULL,
  `descripcion` varchar(250) DEFAULT NULL,
  `precio` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `categoria` varchar(150) DEFAULT NULL,
  `ambientacion` varchar(150) DEFAULT NULL,
  `estacion` varchar(150) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `Nombre`, `descripcion`, `precio`, `stock`, `categoria`, `ambientacion`, `estacion`) VALUES
(1, 'clavel', 'delicada', 2500, 25, 'undefined', 'interior', 'primavera'),
(2, 'actualizacion', 'citrico', 5000, 15, 'comestible', 'interior', 'invierno'),
(3, 'mandarina', 'citrico', 5000, 15, 'comestible', 'exterior', 'primavera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `nombre` varchar(150) DEFAULT NULL,
  `apellido` varchar(150) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL,
  `direccion` varchar(150) DEFAULT NULL,
  `telefono` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `nombre`, `apellido`, `email`, `password`, `direccion`, `telefono`) VALUES
(1, 'Juan', 'Cicka', 'juan@gmail.com', '12345', 'calle cangallo', '3644421232'),
(4, 'Marce', 'caballero', 'usuario@gmail.com', '12345', 'calle cangallo', '3644422333'),
(5, 'Jorge', 'caballero', 'jorge@gmail.com', '$2a$08$Bz7xIalBbm5Mq/GkZPwWsu3', 'calle cangallo', '3644422333'),
(6, NULL, NULL, NULL, '$2a$08$hIxeTLJHDJdYefAuyssBBeA', NULL, NULL),
(7, 'Mario', NULL, NULL, '$2a$08$kbr65dikeAVKgisSozY70eN', NULL, NULL),
(8, 'Miguel', NULL, NULL, '$2a$08$bvQadsVPZsWBOSAWQwsocOG', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `item_pedido`
--
ALTER TABLE `item_pedido`
  ADD PRIMARY KEY (`id_item_pedido`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`id_pedido`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `nombre` (`nombre`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `item_pedido`
--
ALTER TABLE `item_pedido`
  MODIFY `id_item_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `id_pedido` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;