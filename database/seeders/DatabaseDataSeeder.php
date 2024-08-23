<?php

namespace Database\Seeders;

use App\Models\Item;
use App\Models\Space;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseDataSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(10)->create();

        Space::factory()->count(6)->create();

        Item::factory()->count(8)->create();
    }
}
