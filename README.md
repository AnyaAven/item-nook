## Item Nook

### Development setup

```shell
composer install
npm install
npm run patch
```

### Seed DB
```shell
php artisan migrate:fresh && php artisan db:seed --class=DatabaseDataSeeder
```
