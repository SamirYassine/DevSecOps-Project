# ---- Stage 1: Dependencies ----
FROM composer:2 AS deps

WORKDIR /app

COPY composer.json composer.lock symfony.lock ./

RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# ---- Stage 2: Production image ----
FROM php:8.2-fpm

LABEL org.opencontainers.image.source="https://github.com/OWNER/QUESS"
LABEL org.opencontainers.image.description="QUESS Backend - Symfony 5.4 API"

# Install system dependencies and PHP extensions in one layer, then clean up
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /var/www/symfony

# Copy vendor from deps stage (layer caching)
COPY --from=deps /app/vendor ./vendor

# Copy application source
COPY . .

# Fix permissions for Symfony cache/logs
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data var/

USER www-data

EXPOSE 9000
CMD ["php-fpm"]
